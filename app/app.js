const express = require('express');
const app = express();

const routerUser = require('./routes/routeUser');

app.use('/user', routerUser )

app.listen( 8000, function(){
    console.log("server is running")
    })