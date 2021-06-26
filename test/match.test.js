/**
 * toBe匹配器
 * [这个相当是等同于===的，也就是我们常说的严格相等]
 */
test('toBe匹配器-string', () => {
  expect('007').toBe('007');
});
test('toBe匹配器-object', () => {
  const a = {
    key: '007'
  };
  expect(a).toBe({
    key: '007'
  });
});
/**
 * toEqual匹配器
 * [不严格匹配但要求值相等]
 */
test('toEqual匹配器-object', () => {
  const a = {
    key: '007'
  };
  expect(a).toEqual({
    key: '007'
  });
});
/**
 * toBeNul匹配器
 * [匹配器只匹配null值，需要注意的是不匹配undefined的值]
 */
test('toBeNull测试', () => {
  const a = null;
  expect(a).toBeNull();
});
/**
 * toBeUndefined匹配器
 * [匹配器只匹配undefined值]
 */
test('toBeUndefinedl测试', () => {
  const a = undefined;
  expect(a).toBeUndefined();
});
/**
 * toBeDefined匹配器
 * [匹配器的意思是只要定义过了，都可以匹配成功]
 */
test('toBeDefined测试', () => {
  const a = 'has define';
  expect(a).toBeDefined();
});
/**
 * toBeTruthy匹配器/toBeFalsy匹配器
 * [这个是true和false匹配器，就相当于判断真假的]
 */
test('toBeTruthy测试', () => {
  const a = 'false';
  expect(a).toBeTruthy();
});
test('toBeFalsy测试', () => {
  const a = 0;
  expect(a).toBeFalsy();
});

/**
 * toBeGreaterThan匹配器
 * [这个是用来作数字比较的，大于什么数值，只要大于传入的数值，就可以通过测试]
 */
test('toBeGreaterThan匹配器', () => {
  const count = 10;
  expect(count).toBeGreaterThan(9);
});

test('toBeLessThan匹配器', () => {
  const count = 10;
  expect(count).toBeLessThan(11);
});

test('toBeGreaterThanOrEqual匹配器', () => {
  const count = 10;
  expect(count).toBeGreaterThanOrEqual(10);
});
/**
 * toEqual匹配器
 * [这个是可以自动消除JavaScript浮点精度错误的匹配器]
 */
test('toEqual匹配器', () => {
  const one = 0.1;
  const two = 0.2;
  expect(one + two).toEqual(0.3);
});

test('toBeCloseTo匹配器', () => {
  const one = 0.1;
  const two = 0.2;
  expect(one + two).toBeCloseTo(0.3);
});

/**
 * toMatch匹配器
 * [字符串匹配]
 */
test('toMatch匹配器', () => {
  const str = '谢大脚、刘英、小红';
  expect(str).toMatch('谢大脚');
});
// 支持正则匹配
test('toMatch匹配器-exp', () => {
  const str = '谢大脚、刘英、小红';
  expect(str).toMatch(/谢大脚/);
});
/**
 * toContain匹配器
 * [数组匹配器]
 */
test('toContain匹配器', () => {
  const arr = ['谢大脚', '刘英', '小红'];
  expect(arr).toContain('谢大脚');
});
// 当然他也可以完美的兼容set的测试，比如把下面代码改为下面的方式
test('toContain匹配器-set', () => {
  const arr = ['谢大脚', '刘英', '小红'];
  const data = new Set(arr);
  expect(data).toContain('谢大脚');
});

/**
 * toThrow匹配器
 * [专门对异常进行处理的匹配器，可以检测一个方法会不会抛出异常]
 */
const throwNewErrorFunc = () => {
  throw new Error('this is a new error');
};
test('toThrow匹配器', () => {
  expect(throwNewErrorFunc).toThrow();
});
// 进阶
test('toThrow匹配器-抛出异常内容必须一致', () => {
  expect(throwNewErrorFunc).toThrow('this is a new error');
});

/**
 * not匹配器
 * [not匹配器是jest中比较特殊发热匹配器，意思是“相反/取反”]
 */
test('not匹配器', () => {
  expect(9).not.toEqual(8);
});
