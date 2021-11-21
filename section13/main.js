const $table = document.getElementById('table')
const $score = document.getElementById('score')
let data = []

// $table -> $fragment -> $tr -> $td
function startGame() {
  const $fragment = document.createDocumentFragment();
    [1, 2, 3, 4].forEach(function () {
      const rowData = []
      data.push(rowData)
      const $tr = document.createElement('tr');
      [1, 2, 3, 4].forEach(() => {
        rowData.push(0)
        const $td = document.createElement('td')
        $tr.appendChild($td)
      })
      $fragment.appendChild($tr)
    })
  $table.appendChild($fragment)
  put2ToRandomCell()
  draw()
}

function put2ToRandomCell() {
  // 값을 2개씩 가지는(행, 열) 2차원 배열이 채워짐
  const emptyCells = [] // [[i1, j1], [i2, j2], [i3, j3]]
  data.forEach(function (rowData, i) {
    rowData.forEach(function (cellData, j) {
      if (!cellData) {
        emptyCells.push([i, j])
      }
    })
  })
  console.log('empty',emptyCells)
  // randomCell === [i, j]
  // 랜덤으로 하나 골라서
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
  // 행, 열 값을 data에 넣고 그곳에 2를 넣어줌 
  data[randomCell[0]][randomCell[1]] = 2
}

function draw() {
  // 모든 데이터(표에 모든 칸)을 돌면서 값이 있으면 그 값을 넣어줌
  data.forEach((rowData, i) => {
    rowData.forEach((cellData, j) => {
      const $target = $table.children[i].children[j]
      if (cellData > 0) {
        $target.textContent = cellData
        $target.className = 'color-' + cellData
      } else {
        $target.textContent = ''
        $target.className = ''
      }
    })
  })
}

startGame()

// data = [
//   [32, 2, 4, 2],
//   [64, 4, 8, 4],
//   [2, 1024, 1024, 32],
//   [32, 16, 64, 4],
// ];
// draw();
function moveCells(direction) {
  switch (direction) {
    case 'left': {
      const newData = [[], [], [], []]
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (cellData) {
            // newData = [2, 2, 4]
            const currentRow = newData[i]
            const prevData = currentRow[currentRow.length - 1]
            if (prevData === cellData) {
              // 이전 값과 지금 값이 같으면
              const score = parseInt($score.textContent)
              $score.textContent = score + currentRow[currentRow.length - 1] * 2
              currentRow[currentRow.length - 1] *= -2
            } else {
              newData[i].push(cellData)
            }
          }
        })
      })
      console.log('newData',newData)
      ;[1, 2, 3, 4].forEach((rowData, i) => {
        ;[1, 2, 3, 4].forEach((cellData, j) => {
          data[i][j] = Math.abs(newData[i][j]) || 0
        })
      })
      break
    }
    case 'right': {
      const newData = [[], [], [], []]
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (rowData[3 - j]) {
            const currentRow = newData[i]
            const prevData = currentRow[currentRow.length - 1]
            if (prevData === rowData[3 - j]) {
              const score = parseInt($score.textContent)
              $score.textContent = score + currentRow[currentRow.length - 1] * 2
              currentRow[currentRow.length - 1] *= -2
            } else {
              newData[i].push(rowData[3 - j])
            }
          }
        })
      })
      console.log(newData)
      ;[1, 2, 3, 4].forEach((rowData, i) => {
        ;[1, 2, 3, 4].forEach((cellData, j) => {
          data[i][3 - j] = Math.abs(newData[i][j]) || 0
        })
      })
      break
    }
    case 'up': {
      const newData = [[], [], [], []]
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (cellData) {
            const currentRow = newData[j]
            const prevData = currentRow[currentRow.length - 1]
            if (prevData === cellData) {
              const score = parseInt($score.textContent)
              $score.textContent = score + currentRow[currentRow.length - 1] * 2
              currentRow[currentRow.length - 1] *= -2
            } else {
              newData[j].push(cellData)
            }
          }
        })
      })
      console.log(newData)
      ;[1, 2, 3, 4].forEach((cellData, i) => {
        ;[1, 2, 3, 4].forEach((rowData, j) => {
          data[j][i] = Math.abs(newData[i][j]) || 0
        })
      })
      break
    }
    case 'down': {
      const newData = [[], [], [], []]
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (data[3 - i][j]) {
            const currentRow = newData[j]
            const prevData = currentRow[currentRow.length - 1]
            if (prevData === data[3 - i][j]) {
              const score = parseInt($score.textContent)
              $score.textContent = score + currentRow[currentRow.length - 1] * 2
              currentRow[currentRow.length - 1] *= -2
            } else {
              newData[j].push(data[3 - i][j])
            }
          }
        })
      })
      console.log(newData)
      ;[1, 2, 3, 4].forEach((cellData, i) => {
        ;[1, 2, 3, 4].forEach((rowData, j) => {
          data[3 - j][i] = Math.abs(newData[i][j]) || 0
        })
      })
      break
    }
  }
  if (data.flat().includes(2048)) {
    // 승리
    draw()
    setTimeout(() => {
      alert('축하합니다. 2048을 만들었습니다!')
    }, 0)
  } else if (!data.flat().includes(0)) {
    // 빈 칸이 없으면 패배
    alert(`패배했습니다... ${$score.textContent}점`)
  } else {
    put2ToRandomCell()
    draw()
  }
}

window.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowUp') {
    moveCells('up')
  } else if (event.key === 'ArrowDown') {
    moveCells('down')
  } else if (event.key === 'ArrowLeft') {
    moveCells('left')
  } else if (event.key === 'ArrowRight') {
    moveCells('right')
  }
})

// 배열로 받으니깐 변수가 줄어듭니다요
let startCoord
window.addEventListener('mousedown', (event) => {
  startCoord = [event.clientX, event.clientY]
})
window.addEventListener('mouseup', (event) => {
  const endCoord = [event.clientX, event.clientY]
  const diffX = endCoord[0] - startCoord[0]
  const diffY = endCoord[1] - startCoord[1]
  if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
    moveCells('left')
  } else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
    moveCells('right')
  } else if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
    moveCells('down')
  } else if (diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
    moveCells('up')
  }
})
