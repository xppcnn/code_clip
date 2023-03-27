let name = 'xwl'
// module.exports =  function sayName(){
//   console.log(name)
//   return name
// }


module.exports = {
  say: function(){
    return name
  },
  change: function(){
    name =  1111
    return name
  }
}
