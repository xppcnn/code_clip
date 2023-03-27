Function.prototype.myApply = function(context, args) {
  console.log("🚀 ~ file: demo.js:2 ~ context:", context)
  // 如果没有传入上下文，则默认使用全局对象
  context = context || window;
  
  // 在上下文中添加一个新属性 fn，值为要调用的函数本身
  context.fn = this;
  console.log("🚀 ~ file: demo.js:7 ~ this:", this)
  
  // 使用 apply() 方法执行该函数，并传入参数数组
  const result = context.fn(...args);
  
  // 删除上下文中的 fn 属性，避免污染原始对象
  delete context.fn;
  
  // 返回函数的执行结果
  return result;
}

function a (){
  console.log(arguments)
}

const person = { name: 'John' };
a.myApply(person,[1,2,3,])