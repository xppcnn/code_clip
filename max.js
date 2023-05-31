var arr = [6, 4, 1, 8, 2, 11, 23];

var result = arr[0];
for (var i = 1; i < arr.length; i++) {
  result = Math.max(result, arr[i]);
}
console.log(result);

const a = arr.reduce((pre, cur) => {
  return Math.max(pre, cur);
});
console.log(a);