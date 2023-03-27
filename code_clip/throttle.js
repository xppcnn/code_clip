function throttle(fn, delay) {
  let flag = false;
  let timer = null;
  return function (...args) {
    if (flag) {
      return;
    }
    flag = true;
    timer = setTimeout(() => {
      fn.apply(this, args);
      flag = false;
      clearTimeout(timer);
    }, delay);
  };
}

function throttle1(fn, delay) {
  let lastTime = 0;
  return function (...args) {
    let nowTime = Date.now();
    if (nowTime - lastTime >= delay) {
      fn.apply(this,args);
      lastTime = nowTime;
    }
  };
}

throttle1(()=>console.log(111),2000)()
throttle1(()=>console.log(111),2000)()
throttle1(()=>console.log(111),2000)()
throttle1(()=>console.log(111),2000)()
throttle1(()=>console.log(111),2000)()