/**
 * 创建一个“英雄”类
 */
export class Hero {
  constructor(name) {
    this.name = name;
    this.power = 0; // 力量默认为0
    this.speed = 0; // 速度默认为0
    this.atk = 0; // 攻击力默认为0
  }
  addPower = num => {
    this.power = this.power + num;
  };
  addSpeed = num => {
    this.speed = this.speed + num;
  };
  addATK = num => {
    this.atk = this.atk + num;
  };
}
/**
 * 力量提升装饰器
 * @param {*} target
 */
export function addPower(target) {
  console.log('🚀 ~ file: Decorator.js ~ line 17 ~ addPower ~ target', target);
  target.power = 5;
}
/**
 * 速度提升装饰器
 * @param {*} target
 */
export function addSpeed(target) {
  target.speed = 5;
}
/**
 * 攻击力提升装饰器
 * @param {*} target
 */
export function addATK(target) {
  target.atk = 5;
}
