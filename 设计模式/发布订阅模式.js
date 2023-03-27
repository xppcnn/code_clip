class EventEmitter {
  constructor() {
    this.events = {};
  }

  // 订阅事件
  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }
  // 发布事件
  emit(eventName, data) {
    const listeners = this.events[eventName];
    if (listeners.length > 0) {
      for (let listener of listeners) {
        listener(data);
      }
    }
  }

  off(eventName,listener){
    const listeners = this.events[eventName]
    if(listeners.length > 0) {
      const index = listeners.indexOf(listener)
      if(index > -1){
        listeners.splice(index,1)
      }
    }
  }
}

const emitter = new EventEmitter()


const listener1 = data => {
  console.log("🚀 ~ file: 发布订阅模式.js:37 ~ listener1 ~ data:", data)
}
const listener2 = data => {
  console.log("🚀 ~ file: 发布订阅模式.js:37 ~ listener2 ~ data:", data)
}
emitter.on('message',listener1)
emitter.on('message',listener2)
emitter.emit('message','wos xsdjfh')
emitter.off('message',listener1)
emitter.emit('message','dierci')