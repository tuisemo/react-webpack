import { forEachCall, getNewDataByReq } from '../src/utils/fn';
jest.mock('../src/utils/mockFn');
import { mockPromise } from '../src/utils/mockFn';

test('mock函数——具象函数', () => {
  // mock一个具象函数
  const mockCallback = jest.fn(x => 100 + x);
  // 执行目标函数测试
  forEachCall([0, 1], mockCallback);
  /**
   * 断言期盼
   */
  // mock函数被调用执行次数
  expect(mockCallback.mock.calls.length).toBe(2);
  // console.log(mockCallback.mock.calls)

  // mock函数被调用执行结果
  expect(mockCallback.mock.results[0].value).toBe(100);
});

test('mock函数——模拟函数 ', () => {
  // 创建模拟函数
  const myMock = jest.fn();
  // 给模拟函数预设返回值
  myMock
    .mockReturnValueOnce(10) // 一次性有效
    .mockReturnValueOnce('the second value') // 一次性有效
    .mockReturnValueOnce(true) // 一次性有效
    .mockReturnValue('CONSTANS'); // 持久有效
  console.log(myMock()); // ===> 10
  console.log(myMock()); // ===> 'the second value'
  console.log(myMock()); // ===> true
  console.log(myMock()); // ===> 'CONSTANS'
  console.log(myMock()); // ===> 'CONSTANS'
});

test.only('mock一个目标测试函数里涉及的引用函数 ', () => {
  // mock一个外部依赖（在实际测试中，mock后的函数不会真的执行）
  // jest.mock('../src/utils/mockFn'); // 这句语句在实际使用中，需要提升至import语句的前面
  mockPromise.mockImplementation(
    () =>
      new Promise(resolve => {
        resolve(200);
      })
  );
  return getNewDataByReq().then(res => {
    expect(res).toBe(1300);
  });
});

/**
 * 一个进阶的mock方法：jest.spyOn()
 * 不同于jest.mock();被jest.spyOn()的函数会真的执行
 */
