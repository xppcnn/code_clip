/**
 * 设计一个简单的任务队列, 要求分别在 1,3,4 秒后打印出 "1", "2", "3"
 */
class Queue {
  constructor() {
    this.queue = [];
  }

  add(fn,time,...args){
    const task = () => new Promise((resolve) => {
      setTimeout(() => {
        fn.apply(args)
        resolve()
      },time)
    })
    this.queue.push(task)
    return this
  }
  async start(){
    const queue = this.queue
    for(let i = 0; i < queue.length; i++){
      await queue[i]()
    }
  }
}

const queue = new Queue()
queue.add(() => console.log('1'),1000).add(() => console.log('2'),2000).add(() => console.log('3'),1000)
queue.start()
