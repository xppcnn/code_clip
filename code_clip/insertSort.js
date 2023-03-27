function insert_sort(arr) {
  const len = arr.length - 1;
  for (let i = 0; i < len; i++) {
    for (let j = i+1; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        const tmp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = tmp;
      } else {
        break;
      }
    }
  }
  console.log(arr)
  return arr
}
function insertSort(arr){
  const len = arr.length - 1;
  for (let i = 1; i < len; i++) {
    const tmp = arr[i]
    let j = i;
    while(j >= 0 && tmp < arr[j-1]){
      arr[j] = arr[j-1]
      j--
    }
    arr[j] = tmp
  }
  console.log(arr)
  return arr
}
var arr = [3,5,7,1,4,56,12,78,25,0,9,8,42,37];
insertSort(arr)