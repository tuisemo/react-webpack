// 定义三种状态
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECT = 'REJECT';

class MyPromise {
  constructor(fn) {
    // 初始化状态
    this.status = PENDING;
    // 将成功、失败的结果放在this上，便于then、catch访问
    this.value = null;
    this.reason = null;

    // 成功态、失败态回调函数队列，同步调用then时将对应态的函数注册进去, 在状态变更的时候调用
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 成功态回调函数依次执行
        this.onFulfilledCallbacks.forEach(fn => fn(this.value));
      }
    };
    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECT;
        this.reason = reason;
        // 失败态回调函数依次执行
        this.onRejectedCallbacks.forEach(fn => fn(this.reason));
      }
    };
    // 生成实例后立即调用fn
    // 把内部的resolve和reject传入fn，用户可调用resolve和reject
    try {
      fn(resolve, reject);
    } catch (err) {
      // fn执行出错，将错误内容用reject抛出去
      reject(err);
    }
  }
  then(onFulfilled, onReject) {
    // 实现值穿透 当then中传入的不是函数，则这个promise返回上一个promise的值
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onReject =
      typeof onReject === 'function'
        ? onReject
        : reason => {
            throw new Error(reason);
          };

    // 保存前一个promise的this
    const self = this;
    return new MyPromise((resolve, reject) => {
      // 封装前一个promise成功时执行的函数
      let fulfilled = () => {
        try {
          const result = onFulfilled(self.value); // 承前
          return result instanceof MyPromise
            ? result.then(resolve, reject)
            : resolve(result); //启后
        } catch (err) {
          reject(err);
        }
      };
      // 封装前一个promise失败时执行的函数
      let rejected = () => {
        try {
          const result = onReject(self.reason);
          return result instanceof MyPromise
            ? result.then(resolve, reject)
            : reject(result);
        } catch (err) {
          reject(err);
        }
      };

      switch (self.status) {
        case PENDING:
          self.onFulfilledCallbacks.push(fulfilled);
          self.onRejectedCallbacks.push(rejected);
          break;
        case FULFILLED:
          fulfilled();
          break;
        case REJECT:
          rejected();
          break;
      }
    });
  }

  // Promise.prototype.catch就是Promise.prototype.then(null, onRejected)的别名
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    // 如果是promise实例，直接返回
    if (value instanceof MyPromise) {
      return value;
    } else {
      // 如果不是promise实例，返回一个新的promise对象，状态为fulfilled
      return new MyPromise((resolve, reject) => resolve(value));
    }
  }
  static reject(reason) {
    // Promise.reject方法的参数会原封不动地作为reject的参数
    return new MyPromise((resolve, reject) => reject(reason));
  }

  /**
   * Promise.all() 接受一个数组，返回一个promise对象
   *    所有的promise状态变为FULFILLED，返回的promise状态才变为FULFILLED。
   *     一个promise状态变为REJECTED，返回的promise状态就变为REJECTED。
   *    数组成员不一定都是promise，需要使用Promise.resolve()处理。
   */
  static all(promiseArr) {
    const len = promiseArr.length;
    const values = new Array(len);

    let count = 0; // 记录已经成功的promise个数
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < len; i++) {
        // Promise.resolve()处理，确保每一个都是promise实例
        MyPromise.resolve(promiseArr[i]).then(
          val => {
            values[i] = val;
            count++;
            if (count === len) resolve(values); // 如果全部执行完，改变promise的状态为FulFilled
          },
          err => {
            reject(err);
          }
        );
      }
    });
  }
  static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach(item => {
        MyPromise.resolve(item).then(
          val => resolve(val),
          err => reject(err)
        );
      });
    });
  }
}

/**
 * 代码来源:
 * https://juejin.cn/post/6883121706123132936
 */
