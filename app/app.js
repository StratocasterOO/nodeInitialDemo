const express = require('express');
const { dbENV, PORT } = require( './config/config' )
const { connectDB } = require( dbENV );
const routerPlayer = require('./routes/route-player');
const routerLogin = require('./routes/route-login');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routerLogin);
app.use('/', routerPlayer);

app.listen( PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })