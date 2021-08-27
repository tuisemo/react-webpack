class MyPromise {
  constructor(executor) {
    // 初始化值
    this.initValue();
    // 初始化this指向
    this.initBind();
    try {
      // 执行传入的函数
      executor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }
  initValue() {
    this.status = 'pending';
    this.data = undefined;
    this.onFulfilledCallbacks = []; // 保存成功回调
    this.onRejectedCallbacks = []; // 保存失败回调
  }
  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }
  resolve(value) {
    //   状态不可变
    if (this.status !== 'pending') return;
    this.status = 'fulfilled';
    this.data = value;
    while (this.onFulfilledCallbacks.length) {
      // 逐一执行回调队列
      this.onFulfilledCallbacks.shift()(this.data);
    }
  }
  reject(reason) {
    //   状态不可变
    if (this.status !== 'pending') return;
    this.status = 'reject';
    this.data = reason;

    while (this.onRejectedCallbacks.length) {
      // 逐一执行回调队列
      this.onRejectedCallbacks.shift()(this.data);
    }
  }
  then(onFulfilled, onRejected) {
    // 接收两个回调 onFulfilled, onRejected

    // 参数校验，确保一定是函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : reason => {
            throw reason;
          };

    if (this.PromiseState === 'fulfilled') {
      // 如果当前为成功状态，执行第一个回调
      onFulfilled(this.data);
    } else if (this.status === 'rejected') {
      // 如果当前为失败状态，执行第二个回调
      onRejected(this.data);
    } else if (this.status == 'pending') {
      // 如果状态位待定状态，暂时保存两个回调
      this.onFulfilledCallbacks.push(onFulfilled.bind(this));
      this.onRejectedCallbacks.push(onRejected.bind(this));
    }
  }
}
