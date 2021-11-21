const $timer = document.querySelector('#timer')
const $score = document.querySelector('#score')
const $game = document.querySelector('#game')
const $start = document.querySelector('#start')
const $$cells = document.querySelectorAll('.cell')
const $life = document.querySelector('#life')

const holes = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let started = false
let score = 0
let time = 60
let timerId
let tickId
$start.addEventListener('click', () => {
  if (started) return
  started = true
  console.log('시작')
  timerId = setInterval(() => {
    time = (time * 10 - 1) / 10
    $timer.textContent = time
    if (time === 0) {
      clearInterval(timerId)
      clearInterval(tickId)
      setTimeout(() => {
        alert(`게임 오버! 점수는 ${score}점`)
      }, 50)
    }
  }, 100)
  tickId = setInterval(tick, 1000)
  tick()
})

let gopherPercent = 0.3
let bombPercent = 0.5
function tick() {
  holes.forEach((hole, index) => {
    if (hole) return
    const randomValue = Math.random()
    if (Math.random() < gopherPercent) {
      const $gopher = $$cells[index].querySelector('.gopher')
      holes[index] = setTimeout(() => {
        $gopher.classList.add('hidden')
        holes[index] = 0
      }, 1000)
      $gopher.classList.remove('hidden')
    } else if (Math.random() < bombPercent) {
      const $bomb = $$cells[index].querySelector('.bomb')
      holes[index] = setTimeout(() => {
        $bomb.classList.add('hidden')
        holes[index] = 0
      }, 1000)
      $bomb.classList.remove('hidden')
    }
  })
}

$$cells.forEach(($cell, index) => {
  $cell.querySelector('.gopher').addEventListener('click', (event) => {
    if (!event.target.classList.contains('dead')) {
      score += 1
      $score.textContent = score
    }
    event.target.classList.add('dead')
    event.target.classList.add('hidden')
    clearTimeout(holes[index])
    setTimeout(() => {
      holes[index] = 0
      event.target.classList.remove('dead')
    }, 1000)
  })
  $cell.querySelector('.bomb').addEventListener('click', (event) => {
    let leftLife = $life.innerText
    leftLife -= 1
    $life.innerText = leftLife
    if (leftLife === 1) {
      $life.style.color = 'red'
    }
    if (leftLife === 0) {
      setTimeout(() => {
        alert(`게임 오버! 점수는 ${score}점`)
        const retry = confirm('재도전 하시겠습니까?')
        if (retry) {
          location.reload()
        } else {
          clearInterval(timerId)
          clearInterval(tickId)
        }
      }, 50)
    }
    event.target.classList.add('boom')
    event.target.classList.add('hidden')
    clearTimeout(holes[index])
    setTimeout(() => {
      holes[index] = 0
      event.target.classList.remove('boom')
    }, 1000)
  })
})
