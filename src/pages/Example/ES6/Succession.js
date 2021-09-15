/**
 * ==========================
 * 			手写继承
 * ==========================
 */

/**
 * 原型连继承
 * [核心： 将父类的实例作为子类的原型]
 */
function example_1() {
  function Animal() {
    this.color = ['black', 'white'];
  }
  Animal.prototype.getColor = function() {
    return this.color;
  };

  function Dog() {}
  // 产生继承关系
  Dog.prototype = new Animal();
  let dog1 = new Dog();
  dog1.colors.push('brown');
  let dog2 = new Dog();
  console.log(dog2.colors); // ['black', 'white', 'brown']
}

/**
 * 借用构造函数实现继承
 * [核心：使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类]
 */
function example_2() {
  function Animal(name) {
    this.name = name;
    this.getName = function() {
      return this.name;
    };
  }
  function Dog(name) {
    // 产生继承关系
    Animal.call(this, name);
  }
  // 使得Dog创建的实例的原型能关联到Animal
  Dog.prototype = new Animal();
}

/**
 * 组合继承
 */
function Animal(name) {
  this.name = name;
  this.colors = ['black', 'white'];
}
Animal.prototype.getName = function() {
  return this.name;
};

function Dog(name, age) {
  Animal.call(this, name);
  this.age = age;
}
Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

let dog1 = new Dog('奶昔', 2);
dog1.colors.push('brown');
let dog2 = new Dog('哈赤', 1);
console.log(dog2);
// { name: "哈赤", colors: ["black", "white"], age: 1 }
