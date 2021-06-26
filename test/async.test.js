import { getDateByPromise } from '../src/api/jestApi';

test('异步数据', () => {
  return getDateByPromise().then(res => {
    expect(res).toBe(1);
  });
});
/**
 * async..await语法测试
 */
test('异步数据-async&await', async () => {
  const res = await getDateByPromise();
  expect(res).toBe(1);
});
