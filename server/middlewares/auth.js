const jwt = require('jsonwebtoken');
const SECRET = 'motherfucker#^^^#@@&@&&*'
const dotenv = require('dotenv');
dotenv.config();
/*
    Auth middleware that checks if an authorization header 
    exists and if the token contain within is valid
*/


module.exports = function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) return res.status(401).json({status: 'error', message:'Please specify authorization header'});
        const token = authHeader.split(' ')[1];
        const tokenData = jwt.verify(token, process.env.SECRET);
        req.user = tokenData.id;
        next();
    } catch (error) {
       return res.status(401).json({status: 'error', message:'you are not authorizaed'});

    }

}