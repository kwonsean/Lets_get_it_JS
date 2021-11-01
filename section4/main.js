let numOne = ''
let operator = ''
let numTwo = ''
let level = 0 // 연산을 이어서 하는 경우를 나타냄

const $operator = document.querySelector('#operator')
const $result = document.querySelector('#result')


const onClickNumber = (number) => {
  return () =>{
    if(operator){
      // 0 계속 쓰는거 방지
      if(number === '0' && numTwo === '0'){
        return
      }
      if(number !== '0' && numTwo === '0'){
        $result.value = $result.value.slice(0,-1)
      }
      numTwo += number
    } else{
      if(level){
        alert('연산자를 입력해주세요!')
        return
      }
      if(number === '0' && numOne === '0'){
        return
      }
      if(number !== '0' && numOne === '0'){
        $result.value = ''
      }
      numOne += number
    }
    $result.value += number
  }
}



document.querySelector('#num-0').addEventListener('click', onClickNumber('0'))
document.querySelector('#num-1').addEventListener('click', onClickNumber('1'))
document.querySelector('#num-2').addEventListener('click', onClickNumber('2'))
document.querySelector('#num-3').addEventListener('click', onClickNumber('3'))
document.querySelector('#num-4').addEventListener('click', onClickNumber('4'))
document.querySelector('#num-5').addEventListener('click', onClickNumber('5'))
document.querySelector('#num-6').addEventListener('click', onClickNumber('6'))
document.querySelector('#num-7').addEventListener('click', onClickNumber('7'))
document.querySelector('#num-8').addEventListener('click', onClickNumber('8'))
document.querySelector('#num-9').addEventListener('click', onClickNumber('9'))

const onClickOperator = (op) => () => {
  if(numOne) {
    operator = op
    $operator.value = op
    $result.value += operator
  } else{
    alert('먼저 숫자를 입력하세요!')
  }
}
 
document.querySelector('#plus').addEventListener('click', onClickOperator('+'))
document.querySelector('#minus').addEventListener('click', onClickOperator('-'))
document.querySelector('#multiply').addEventListener('click', onClickOperator('x'))
document.querySelector('#divide').addEventListener('click', onClickOperator('/'))

const onClickCalculate = () => {
  if (!numOne) {
    alert('첫번째 숫자를 입력해 주세요.')
    return
  }
  if (!operator) {
    alert('연산자를 입력해 주세요.')
    return
  }
  if (!numTwo) {
    alert('두번째 숫자를 입력해 주세요.')
    return
  }
  numOne = Number(numOne)
  numTwo = Number(numTwo)
  switch(operator){
    case '+': $result.value = numOne + numTwo
              readyNext()
              break;
    case '-': $result.value = numOne - numTwo
              readyNext()
              break;
    case 'x': $result.value = numOne * numTwo
              readyNext()
              break;
    case '/': if(numOne % numTwo === 0) $result.value = numOne / numTwo
              else $result.value = (numOne / numTwo).toFixed(2)
              readyNext()
              break;
  }
}

const readyNext = () => {
  $operator.value = ''
  operator = ''
  numOne = String($result.value)
  numTwo = ''
  level++
}

document.querySelector('#calculate').addEventListener('click', onClickCalculate)

const onClickClear = () => {
  numOne = ''
  numTwo = ''
  operator = ''
  $operator.value = ''
  $result.value = ''
  level = 0
}

document.querySelector('#clear').addEventListener('click', onClickClear)
