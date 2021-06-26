import { request } from '../src/api/jestApi';

test('测试请求-异步', done => {
  request(data => {
    expect(data).toEqual({
      success: true
    });
    done();
  });
});
