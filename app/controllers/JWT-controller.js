const jwt = require('jsonwebtoken');

const JWTController = async ( req, res ) => {
    const { username } = req.body;
    const token = jwt.sign( { username: username } , process.env.SECRET );
    res.json({ message: 'Correct authentication', token: token });
}

module.exports = { JWTController };