/**
 * mock一个异步请求函数
 * @returns
 */
export function mockPromise() {
  return Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1000);
    }, 2000);
  });
}
