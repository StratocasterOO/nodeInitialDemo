const express = require('express');
const app = express();

const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const port = 3000

const routerUser = require('./routes/routeUser');
const routerUpload = require('./routes/routeUpload');
const routerTime = require('./routes/routerTime');

app.use(express.json());

app.use('/user', routerUser )

app.use('/upload', routerUpload )

app.use('/time', routerTime )

app.listen( port, function(){
    console.log("server is running")
    })