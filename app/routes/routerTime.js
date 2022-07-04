const express = require('express');
const moment = require('moment')
const routerTime = express.Router();

const userTime = function (req, res) {
  req.requestTime = Date.now();
  const user = req.body.name
  const date = moment(req.requestTime).format('MMMM d, YYYY')
  res.json({ user, date })
}

routerTime.post('/', userTime);

module.exports = routerTime