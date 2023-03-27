function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

const obj = {
  name: "justin",
  friends: [1, 2, 3, 4],
};

const obj1 = createObj(obj)
const obj2 = createObj(obj)
