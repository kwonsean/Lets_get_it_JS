const $form = document.querySelector('#form')
const $timer = document.querySelector('#timer')
const $tbody = document.querySelector('#table tbody')
const $result = document.querySelector('#result')

let row
let cell
let mine
const CODE = {
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  MINE: -6,
  OPEND: 0
}
let data
let openCount = 0
let startTime
let interval

function onSubmit(event) {
  event.preventDefault()
  row = parseInt(event.target.row.value)
  cell = parseInt(event.target.cell.value)
  mine = parseInt(event.target.mine.value)
  normalCellFound = false
  searched = null
  firstClick = true
  if(row * cell < mine){
    alert('지뢰의 수가 너무 많습니다.')
    row = 0
    cell = 0
    mine = 0
    return
  }
  drawTable()
  startTime = new Date()
  interval = setInterval(() => {
    const time = Math.floor((new Date() - startTime) / 1000)
    $timer.classList.add('active')
    $timer.textContent = `소요시간 ${time}초`
  }, 1000);
}
$form.addEventListener('submit', onSubmit)

function plantMine() {
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i
  })
  const shuffle = []
  while(candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    shuffle.push(chosen)
  }
  const data = []
  for(let i = 0; i <row; i++){
    const rowData = []
    data.push(rowData)
    for(let j = 0; j < cell; j++){
      rowData.push(CODE.NORMAL)
    }
  }
  for(let k = 0; k <shuffle.length; k++){
    const ver = Math.floor(shuffle[k] / cell)
    const hor = shuffle[k] % cell
    data[ver][hor] = CODE.MINE
  }
  return data
}

function drawTable() {
  data = plantMine()
  // console.log(data)
  data.forEach((row) => {
    const $tr = document.createElement('tr')
    // console.log(row)
    row.forEach((cell) => {
      const $td = document.createElement('td')
      if(cell === CODE.MINE){
        $td.textContent = 'X'
      }
      $tr.append($td)
    })
    $tbody.append($tr)
    $tbody.addEventListener('contextmenu', onRightClick)
    $tbody.addEventListener('click', onLeftClick)
  })
}

function onRightClick(event) {
  event.preventDefault()
  const target = event.target
  const rowIndex = target.parentNode.rowIndex
  const cellIndex = target.cellIndex
  const cellData = data[rowIndex][cellIndex]
  if(cellData === CODE.MINE){
    data[rowIndex][cellIndex] = CODE.QUESTION_MINE
    target.className = 'question'
    target.textContent = '?'
  } else if(cellData === CODE.QUESTION_MINE) {
    data[rowIndex][cellIndex] = CODE.FLAG_MINE
    target.className = 'flag'
    target.textContent = '!'
  } else if(cellData === CODE.FLAG_MINE) {
    data[rowIndex][cellIndex] = CODE.MINE
    target.className = ''
    target.textContent = 'X'  
  } else if(cellData === CODE.NORMAL) {
    data[rowIndex][cellIndex] = CODE.QUESTION
    target.className = 'question'
    target.textContent = '?'
  } else if(cellData === CODE.QUESTION) {
    data[rowIndex][cellIndex] = CODE.FLAG
    target.className = 'flag'
    target.textContent = '!' 
  } else if(cellData === CODE.FLAG) {
    data[rowIndex][cellIndex] = CODE.NORMAL
    target.className = ''
    target.textContent = ''
  }
}

function countMine (rowIndex, cellIndex) {
  const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE]
  let i = 0
  mines.includes(data[rowIndex - 1]?.[cellIndex - 1]) && i++
  mines.includes(data[rowIndex - 1]?.[cellIndex]) && i++
  mines.includes(data[rowIndex - 1]?.[cellIndex + 1]) && i++
  mines.includes(data[rowIndex][cellIndex - 1]) && i++
  mines.includes(data[rowIndex][cellIndex + 1]) && i++
  mines.includes(data[rowIndex + 1]?.[cellIndex - 1]) && i++
  mines.includes(data[rowIndex + 1]?.[cellIndex]) && i++
  mines.includes(data[rowIndex + 1]?.[cellIndex + 1]) && i++
  return i
}

function onLeftClick(event) {
  const target = event.target
  const rowIndex = target.parentNode.rowIndex
  const cellIndex = target.cellIndex
  let cellData = data[rowIndex][cellIndex]
  if(firstClick){
    firstClick = false;
    searched = Array(row).fill().map(() => [])
    if(cellData === CODE.MINE){
      transferMine(rowIndex, cellIndex)
      data[rowIndex][cellIndex] = CODE.NORMAL
      cellData = CODE.NORMAL
    }
  }
  if(cellData === CODE.NORMAL){
    openAround(rowIndex, cellIndex)
  } else if (cellData === CODE.MINE){
    showMines()
    setTimeout(() => {
      target.textContent = '펑'
      target.className = 'opened'
      clearInterval(interval)
      $tbody.removeEventListener('contextmenu', onRightClick)
      $tbody.removeEventListener('click', onLeftClick)
      const retry = confirm('실패했습니다. 재도전 하시겠습니까?')
      if (retry) location.reload()
    },0)
  }
}

function open(rowIndex, cellIndex) {
  if(data[rowIndex]?.[cellIndex] >= CODE.OPEND) return
  const target = $tbody.children[rowIndex]?.children[cellIndex]
  if(!target) {
    return
  }
  const count = countMine(rowIndex, cellIndex)
  target.textContent = count || ''
  target.className = 'opened'
  data[rowIndex][cellIndex] = count
  openCount++
  console.log(openCount)
  if(openCount === row * cell - mine) {
    const time = (new Date() - startTime) / 1000
    clearInterval(interval)
    $tbody.removeEventListener('contextmenu', onRightClick)
    $tbody.removeEventListener('click', onLeftClick)
    setTimeout(() => {
      alert(`승리했습니다! ${time}초가 걸렸습니다.`)
    }, 0)
  }
  return count
}

function openAround(rI, cI) {
  setTimeout(() => {
    const count = open(rI, cI)
    if(count === 0) {
      openAround(rI - 1, cI - 1)
      openAround(rI - 1, cI)
      openAround(rI - 1, cI + 1)
      openAround(rI, cI - 1)
      openAround(rI, cI + 1)
      openAround(rI + 1, cI - 1)
      openAround(rI + 1, cI)
      openAround(rI + 1, cI + 1)
    }
  }, 0);
}

let normalCellFound = false
let searched
let firstClick = true
function transferMine(rI, cI) {
  if (normalCellFound) return
  if (rI < 0 || rI >= row || cI < 0 || cI >= cell) return
  if (searched[rI][cI]) return
  if (data[rI][cI] === CODE.NORMAL){
    normalCellFound = true
    data[rI][cI] = CODE.MINE
  } else {
    searched[rI][cI] = true
    transferMine(rI - 1, cI - 1)
    transferMine(rI - 1, cI)
    transferMine(rI - 1, cI + 1)
    transferMine(rI, cI - 1)
    transferMine(rI, cI + 1)
    transferMine(rI + 1, cI - 1)
    transferMine(rI + 1, cI)
    transferMine(rI + 1, cI + 1)
  }
}

function showMines() {
  const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE]
  data.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if(mines.includes(cell)) {
        $tbody.children[rowIndex].children[cellIndex].textContent = '펑'
      }
    })
  })
}