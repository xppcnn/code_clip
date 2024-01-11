/**
 * 列表转成树形结构
 */
let arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
  { id: 6, name: "部门6", pid: 0 },
];
function arr2tree(list, result = []) {
  list.forEach((ele) => {
    const parent = result.find((e) => e.id === ele.pid);
    if (parent) {
      if (!parent.children) {
        parent.children = [ele];
      } else {
        parent.children.push(ele);
      }
      return;
    }
    result.push(ele);
  });
  return result;
}

const a = arr2tree(arr);
console.log("🚀 ~ file: question5.js:25 ~ a:", a);
