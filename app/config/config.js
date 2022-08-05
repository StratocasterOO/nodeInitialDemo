require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT

const mysqlConfig = {
    port: process.env.MYSQL_PORT,
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME
}

let dbENV
let controllersENV

if( process.env.NODE_ENV === 'mongo' ) {
    dbENV = '../database/db-mongo';
    controllersENV = '../controllers/mongo-controllers';
} else if (process.env.NODE_ENV === 'mysql') {
    dbENV = '../database/db-mysql';
    controllersENV = '../controllers/mysql-controllers';
}

module.exports = {
    MONGODB_URI,
    PORT,
    mysqlConfig,
    dbENV,
    controllersENV
}



