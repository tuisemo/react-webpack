/**
 * reduce语法介绍
 * 参数：
 * callback:回调函数（必选）
 * initValue:初始值（可选）
 */
array.reduce((total, value, index, array) => {}, initValue);
/**
 * 回调函数的参数
 * total：累计器完成计算的返回值(必选)
 * value：当前元素(必选)
 * index：当前元素的索引(可选)
 * array：当前元素所属的数组对象(可选)
 */

/**
 * ===========
 * reduce的使用
 * ===========
 */

// [累加累乘]
function Accumulation(...vals) {
  return vals.reduce((t, v) => t + v, 0);
}

function Multiplication(...vals) {
  return vals.reduce((t, v) => t * v, 1);
}

// [代替reserve]
function Reverse(arr = []) {
  return arr.reduceRight((t, v) => {
    t.push(v);
    return t;
  }, []);
}

// 数组偏平化
function Flat(arr = []) {
  return arr.reduce((t, v) => t.concat(Array.isArray(v) ? Flat(v) : v), []);
}
const arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
Flat(arr); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

// 数组去重
function Uniq(arr = []) {
  return arr.reduce((t, v) => (t.includes(v) ? t : [...t, v]), []);
}

// 数组最大值/最小值
function Max(arr = []) {
  return arr.reduce((t, v) => (t > v ? t : v));
}

function Min(arr = []) {
  return arr.reduce((t, v) => (t < v ? t : v));
}

// 数组成员位置记录[需求：返回数组中等于3的值的序号]
function Position(arr = [], val) {
  return arr.reduce((t, v, i) => (v === val && t.push(i), t), []);
}
const arr = [2, 1, 5, 4, 2, 1, 6, 6, 7];
Position(arr, 2); // [0, 4]

/**
 * 字符串翻转
 * @function reduceRight
 * reduceRight与reduce功能一致，不同的是 reduceRight() 从数组的末尾向前将数组中的数组项做累加。
 */
function ReverseStr(str = '') {
  return str.split('').reduceRight((t, v) => t + v);
}
const str = 'reduce最牛逼';
ReverseStr(str); // "逼牛最ecuder"
