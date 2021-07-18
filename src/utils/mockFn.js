/**
 * mock一个异步请求函数
 * @returns
 */
export function mockPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('----函数被执行-----');
      resolve(1000);
    }, 2000);
  });
}
