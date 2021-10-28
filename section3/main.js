let totalGamers = Number(prompt('총 참가자의 수를 입력해 주세요.'))

// 숫자가 아닌값 입력시 숫자 입력 유도
while(!totalGamers){
  if(!totalGamers){
    totalGamers = Number(prompt('숫자를 입력해주세요!!!'))
  }
}

const gamerNumber = document.querySelector('#order')
const inputEl = document.querySelector('input')
const buttonEl = document.querySelector('button')
const wordEl = document.querySelector('#word')
let word = ''
let newWord = ''

function onClickButton(){
  if(!word || word[word.length -1] === newWord[0]){
    word = newWord
    wordEl.textContent = word
    const gameTurn = Number(gamerNumber.textContent)
    gameTurn + 1  <= totalGamers ? gamerNumber.textContent = gameTurn + 1 : gamerNumber.textContent = 1
    inputEl.value = ''
    inputEl.focus()
  } else{
    alert(`'${word[word.length-1]}'로 시작하는 단어여야 합니다!`)
    
    // 재도전 선택 구현 
    let retry = confirm('재도전 하시겠습니까?')
    if(retry){
      inputEl.value = ''
      inputEl.focus()
    } else{
      window.location.reload()
    }
  }
}

function onInput(event){
  newWord = event.target.value
  if(newWord === ' ' || newWord[newWord.length -1] === ' '){
    alert('공백을 입력하면 안됩니다.')
    inputEl.value = ''
    inputEl.focus()
  }
  console.log(newWord)
}

buttonEl.addEventListener('click', onClickButton)
inputEl.addEventListener('input', onInput)

// 엔터를 눌러도 입력이 되도록 구현
inputEl.addEventListener('keyup', (event)=>{
  if(event.key === 'Enter') onClickButton()
})
