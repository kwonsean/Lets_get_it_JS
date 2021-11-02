const $computer = document.querySelector('#computer')
const $result = document.querySelector('#result')
const $myScore = document.querySelector('#myScore')
const $computerScore = document.querySelector('#computerScore')
const $scissors = document.querySelector('#scissors')
const $rock = document.querySelector('#rock')
const $paper = document.querySelector('#paper')
const IMG_URL = './rsp.png'
$computer.style.background = `url(${IMG_URL}) 0 0`
$computer.style.backgroundSize = 'auto 200px'


// 객체로 공통되는 변수들을 묶음
// const scissorsX = '-0'
// const rockX = '-220px'
// const paperX = '-440px'
const rspX = {
  scissors: '0',
  rock: '-220px',
  paper: '-440px'
}

let computerChoice = 'scissors'
const changeComputerHand = () => {
  if(computerChoice === 'rock'){
    computerChoice = 'scissors'
  } else if (computerChoice === 'scissors'){
    computerChoice = 'paper'
  } else if(computerChoice === 'paper'){
    computerChoice = 'rock'
  }
  $computer.style.background = `url(${IMG_URL})  ${rspX[computerChoice]} 0`
  $computer.style.backgroundSize = 'auto 200px'
}
let intervalId = setInterval(changeComputerHand, 50)

const scoreTable = {
  rock: 0,
  scissors: 1,
  paper: -1,
}

let clickable = true
let myWin = 0;
let computerWin = 0;
let message = ''
const clickBtn = () =>{
  if(clickable){
    clearInterval(intervalId)
    clickable = false
    const myChoice = event.target.textContent === '바위'
      ? 'rock'
      :event.target.textContent === '가위'
      ? 'scissors'
      : 'paper'

    const myScore = scoreTable[myChoice]
    const computerScore =scoreTable[computerChoice]
    const diff = myScore - computerScore
    if(diff === 2 || diff === -1){
      message = '승리'
      myWin += 1
    } else if([-2, 1].includes(diff)){
      message = '패배'
      computerWin += 1
    } else{
      message = '무승부'
    }
    $result.textContent = `${message}!`
    $myScore.textContent = `내 점수: ${myWin}`
    $computerScore.textContent = `컴퓨터 점수: ${computerWin}`

    // 미션 5판 3선승
    if(myWin === 3){
      $result.textContent = `게임이 끝났습니다. 승자는 나자신!`
      setTimeout(() =>{
        resetGame()
      }, 3000)
    } else if(computerWin === 3){
      $result.textContent = `게임이 끝났습니다. 승자는 컴퓨터!`
      setTimeout(() =>{
        resetGame()
      }, 3000)
    } else{
      setTimeout(() =>{
        clickable = true
        intervalId = setInterval(changeComputerHand, 50)
      }, 2000)
    }
  }
}

/*
버튼을 클릭하면 clickBtn함수가 시작되고 처음엔 clickable이 true이기 때문에 if문 통과
인터벌 멈추고 clickable false로 함. 
따라서 멈춘상태에서는 버튼을 다시 눌러도 clickable이 false이기 때문에 작동 X
2초뒤에 clickable은 다시 true가 되고 인터벌이 돌기 시작함
*/

$rock.addEventListener('click', clickBtn)
$scissors.addEventListener('click', clickBtn)
$paper.addEventListener('click', clickBtn)

function resetGame(){
  let retry = confirm('한판 더?')
  if(retry){
    myWin = 0
    computerWin = 0
    $result.textContent = ''
    $myScore.textContent = '0'
    $computerScore.textContent = '0'
    clickable = true
    intervalId = setInterval(changeComputerHand, 50)
  }
}