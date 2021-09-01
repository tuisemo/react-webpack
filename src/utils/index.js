/**
 * 防抖函数
 * @param {*} fn
 * @param {*} wait
 * @returns
 */
export function debounce(fn, wait) {
  let timer = null;
  return function() {
    const self = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(self, args);
    }, wait);
  };
}

/**
 * 节流函数
 * @param {*} fn
 * @param {*} wait
 * @returns
 */
export function throttle(fn, wait) {
  let timer = null;
  return function() {
    const self = this;
    const args = arguments;
    if (time) return;
    timer = setTimeout(() => {
      fn.apply(self, args);
      clearTimeout(timer);
    }, wait);
  };
}
