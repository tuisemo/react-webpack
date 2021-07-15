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
}
/**
 * 力量提升装饰器
 * @param {*} target
 */
export function addPower(target) {
  target.power = 5;
}
/**
 * 速度提升装饰器
 * 为实例添加属性，而不是为类添加属性
 * @param {*} target
 */
export function addPowerForIns(target) {
  target.prototype.speed = 5;
}
/**
 * 综合属性装饰器
 * [当我们想要传入多个参数时]
 * @param {*} target
 */
export function addAttrs(power, speed) {
  return function(target) {
    target.power = power;
    target.speed = speed;
  };
}

/**
 * Object.defineProperty(obj, prop, descriptor)
 * @param {*} obj
 * @param {*} prop
 * @param {*} descriptor
 */

/**
 * [属性装饰器]
 *
 */
export function attrsDecorator(target, key, descriptor) {}
