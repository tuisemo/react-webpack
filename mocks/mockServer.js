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
app.get('/api/auth/check', function(req, res, next) {
  res.json({
    code: 200,
    msg: '鉴权',
    data: true
  });
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('MockServer listening at http://%s:%s', host, port);
});
