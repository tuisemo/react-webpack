import { timerGame } from '../src/utils/fn';

describe('测试一个与定时器有关的函数', () => {
  jest.useFakeTimers();
  test('waits 1 second before ending the game', () => {
    timerGame();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
  });
});

/**
 * 由于jest.useFakeTimers()/jest.useRealTimers()是一个全局行为
 * 所以会影响到同一文件下的其他测试用例
 * 你需要在每次测试后重置该定时器
 */
describe('注意事项', () => {
  afterEach(() => {
    // 重置定时器
    jest.useRealTimers();
  });
  jest.useFakeTimers();
  test('waits 1 second before ending the game', () => {
    timerGame();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
  });
});

/**
 * 有时候我们不必等定时器时间到再执行后续的断言判断
 * 于是我们可以使用jest.runAllTimers()
 * 快速实现定时器执行后的断言
 */
describe('Run All Timers', () => {
  test('calls the callback after 1 second', () => {
    const callback = jest.fn();

    timerGame(callback);

    // At this point in time, the callback should not have been called yet
    expect(callback).not.toBeCalled();

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // Now our callback should have been called!
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
