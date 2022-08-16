const express = require('express');
const routerLogin = express.Router();
const { JWTController } = require('../controllers/JWT-controller');
const { loginAuthentication } = require('../middlewares/loginAuthentication');

routerLogin.post('/login', loginAuthentication, JWTController );

module.exports = routerLogin;