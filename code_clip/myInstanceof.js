const typeArr = ['string', 'boolean', 'number', 'undefined', 'symbol']
function myInstanceof(left, right) {
  if(typeArr.includes(typeof left)){
    // left  为基本类型
    return false
  }
  if(typeof right !== 'function'){
    return false
  }
  let rightP = right.prototype
  left = Object.getPrototypeOf(left)
  while(true){
    if(left === null){
      return false
    }
    if(left === rightP){
      return true
    }
    left = Object.getPrototypeOf(left)
  }
}

///////////////////////////
let flag = myInstanceof(['1'], Array)
flag = myInstanceof(1, Array)

console.log(typeof [])