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

// 주인공 스펙
const hero = {
  name: '',
  lev: 1,
  maxHp: 100,
  hp: 100,
  xp: 0,
  att: 10,
  attack(monster) {
    monster.hp -= this.att;
    this.hp -= monster.att
  },
  heal(monster) {
    this.hp += 20;
    this.hp -= monster.att
  }
}

// 몬스터 설정
let monster = null
const monsterList = [
  {name: '파랑달팽이', hp: 25, att: 10, xp: 10},
  {name: '리본돼지', hp: 50, att: 15, xp: 20},
  {name: '쥬니어발록', hp: 150, att: 35, xp: 50},
]

$startScreen.addEventListener('submit', (event) => {
  event.preventDefault()
  const name = event.target['name-input'].value
  console.log(event.target.value)
  console.log(name)
  $startScreen.style.display = 'none'
  $gameMenu.style.display = 'block'
  $heroName.textContent = name
  $heroLevel.textContent = `${hero.lev}Lev`
  $heroHp.textContent = `HP: ${hero.hp} / ${hero.maxHp}`
  $heroXp.textContent = `XP: ${hero.xp} / ${15 * hero.lev}`
  $heroAtt.textContent = `ATT: ${hero.att}`
  hero.name = name
})

// 시작 게임 화면
$gameMenu.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = event.target['menu-input'].value
  // 1번 모험 선택시 
  if(input === '1'){
    $gameMenu.style.display = 'none'
    $battleMenu.style.display = 'block'
    // 객체 깊은 복사를 하기 위해 사용됨
    // 객체를 문자로 만들었다 다시 객체로 만듦 
    monster = JSON.parse(
      JSON.stringify(monsterList[Math.floor(Math.random() * monsterList.length)])
    )
    monster.maxHp = monster.hp
    $monsterName.textContent = monster.name
    $monsterHp.textContent = `HP: ${monster.hp} / ${monster.maxHp}`
    $monsterAtt.textContent = `ATT: ${monster.att}`
  } else if(input === '2'){

  } else if(input === '3'){
    
  }
})

// 모험 화면
$battleMenu.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = event.target['battle-input'].value
  if(input === '1'){
    hero.attack(monster)
    monster.attack(hero)
    $heroHp.textContent = `HP: ${hero.hp} / ${hero.maxHp}`
    $monsterHp.textContent = `HP: ${monster.hp} / ${monster.maxHp}`
    $message.textContent = `${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`
  } else if(input === '2'){

  } else if(input === '3'){
    
  }
})