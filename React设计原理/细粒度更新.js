const effectStack = [];

function useState(value) {
  // 保存订阅该state变化的effect
  const subs = new Set();
  const getter = () => {
    const effect = effectStack[effectStack.length - 1];
    if (effect) {
      subscribe(effect, subs);
    }
    return value;
  };
  const setter = (newValue) => {
    value = newValue;
    // 通知所有订阅该state变化的effect执行
    for (const effect of [...subs]) {
      effect.execute();
    }
  };
  return [getter, setter];
}

function useEffect(callback) {
  const execute = () => {
    clearUp(effect);
    effectStack.push(effect);
    try {
      callback();
    } finally {
      effectStack.pop();
    }
  };

  const effect = {
    execute,
    deps: new Set(),
  };
  execute();
}

function useMemo(callback) {
  const [s, set] = useState();
  useEffect(() => set(callback));
  return s;
}
function clearUp(effect) {
  for (const subs of effect.deps) {
    subs.delete(effect);
  }
  effect.deps.clear();
}

function subscribe(effect, subs) {
  subs.add(effect);
  effect.deps.add(subs);
}

const [name1, setName1] = useState("xwl");
name1()
useEffect(() => {
  console.log("谁在那儿！", name1());
});

setName1('sqn')