/**
 * 树形结构转成列表
 */

const data = [
  {
    id: "1",
    name: "父节点1",
    children: [
      {
        id: "1-1",
        name: "子节点1-1",
        children: [
          {
            id: "1-1-1",
            name: "子节点1-1-1",
          },
          {
            id: "1-1-2",
            name: "子节点1-1-2",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "父节点2",
    children: [
      {
        id: "2-1",
        name: "子节点2-1",
      },
    ],
  },
];

function tree2list(trees, result = []) {
  trees.forEach((tree) => {
    result.push(tree);
    if (tree.children&&tree.children.length > 0) {
      tree2list(tree.children, result);
    }
  });
  return result
}

const a = tree2list(data)
console.log("🚀 ~ file: question4.js:49 ~  a:",  a)
