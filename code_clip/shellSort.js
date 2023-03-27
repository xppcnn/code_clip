function shellSort(arr){
  for(let step = arr.length / 2 ; step >0 ; step / 2){
    for(let i = step ; i < arr.length; i ++){
      let j = i;
      let tmp = arr[i]
      while(j -step >= 0 && tmp < arr[j-step]){
        arr[j] = arr[j-step]
        j = j -step
      }
      arr[j] = tmp
    }
  }
}