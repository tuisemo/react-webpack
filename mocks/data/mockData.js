var Mock = require('mockjs');

module.exports = {
  employeeDetails: Mock.mock({
    id: '@id',
    name: '@cname',
    age: '@integer(18, 60)',
    gender: '@integer(0, 1)',
    mobile: /^1([345789])\d{9}$/,
    address: '@county(true)',
    des: '@csentence(5, 19)',
    remarks: '@csentence(5, 19)'
  })
};
