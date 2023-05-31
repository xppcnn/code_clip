var arr = [1, [2, [3, 4]]];

function flatten(arr){
  var result = []
  for (var i = 0; i < arr.length; i++){
    if(Array.isArray(arr[i])){
      result = result.concat(flatten(arr[i]))
    }else{
      result.push(arr[i])
    }
  }
  return result
}

function flatten1(arr){
  return arr.reduce((pre,cur)=>{
    return pre.concat(Array.isArray(cur) ? flatten1(cur): cur)
  },[])
}

console.log("🚀 ~ file: flatten.js:16 ~ flatten(arr):", flatten(arr))
