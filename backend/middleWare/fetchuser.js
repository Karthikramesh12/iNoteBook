const jwt = require('jsonwebtoken');
const JWT_CODE = "Karmine12@_and|this/should)beScure(enough";

const fetchuser = (req, res, next) =>{
    // get the user id from the token
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error: "please authenticate using a valid token"})
    }
    try{
        const data = jwt.verify(token, JWT_CODE);
        req.user = data.user;
        next();
    }
    catch(error){
        res.status(401).send({error: "please authenticate using a valid token"})
    }
}

module.exports = fetchuser;