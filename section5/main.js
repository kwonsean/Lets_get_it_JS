const $form = document.querySelector('#form')
const $input = $form.querySelector('#input')
const $logs = document.querySelector('#logs')

const numbers = []
for (let n = 1; n<10; n++){
  numbers.push(n);
}

const answer = []
for(let n = 0; n < 4; n++){
  const index = Math.floor(Math.random() * numbers.length);
  answer.push(numbers[index])
  numbers.splice(index, 1)
}
console.log(answer)
alert('숫자가 정해졌습니다!')

const tries = []
function checkInput(input){
  if(input.length !==4) {
    return alert('4자리 숫자를 입력하세요.')
  }
  if(new Set(input).size !==4){
    return alert('중복된 숫자를 입력하지 마세요')
  }
  if(tries.includes(input)){
    return alert('이미 시도한 값입니다.')
  }
  return true
}

let out = 0;

$form.addEventListener('submit', (event) =>{
  event.preventDefault();
  const value = $input.value
  $input.value = ''
  // 들어온 값이 올바른 값인지 확인 
  const valid = checkInput(value)

  // 올바른 값이 아니면 함수 종료
  if(!valid) return

  // 정답이랑 같으면 홈런 출력 후 종료
  if(answer.join('') === value){
    $logs.textContent = `${value} -> 홈런!`
    setTimeout(() =>{
      const retry = confirm('한번 더?')
      if(retry){
        window.location.reload()
      }else{
      return
      }
    },1000)
    return
  }

  // 시도한 횟수가 10번이도면 실패
  if(tries.length >= 9){
    const message = document.createTextNode(`실패! 정답은 ${answer.join('')} 입니다.`)
    $logs.appendChild(message);
    setTimeout(() =>{
      const retry = confirm('한번 더?')
      if(retry){
        window.location.reload()
      }else{
      return
      }
    },1000)
    return
  }

  let strike = 0;
  let ball = 0;
  for(let i =0; i<answer.length; i++){
    // 이 부분이 제일 어려운 부분 
    /*
    for문은 answer의 요소를 차례로 하나씩 가져온다
    이때 가져온 값으로 indexOf를 사용해서 value(입력받은 값)에 answer요소가 있는지 확인
    만약 있다면 그 value안에 있는 그 요소의 index값이 나오고 없다면 -1값이 나옴 
    따라서 -1값만 아니면 그 값은 answer에 있는 값이기 때문에 ball 또는 strike임
    이때 indexOf의 결과값 인덱스와 for문에서 answer의 값을 찾기 위해 사용한 i값을 비교하여
    그 값이 같으면 위치가 같으므로 strike++ 다르면 ball++ 실행 
    */ 
    const index = value.indexOf(answer[i])  
    if(index > -1){
      if(index === i){
        strike++
      }else{
        ball++
      }
    }
  }

  // 결과적으로 ball, strike가 아무것도 없으면 OUT!
  // 즉 ball+strike가 0이면(false) 아웃 
  if(ball+strike){
    $logs.append(`${value}: ${strike} 스트라이크 ${ball} 볼`, document.createElement('br'))
    tries.push(value)
  } else {
    out++
    if(out > 2){
      const message = document.createTextNode(`3 아웃! 정답은 ${answer.join('')} 입니다.`)
      $logs.appendChild(message);
      setTimeout(() =>{
        const retry = confirm('한번 더?')
        if(retry){
          window.location.reload()
        }else{
        return
        }
      },1000)
      return
    } 
    $logs.append(`${value}: ${out} 아웃 입니다.`, document.createElement('br'))
    tries.push(value)
  }
  console.log(tries)
})