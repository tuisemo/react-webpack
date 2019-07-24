import request from 'utils/request';

export function checkAuth(data) {
  return request({
    url: '/api/auth/check',
    method: 'get'
  });
}
export function loginRequest(data) {
  return request({
    url: '/api/post/login',
    method: 'post',
    data
  });
}
export function logoutRequest(data) {
  return request({
    url: '/api/get/logout',
    method: 'get'
  });
}
