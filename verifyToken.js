const jwt = require('jsonwebtoken');



module.exports = function (req,res,next){

    const token = req.header('token');
    if(!token)return res.status(401).send('Specify a token before doing this operation');

    try{
        const verified =jwt.verify(token,'jfbdjf12');
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('The token is invalid');
    }
}