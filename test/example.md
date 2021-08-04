## 文件模块

可以模拟已导入模块或者模拟一个假模块，只在当前文件有效

### `jest.mock(module|modulePath, [factory], [options])` 模拟模块

### `jest.unmock(module|modulePath)` 解除模拟

- `module` / `modulePath` 模块名(依赖包)或路径
- `factory`工厂函数，返回模拟的导出对象
  缺省时，jest 会自动模拟（导出内容原模块相同，但函数都是空 mock 函数）
  如果导出含 default，导出对象必须有 `__esModule: true`

- `options` 配置
  如果模块实际不存在，则需要配置 `virtual: true`

注意：mock 需要放在 import 语句的后面，而不是放在单测中

```js
import print from '../src/main.js';
// 模拟main.js模块，默认导出一个函数
jest.mock('../src/main.js', () => {
  return {
    __esModule: true,
    default: () => 555
  };
});

test.only('print', () => {
  console.log(print(2222));
});

// 555
```

## node_modules 模块

1. 在`node_modules`同级新建文件夹`__mocks__`
2. 编写对应`xx`模块的文件

比如`@system.storage`

```js
import {
  expect,
  describe,
  test,
  beforeAll,
  afterAll,
  jest
} from '@jest/globals';
const storage: any = {};

let isSuucess = true;
const toggleState = (state: boolean) => {
  isSuucess = state;
};

const mockSet = jest.fn(({ success, fail }) => {
  isSuucess ? success() : fail();
});
const mockGet = jest.fn(({ success, fail }) => {
  isSuucess ? success() : fail();
});
const mockDelete = jest.fn(({ success, fail }) => {
  isSuucess ? success() : fail();
});

storage.set = mockSet;
storage.get = mockGet;
storage.delete = mockDelete;

export default storage;
export { toggleState };
```
