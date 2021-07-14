import React from 'react';
import { Hero, addPower, addATK, addSpeed } from './utils/Decorator';

@addPower
class PowerHero {
  constructor() {
    console.log('🚀 ~ file: Decorator_demo.js ~ line 6 ~ PowerHero', this);

    this.power = 0;
    this.speed = 0;
  }
}
// PowerHero.power
console.log(
  '🚀 ~ file: Decorator_demo.js ~ line 8 ~ PowerHero.power',
  PowerHero.power
);
const Demo = () => {
  return <div></div>;
};
export default Demo;

/**
 * 注意，装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。
 * 这意味着，装饰器能在编译阶段运行代码。
 * 也就是说，装饰器本质就是编译时执行的函数。
 */
