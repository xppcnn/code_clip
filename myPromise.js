const STATUS = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};
class MyPromise {
  status = STATUS.PENDING;
  data = undefined;
  onResolveCallBacks = [];
  onRejectCallBacks = [];
  resolveBindFn = this.resolve.bind(this);
  rejectBindFn = this.reject.bind(this);
  constructor(executor) {
    try {
      executor(this.resolveBindFn, this.rejectBindFn);
    } catch (error) {
      this.rejectBindFn(error);
    }
  }

  resolve(value) {
    if (this.status === STATUS.PENDING) {
      queueMicrotask(() => {
        if (this.status !== STATUS.PENDING) return; // 如果同时掉resolve和reject，则不会执行
        this.status = STATUS.FULFILLED;
        this.data = value;
        this.onResolveCallBacks.forEach((cb) => {
          cb(value);
        });
      });
    }
  }

  reject(reason) {
    if (this.status === STATUS.PENDING) {
      queueMicrotask(() => {
        if (this.status !== STATUS.PENDING) return;
        this.status = STATUS.REJECTED;
        this.data = reason;
        this.onRejectCallBacks.forEach((cb) => cb(reason));
      });
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === STATUS.FULFILLED) {
      onFulfilled(this.data);
    }
    if (this.status === STATUS.REJECTED) {
      onRejected(this.data);
    }
    if (this.status === STATUS.PENDING) {
      this.onResolveCallBacks.push(onFulfilled);
      this.onRejectCallBacks.push(onRejected);
    }
  }
}

const promise = new MyPromise((resolve, reject) => {
  console.log("myPromise");
  reject("yyyy");
  resolve("wwww");
});

setTimeout(() => {
  promise.then(
    (data) => {
      console.log("data:", data);
    },
    (err) => {
      console.log("err", err);
    }
  );
}, 2000);
