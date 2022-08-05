const jwt = require("jsonwebtoken");

const JWTAuthentication = async( req, res, next ) => {

    try {
        const token = req.header( "x-auth-token" );
        console.log(req.header, token)
        const decoded = jwt.verify( token, process.env.SECRET );
        console.log( decoded );
        req.user = decoded;
        next() 
        
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token authentication' })
    }
}
module.exports = { JWTAuthentication };

