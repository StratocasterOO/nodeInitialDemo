const express = require('express');
const routerTime = express.Router();

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

routerTime.use(requestTime);

routerTime.get('/', function (req, res) {
  var responseText = 'Hello World!';
  responseText += 'Requested at: ' + req.requestTime + '';
  res.send(responseText);
});


module.exports = routerTime