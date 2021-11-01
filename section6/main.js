const candidate = Array(45).fill().map((v,i) => i+1)

// 피셔-예이츠 셔플 
const shuffle = []
while (candidate.length > 0){
  const random = Math.floor(Math.random() * candidate.length)
  const spliceArray = candidate.splice(random, 1)
  const value = spliceArray[0]
  shuffle.push(value)
}
console.log(shuffle)

const winBalls = shuffle.slice(0, 6).sort((a,b) => a-b) // slice는 원본 영향 x 
const bonus = shuffle[6] 
console.log(winBalls, bonus)

const $result = document.querySelector('#result')
function drawBall(number, $parent){
    const $ball = document.createElement('div')
    $ball.className = 'ball'
    $ball.textContent = number
    $parent.appendChild($ball)
}
for(let i =0; i<winBalls.length; i++){
  setTimeout(()=>{
    drawBall(winBalls[i], $result)
  }, 1000 * (i+1))
}

const $bonus = document.querySelector('#bonus')
setTimeout(()=>{
  drawBall(bonus, $bonus)
},7000)
