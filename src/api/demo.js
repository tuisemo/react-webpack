import request from 'utils/request';

export function getProducts(data) {
  return request({
    url: '/mock/products/list',
    method: 'get',
    params: data
  });
}
export function getEmployees(data) {
  return request({
    url: '/mock/employee/list',
    method: 'get',
    params: data
  });
}
export function getTodosList(data) {
  return request({
    url: '/mock/todos/list',
    method: 'get',
    params: data
  });
}
export function getEmployeeDetails(data) {
  return request({
    url: '/api/employee/details',
    method: 'get',
    params: data
  });
}
export function getTreeList(data) {
  return request({
    url: '/mock/tree/list',
    method: 'get',
    params: data
  });
}
