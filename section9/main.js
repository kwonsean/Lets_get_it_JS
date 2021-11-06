const { body } = document
const $table = document.createElement('table')
const $result = document.createElement('div')
const rows = []
let turn = 'O'

const checkWinner = (target) => {
  let rowIndex;
  let cellIndex;
  rows.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      if(cell === target){
        rowIndex = ri
        cellIndex = ci
      }
    })
  })
  // 승리조건 충족?
  let hasWinnder = false
  // 가로줄 검사
  if(
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn 
  ) hasWinnder = true
  // 세로줄 검사
  if(
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn 
  ) hasWinnder = true
  // 대각선 검사
  if(
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn 
  ) hasWinnder = true
  if(
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn 
  ) hasWinnder = true

  return hasWinnder
}

const clicked = (event) => {
  if(event.target.textContent !== ''){
    console.log('빈칸 x')
  }else {
    console.log('빈칸')
    event.target.textContent = turn
    const hasWinnder = checkWinner(event.target)
    if(hasWinnder){
      $result.textContent = `${turn}님의 승리`
      $table.removeEventListener('click', clicked)
      return
    }
    const draw = rows.flat().every((cell) => cell.textContent)
    if(draw){
      $result.textContent = '무승부'
      return
    }
    turn = turn === 'X' ? 'O' : 'X'
  }
}

for (let i = 1; i <= 3; i++){
  const $tr = document.createElement('tr')
  const cells = []
  for(let j = 1; j <= 3; j++){
    const $td = document.createElement('td')
    cells.push($td)
    $tr.appendChild($td)
  }
  rows.push(cells)
  $table.appendChild($tr)
  $table.addEventListener('click', clicked)
}
body.appendChild($table)
body.appendChild($result)

const array = [1,'hello', null, undefined, false]
const check = array.some((item) => item !== null)
console.log(check)

const doubleArr =[[[1,2], [3,4], [9,7]], [[11,22], [33,44], [99,77]]]
console.log(doubleArr.flat())
console.log(doubleArr.flat().flat())

const test = 'test'
console.log(Array.from(test))