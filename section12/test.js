const obj = {
  a: 'obj\'s a'
}
const obj1 = null

const pass = (x) => {
  console.log(x, ' pass')
}

// if(obj?.a){
//   pass()
// }

// if(obj1?.a){
//   pass()
// }

obj?.a && pass(obj.a)
obj1?.a && pass(obj1.a)

if(obj?.a) {
  pass(obj.a)
}
if(obj1?.a) {
  pass(obj.a)
}