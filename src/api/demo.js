import request from "utils/request";

export function getProducts(data) {
  return request({
    url: "/mock/products/list",
    method: "get",
    params: data
  });
}
export function getEmployees(data) {
  return request({
    url: "/mock/employee/list",
    method: "get",
    params: data
  });
}
