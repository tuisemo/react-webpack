var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var { employeeDetails } = require('./data/mockData');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/employee/details', function(req, res, next) {
  res.json({
    data: employeeDetails
  });
});
// 系统鉴权
var loginState = false;

app.post('/api/post/login', function(req, res, next) {
  var data = req.body;
  const { name, password } = data;
  if (name === 'admin' && password === '123456') {
    loginState = true;
    res.json({
      code: 200,
      msg: '鉴权',
      data: true
    });
  } else {
    loginState = false;
    res.json({
      code: 200,
      msg: '账户名或密码错误',
      data: false
    });
  }
});

app.get('/api/auth/check', function(req, res, next) {
  res.json({
    code: 200,
    msg: '鉴权',
    data: loginState
  });
});

app.get('/api/get/logout', function(req, res, next) {
  loginState = false;
  res.json({
    code: 200,
    msg: '退出',
    data: true
  });
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('MockServer listening at http://%s:%s', host, port);
});
