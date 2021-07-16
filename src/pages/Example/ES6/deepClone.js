/**
 * [浅拷贝]
 * 创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。
 * 如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，
 * 拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。
 */

/**
 * [深拷贝]
 * 将一个对象从内存中完整的拷贝一份出来,
 * 从堆内存中开辟一个新的区域存放新对象,
 * 且修改新对象不会影响原对象
 */

/**
 * 乞丐版深拷贝
 */
JSON.parse(JSON.stringify());

/**
 * 基础款浅拷贝
 * [只能拷贝一层结构]
 */
function clone(target) {
  let cloneTarget = {};
  for (const key in target) {
    cloneTarget[key] = target[key];
  }
  return cloneTarget;
}

/**
 * 基础款深拷贝
 * [利用递归实现逐层结构拷贝]
 */
function clone(target) {
  if (typeof target === 'object') {
    let cloneTarget = {};
    for (const key in target) {
      cloneTarget[key] = clone(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
}

/**
 * 代码来源引用
 * https://juejin.cn/post/6844903929705136141
 */
