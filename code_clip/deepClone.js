function deepClone(target, map = newMap()) {
  if (target !== null && typeof target === "object") {
    const result = target.isArray() ? [] : {};
    if(map.has(target)){
      return map.get(target)
    }
    map.set(target,result)
    for (let k in target) {
      if (target.hasOwnProperty(k)) {
        target[k] = deepClone(target[k],map);
      }
    }
    return result;
  }
  return target;
}
