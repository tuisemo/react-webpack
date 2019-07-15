var Mock = require('mockjs');

Mock.setup({
  timeout: 800 // 设置延迟响应，模拟向后端请求数据
});

Mock.mock('/mock/employee/list', 'get', {
  'data|6-20': [
    {
      id: '@id',
      name: '@cname',
      age: '@integer(18, 60)',
      gender: '@integer(0, 1)',
      mobile: /^1([345789])\d{9}$/,
      address: '@county(true)',
      des: '@csentence(5, 19)'
    }
  ]
});

Mock.mock('/mock/todos/list', 'get', {
  'data|6-12': [
    {
      id: '@id',
      title: '@ctitle(8, 16)',
      dealLine: '@date',
      address: '@city(true)',
      remarks: '@csentence(5, 19)'
    }
  ]
});

Mock.mock('/mock/products/list', 'get', {
  'data|6-20': [
    {
      id: '@id',
      pic: `https://picsum.photos/200/140?random=@integer`,
      'num|0-50': 0,
      name: '@cname',
      des: '@csentence(5, 19)',
      'price|0-50': 6
    }
  ]
});

Mock.mock('/mock/tree/list', 'get', {
  'data|0-20': [
    {
      id: '@id',
      name: '@id',
      value: '@id'
      // 'children|0-9': [
      //   {
      //     id: '@id',
      //     name: '@id',
      //     value: '@id',
      //     children: []
      //   }
      // ]
    }
  ]
});
