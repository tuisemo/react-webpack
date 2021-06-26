import axios from 'axios';

export function request(fn) {
  axios.get('http://a.jspang.com/jestTest.json').then(res => {
    fn(res.data);
  });
}
export function getDateByPromise() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
}
