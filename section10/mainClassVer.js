// UI 요소 
const $startScreen = document.querySelector('#start-screen')
const $gameMenu = document.querySelector('#game-menu')
const $battleMenu = document.querySelector('#battle-menu')
const $heroName = document.querySelector('#hero-name')
// 게임 요소 
const $heroLevel = document.querySelector('#hero-level')
const $heroHp = document.querySelector('#hero-hp')
const $heroXp = document.querySelector('#hero-xp')
const $heroAtt = document.querySelector('#hero-att')
const $monsterName = document.querySelector('#monster-name')
const $monsterHp = document.querySelector('#monster-hp')
const $monsterAtt = document.querySelector('#monster-att')
const $message = document.querySelector('#message')

class Game {
 constructor(name){
  this.monster = null
  this.hero = null
  this.monsterList = [
    {name: '파랑달팽이', hp: 25, att: 10, xp: 10},
    {name: '리본돼지', hp: 50, att: 15, xp: 20},
    {name: '쥬니어발록', hp: 150, att: 35, xp: 50},
  ]
  this.start(name)
 }
 start(name) {
   $gameMenu.addEventListener('submit', this.onGameMenuInput)
   $battleMenu.addEventListener('submit', this.onBattleMenuInput)
   this.changeScreen('game')
   this.hero = new Hero(this, name)
   this.updateHeroStat()
 }
 changeScreen(screen) {
   if(screen === 'start'){
     $startScreen.style.display = 'block'
     $gameMenu.style.display = 'none'
     $battleMenu.style.display = 'none'
   } else if (screen === 'game') {
      $startScreen.style.display = 'none'
      $gameMenu.style.display = 'block'
      $battleMenu.style.display = 'none'
   } else if (screen === 'battle') {
      $startScreen.style.display = 'none'
      $gameMenu.style.display = 'none'
      $battleMenu.style.display = 'block'
   }
 }
 onGameMenuInput = (event) => {
   event.preventDefault()
   const input = event.target['menu-input'].value
   if (input === '1'){
     this.changeScreen('battle')
     const randomIndex = Math.floor(Math.random() * this.monsterList.length)
     const randomMonster = this.monsterList[randomIndex]
     this.monster = new Monster(
       this,
       randomMonster.name,
       randomMonster.hp,
       randomMonster.att,
       randomMonster.xp
     )
     this.updateMonsterStat();
     this.showMessage(`몬스터와 마주쳤다. ${this.monster.name}인 것 같다!`)
   } else if (input === '2'){
     this.showMessage(`휴식을 취합니다! ${this.hero.maxHp - this.hero.hp}HP를 회복하여 최대 HP가 되었습니다!` )
     this.hero.hp = this.hero.maxHp
     this.updateHeroStat()
   } else if (input === '3'){
    const end = confirm('게임을 종료할까요? save는 없답니다')
    end? location.reload() : ''
   }
 }
 onBattleMenuInput = (event) => {
  event.preventDefault()
  const input = event.target['battle-input'].value
  if (input === '1'){
    const { hero, monster } = this
    hero.attack(monster)
    monster.attack(hero)
    if(hero.hp <= 0){
      this.showMessage(`${hero.lev} 레벨에서 전사. 새 주인공을 생성하세요`)
      this.quit()
    } else if(monster.hp <= 0) {
      this.showMessage(`몬스터를 잡아 ${monster.xp} 경험치를 얻었다!`)
      hero.getXp(monster.xp)
      this.monster = null
      this.changeScreen('game')
    } else{
      this.showMessage(`${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`)
    }
    this.updateHeroStat()
    this.updateMonsterStat()
  } else if (input === '2'){
    this.showMessage('HP 20을 회복합니다.')
    this.hero.heal(this.monster)
    this.updateHeroStat()
  } else if (input === '3'){
    alert('성공적으로 도망쳤다!')
    this.updateHeroStat()
    this.monster = null
    this.changeScreen('game')
    this.showMessage('')
    this.updateMonsterStat()
  }
  }
  updateHeroStat() {
    const { hero } = this
    if(hero === null){
      $heroName.textContent = ''
      $heroLevel.textContent = ''
      $heroHp.textContent = ''
      $heroXp.textContent = ''
      $heroAtt.textContent = ''
      return
    }
    $heroName.textContent = hero.name
    $heroLevel.textContent = `${hero.lev}Lev`
    $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`
    $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lev}`
    $heroAtt.textContent = `ATT: ${hero.att}`
  }
  updateMonsterStat() {
    const { monster } = this
    if(monster === null){
      $monsterName.textContent = ''
      $monsterHp.textContent = ''
      $monsterAtt.textContent = ''
      return
    }
    $monsterName.textContent = monster.name
    $monsterHp.textContent = `HP: ${monster.hp} / ${monster.maxHp}`
    $monsterAtt.textContent = `ATT: ${monster.att}`
  }
  showMessage(text) {
    $message.textContent = text
  }
  quit(){
    this.hero = null
    this.monster = null
    this.updateHeroStat()
    this.updateMonsterStat()
    $gameMenu.removeEventListener('submit', this.onGameMenuInput)
    $battleMenu.removeEventListener('submit', this.onBattleMenuInput)
    this.changeScreen('start')
    game = null
  }
}

class Unit {
  constructor(game, name, hp, att, xp){
    this.game = game
    this.name = name
    this.maxHp = hp
    this.hp = hp
    this.xp = xp
    this.att = att
  }
  attack(target){
    target.hp -= this.att
  }
}

class Hero extends Unit {
  constructor(game, name) {
    super(game, name, 100, 10, 0)
    this.lev = 1
  }
  attack(target) {
    super.attack(target)
  }
  heal(monster) {
    if(this.hp + 20 >= this.maxHp){
      this.hp = this.maxHp
      this.hp -= monster.att
    } else{
      this.hp += 20;
      this.hp -= monster.att
    }
  }
  getXp(xp) {
    this.xp += xp
    if(this.xp >= this.lev * 15){
      this.xp -= this.lev * 15
      this.lev += 1
      this.maxHp += 5
      this.att += 5
      this.hp = this.maxHp
      this.game.showMessage(`레벨업! ${this.lev}달성!`)
    }
  }
}

class Monster extends Unit {
  constructor(game, name, hp, att, xp){
    super(game, name, hp, att, xp)
  }
  // attack 메소드가 없어도 부요에 있기 때문에 작성하지 않아도 된다.
}

let game = null
$startScreen.addEventListener('submit', (event) => {
  event.preventDefault()
  const name = event.target['name-input'].value
  game = new Game(name)
})