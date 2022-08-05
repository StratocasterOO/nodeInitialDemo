const express = require('express');
const router = express.Router();
const { JWTController } = require('../controllers/JWT-controller');
const { loginAuthentication } = require('../middlewares/loginAuthentication');

router.post('/login', loginAuthentication, JWTController );

module.exports = router;