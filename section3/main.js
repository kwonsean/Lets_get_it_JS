const totalGamers = Number(prompt('총 참가자의 수를 입력해 주세요.'))

const gamerNumber = document.querySelector('#order')
const inputEl = document.querySelector('input')
const buttonEl = document.querySelector('button')
const wordEl = document.querySelector('#word')
let word = ''
let newWord = ''
console.log(gamerNumber)

function onClickButton(){
  if(!word){
    word = newWord
    wordEl.textContent = word
    inputEl.value = ''
    inputEl.focus()
  } else{
    if(word[word.length -1] === newWord[0]){
      word = newWord
      wordEl.textContent = word
      const gameTurn = Number(gamerNumber.textContent)
      gameTurn + 1  <= totalGamers ? gamerNumber.textContent = gameTurn + 1 : gamerNumber.textContent = 1
      inputEl.value = ''
      inputEl.focus()

    } else{
      alert('틀렸습니다.')
      inputEl.value = ''
      inputEl.focus()
    }
  }
}

function onInput(event){
  newWord = event.target.value
  console.log(newWord)
}

buttonEl.addEventListener('click', onClickButton)
inputEl.addEventListener('input', onInput)
