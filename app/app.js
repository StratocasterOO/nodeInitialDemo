const express = require('express');
const cors = require('cors')
const app = express();

/* const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) */

const port = 3000

const routerUser = require('./routes/routeUser');
const routerUpload = require('./routes/routeUpload');
const routerTime = require('./routes/routerTime');
const { noCacheMiddleware, authentication } = require('./middlewares/middleware')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static('uploads'))

app.use(noCacheMiddleware)

app.use('/user', routerUser )

app.use('/upload', routerUpload )

app.use('/time', authentication, routerTime )

app.listen( port, function(){
    console.log(`CORS-enabled web server listening on port ${port}`)
    })