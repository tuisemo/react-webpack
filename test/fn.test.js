const { normalFn } = require('../src/utils/fn');

test('测试id-小赖', () => {
  expect(normalFn('小赖')).toBe('菜鸡');
});
test('测试id-慎独', () => {
  expect(normalFn('慎独')).toBe('大佬');
});
