const $screen = document.querySelector('#screen')
const $result = document.querySelector('#result')
const $ul = document.querySelector('ul')

let startTime
let endTime
const records = []
let timeoutId

$screen.addEventListener('click', function(){
  // waiting화면일 때 (파란색)
  if ($screen.classList.contains('waiting')){
    $screen.classList.replace('waiting', 'ready')
    $screen.textContent = '초록색이 되면 클릭하세요'
    timeoutId = setTimeout(()=>{
      startTime = new Date()
      $screen.classList.replace('ready', 'now')
      $screen.textContent = '클릭하세요!'  
    }, Math.floor(Math.random() * 1000) + 2000)
  // ready 화면일 때 (빨간색)
  } else if ($screen.classList.contains('ready')){
    clearTimeout(timeoutId)
    $screen.classList.replace('ready', 'waiting')
    $screen.textContent = '침착하라구!!'
    setTimeout(()=>{
      if ($screen.classList.contains('waiting')){
       $screen.textContent = '클릭해서 시작하세요'
      } else if ($screen.classList.contains('ready')){
        $screen.textContent = '초록색이 되면 클릭하세요'
      }
    },1500)  
  // now 화면일 때 (초록색)
  } else if ($screen.classList.contains('now')){
    endTime = new Date()
    const current = endTime - startTime
    records.push(current)
    const average = (records.reduce((acc, cur) => {return acc + cur}, 0) / records.length).toFixed(2)
    $result.textContent = `현재 기록: ${current}ms, 평균 기록: ${average}ms`
    startTime = null
    endTime = null
    $screen.classList.replace('now', 'waiting')
    $screen.textContent = '클릭해서 시작하세요'
    $ul.classList.add('active')
    recordTopFive()
  }
})

function recordTopFive() {
  records.sort((a,b) => a-b)
  console.log(records)

  while($ul.firstChild){
    $ul.removeChild($ul.firstChild)
  }
  $ul.textContent = 'Top 5 record!'
  for(let i = 0; i<5; i++){
    if(records[i]){
      const li = document.createElement('li')
      li.type = 1
      li.textContent = records[i] + 'ms'
      $ul.appendChild(li)
    }
  }
  

}
