const loginAuthentication = ( req, res, next ) => {

    const { username, password } = req.body;
    
    ( username == process.env.USERNAME && password == process.env.PASSWORD ) 
        ? next()
        : res.json({ message: "Not valid username or password" })        
}
        
module.exports = { loginAuthentication };
