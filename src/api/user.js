import request from 'utils/request';

export function checkAuth(data) {
  return request({
    url: '/api/auth/check',
    method: 'get'
  });
}
