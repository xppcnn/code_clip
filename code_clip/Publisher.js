class Publisher {
  constructor() {
    this.observers = [];
    console.log("Publisher created");
  }

  add(observer) {
    console.log("Publisher.add invoked");
    this.observers.push(observer);
  }

  remove(observer) {
    this.observers.forEach((item, index) => {
      if (item === observer) {
        this.observers.splice(index, 1);
      }
    });
  }

  notify() {
    this.observers.forEach((item) => {
      observer.update(this);
    });
  }
}

class Observer {
  constructor() {
    console.log("Observer created");
  }

  update() {
    console.log("Observer.update invoked");
  }
}

class PrdPublisher extends Publisher {
  constructor(){
    super()
    this.prdState = null
    this.observers = []
  }

  getState() {
    return this.prdState
  }

  setState(state){
    this.prdState = state;
    this.notify()
  }
}

class DeveloperObserver extends Observer {
  constructor(){
    super()
    this.prdState = {}
  }

  update(publisher){
    this.prdState = publisher.getState()
    this.work()
  }

  work(){
    const prd = this.prdState
    console.log('996 ......')
  }
}

const liLei = new DeveloperObserver()
const A = new DeveloperObserver()
const hanMeiMei = new PrdPublisher()
const prd = {}
hanMeiMei.add(liLei)
hanMeiMei.add(A)
hanMeiMei.setState(prd)