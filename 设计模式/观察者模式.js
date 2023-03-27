class Subject {
  constructor() {
    this.observers = [];
  }

  add(observe) {
    this.observers.push(observe);
  }

  remove(observe) {
    const index = this.observers.indexOf(observe);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data) {
    this.observers.forEach((observe) => {
      observe.update(data);
    });
  }
}

class Observer {
  constructor() {}
  update(data) {
    console.log(data);
  }
}

const subject = new Subject()
const observe1  = new Observer()
const observe2 = new Observer()
subject.add(observe1)
subject.add(observe2)
subject.notify('2222')
subject.remove(observe1)
subject.notify('1111')
