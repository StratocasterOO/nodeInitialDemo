const express = require('express');
const moment = require('moment')
const routerTime = express.Router();

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

routerTime.use(requestTime);

routerTime.get('/', function (req, res) {
  const responseText = `${req.body.name} requested at: ${moment(req.requestTime).format('MMMM d, YYYY')} `;
  res.send(responseText);
  console.log(req.headers.authorization)
});


module.exports = routerTime