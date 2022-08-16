const express = require('express');
const { dbENV, PORT } = require( './config/config' )
const { connectDB } = require( dbENV );
const routerPlayer = require('./routes/route-player');
const routerLogin = require('./routes/route-login');

//const { unknownEndpoint, errorHandler } = require('./middleware/error-handler');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routerLogin);
app.use('/', routerPlayer);
//app.use(errorHandler, unknownEndpoint);

app.listen( PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })