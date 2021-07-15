import React from 'react';
import { Hero, addPower, addAttrs, addPowerForIns } from './utils/Decorator';

/**
 * 创建一个初始力量值为5的英雄模板（类）
 */
@addPower
class PowerHero {}
console.log('🚀PowerHero.power', PowerHero.power);

/**
 * 创建一个综合的英雄类，需要传入多个属性
 */
@addAttrs(5, 10)
class ComHero {}
console.table([
  { attribute: 'power', val: ComHero.power },
  { attribute: 'speed', val: ComHero.speed }
]);

/**
 * 创建一个速度为5的英雄
 */
@addPowerForIns
class SpeedHero {
  constructor() {}
}
/**
 * 此刻，当使用SpeedHero初始化一个实例时
 * addPowerForIns就会生效，为实例添加默认属性值
 */
const GaiYa = new SpeedHero();
console.log('🚀GaiYa的初始速度为', GaiYa.speed);

let person = {};
// 给person添加性别属性（且默认不可改变）
Object.defineProperty(person, 'sex', {
  value: 'man'
});
// console.log("🚀 ~ person.sex修改前", person.sex)
// person.sex = 'female'
// console.log("🚀 ~ person.sex修改后", person.sex)

Object.defineProperty(person, 'name', {
  value: 'jack',
  writable: true // 是否可以被改变[默认false]
});
person.name = 'jhon';
console.log('🚀 ~ person.name', person.name);
/**
 * [拓展知识]
 * Object.preventExtensions
 * 可以禁止一个对象添加新属性并且保留已有属性
 * 例如:
 * var person = { name : 'rose' }
 * Object.preventExtensions(person)
 * 操作之后，person将不再接受新属性
 */

const Demo = () => {
  return <div></div>;
};
export default Demo;

/**
 * 注意，装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。
 * 这意味着，装饰器能在编译阶段运行代码。
 * 也就是说，装饰器本质就是编译时执行的函数。
 */
