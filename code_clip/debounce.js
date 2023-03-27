function debounce(fn,delay) {
  let timer = null
  return function (...arguments) {
    clearTimeout(timer)
    timer = setTimeout(()=> {
      fn.apply(this, arguments)
    },delay)
  }
}


function debounce1(fn,delay){
  let timer = null 
  return function(...args){
    clearTimeout(timer)
    timer = setTimeout(()=> {
      fn.apply(this,args)
    },[delay])
  }
}