import { mockPromise } from './mockFn';
export function normalFn(id) {
  return id === '慎独' ? '大佬' : '菜鸡';
}

/**
 * 定义一个函数，使用回调函数遍历执行数组中的每一项
 * @param {*} items
 * @param {*} callback
 */
export function forEachCall(items, callback) {
  for (let i = 0; i < items.length; i++) {
    callback(items[i]);
  }
}

/**
 * 依赖外部请求的函数
 * @returns
 */
export function getNewDataByReq() {
  return mockPromise().then(res => {
    const newData = 100 + res;
    return newData;
  });
}

/**
 * 一个与定时器有关的函数
 */
export function timerGame(callback) {
  console.log('ready----go!');
  setTimeout(() => {
    console.log('time’s up-----stop!');
    callback && callback();
  }, 2000);
}
