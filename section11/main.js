const $wrapper = document.querySelector('#wrapper')

let total = 0
const color = ['red', 'orange', 'yellow', 'green', 'purple', 'pink', 'royalblue', 'aquamarine', 'slategray', 'salmon']
let colorCopy = []
let shuffled = []
let clicked = []
let completed = []
let clickable = false
let startTime = 0

function shuffle() {
  for(let i = 0; colorCopy.length > 0; i +=1){
    const randomIndex = Math.floor(Math.random() * colorCopy.length)
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1))
  }
}

function createCard(i) {
  const card = document.createElement('div')
  card.className = 'card'
  const cardInner = document.createElement('div')
  cardInner.className = 'card-inner'
  const cardFront = document.createElement('div')
  cardFront.className = 'card-front'
  const cardBack = document.createElement('div')
  cardBack.className = 'card-back'
  cardBack.style.backgroundColor = shuffled[i]
  cardInner.appendChild(cardFront)
  cardInner.appendChild(cardBack)
  card.appendChild(cardInner)
  return card
}

function onClickcard(){
  if(!clickable || completed.includes(this) || clicked[0] === this){
    return
  }
  this.classList.toggle('flipped')
  clicked.push(this)
  if(clicked.length !== 2) {
    return
  }
  const firstBackColor = clicked[0].querySelector('.card-back').style.backgroundColor
  const secondBackColor = clicked[1].querySelector('.card-back').style.backgroundColor
  if(firstBackColor === secondBackColor) {
    completed.push(clicked[0])
    completed.push(clicked[1])
    clicked = [] 
    if(completed.length !== total) {
      return
    }
    setTimeout(() => {
      let endTime = new Date()
      let record = ((endTime - startTime) / 1000).toFixed(2)
      alert(`축하합니다! ${record}초 안에 클리어했습니다.`)
      resetGame()
    }, 1000)
    return
  }
  clickable = false
  setTimeout(() => {
    clicked[0].classList.remove('flipped')
    clicked[1].classList.remove('flipped')
    clicked = []
    clickable = true
  }, 500)
  
}

function startGame() {
  console.trace()
  let inputNum = Number(prompt('12~20 사이의 짝수를 입력해 주세요.'))
  if(inputNum === 0) return
  if(inputNum < 12 || inputNum > 20 || inputNum % 2 !==0){
    alert('잘못된 입력입니다.')
    resetGame()
  }
  total = inputNum
  let slicedColors = color.slice(0, total/2)
  colorCopy = [...slicedColors, ...slicedColors]
  startTime = new Date()
  shuffle()
  for (let i = 0; i < total; i +=1){
    const card = createCard(i)
    card.addEventListener('click', onClickcard)
    $wrapper.appendChild(card)
  }
  
  document.querySelectorAll('.card').forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('flipped')
    }, 1000 + 100 * index)
  })

  setTimeout(() => {
    document.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('flipped')
    })
    clickable = true
  }, 5000)
}
startGame()

function resetGame() {
  $wrapper.innerHTML = '';
  total = 0
  colorCopy = []
  shuffled = []
  completed = []
  clicked = []
  clickable= false
  startGame()
}
