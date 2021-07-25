/**
 * Proxy 可以理解成，在目标对象之前架设一层“拦截”，
 * 外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，
 * 可以对外界的访问进行过滤和改写。
 */
var obj = new Proxy(
  {},
  {
    get: function(target, propKey, receiver) {
      console.log(`getting ${propKey}!`);
      return Reflect.get(target, propKey, receiver);
    },
    set: function(target, propKey, value, receiver) {
      console.log(`setting ${propKey}!`);
      return Reflect.set(target, propKey, value, receiver);
    }
  }
);

/**
 * 也支持使用构造器来生成Proxy实例
 * new Proxy(target,handler)
 */
var proxy = new Proxy(
  {},
  {
    get: function(target, propKey) {
      return false;
    }
  }
);
proxy.time; // false
proxy.name; // false
proxy.ttitle; // false

// 如果handler没有设置任何拦截，那就等同于直接通向原对象。
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b'; // 这里等价于target.a='b'
target.a; // "b"

/**
 * Proxy实例支持的常见api
 */
new Proxy(
  {},
  {
    get: function(target, propKey, receiver) {
      // target=>目标对象
      // propKey=>属性名
      // receiver=>Proxy实例本身
    },
    set: function(target, propKey, value, reveiver) {
      // target=>目标对象
      // propKey=>属性名
      // value=>属性值
      // receiver=>Proxy实例本身
    },
    apply: function(target, ctx, args) {
      // target=>目标对象
      // ctx=>目标对象的上下文对象
      // args=>目标对象的参数数组
    }
  }
);
