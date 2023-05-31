var class2Type = {};

var toString = class2Type.toString;
var hasOwn = class2Type.hasOwnProperty;

function isPlainObject(obj) {
  var proto, Ctor;
  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }
  proto = Object.getPrototypeOf(obj);
  if (!proto) {
    return true;
  }
  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  return (
    typeof Ctor === "function" &&
    hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object)
  );
}

function extend() {
  var deep = false;
  var name, options, src, copy, clone, copyIsArray;
  var length = arguments.length;
  var i = 1;
  var target = arguments[0] || {};
  if (typeof target === "boolean") {
    deep = target;
    target = arguments[i] || {};
    i++;
  }
  if (typeof target !== "object" && typeof target !== "function") {
    target = {};
  }
  for (; i < length; i++) {
    options = arguments[i];
    if (options != null) {
      for (name in options) {
        src = target[name];
        copy = options[name];
        // 循环引用
        if (target === copy) {
          continue;
        }

        if (
          (deep && copy && isPlainObject(copy)) ||
          (copyIsArray = Array.isArray(copy))
        ) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && isPlainObject(src) ? src : {};
          }
          target[name] = extend(deep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
}

var obj1 = {
  value: {
    3: 1,
  },
};

var obj2 = {
  value: [5, 6, 7],
};

var b = extend(true, obj1, obj2); // ???

var c = extend(true, obj2, obj1); // ???
console.log("🚀 ~ file: extend.js:79 ~ b:", b, c);
