/**
 * 实现有并行限制的 Promise 调度器
 */

class Scheduler {
  constructor(limit) {
    this.limit = limit;
    this.count = 0;
    this.queue = [];
  }
  async add(fn){
    if(this.count >= this.limit){
      await new Promise(resolve => this.queue.push(resolve))
    }
    this.count++
    const res = await fn()
    this.count--
    this.queue.length&&this.queue.shift()()
  }
}

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

// 同时进行的任务最多2个
const scheduler = new Scheduler(2);

// 添加异步任务
// time: 任务执行的时间
// val: 参数
const addTask = (time, val) => {
  scheduler.add(() => {
    return sleep(time).then(() => console.log(val));
  });
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');