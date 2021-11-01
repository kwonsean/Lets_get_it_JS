const candidate = Array(45).fill().map((v,i) => i+1)

// 피셔-예이츠 셔플 
const shuffle = []
while (candidate.length > 0){
  const random = Math.floor(Math.random() * candidate.length)
  const spliceArray = candidate.splice(random, 1)
  const value = spliceArray[0]
  shuffle.push(value)
}

const winBalls = shuffle.slice(0, 6).sort((a,b) => a-b) // slice는 원본 영향 x 
const bonus = shuffle[6] 
console.log('winBalls:', winBalls, ' bonus:',bonus)

function drawBall(number, $parent){
    const $ball = document.createElement('div')
    $ball.className = 'ball'
    $ball.textContent = number
    // mission 부분 
    if(number < 10){
      $ball.classList.add('red')
    } else if(number < 20){
      $ball.classList.add('orange')
    } else if(number < 30){
      $ball.classList.add('yellow')
    } else if(number < 40){
      $ball.classList.add('blue')
    } else{
      $ball.classList.add('green')
    }
    $parent.appendChild($ball)
}

const $result = document.querySelector('#result')
for(let i =0; i<winBalls.length; i++){
  setTimeout(()=>{
    drawBall(winBalls[i], $result)
  }, 1000 * (i+1))
}

const $bonus = document.querySelector('#bonus')
setTimeout(()=>{
  drawBall(bonus, $bonus)
},7000)
