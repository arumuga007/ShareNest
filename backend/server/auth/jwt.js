const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
require('dotenv')

const SECRET_KEY = '74533ccf90b1ca0f5782a7f770a02f6dca92266ad41b3948a038ddcc467d5f4fd368eb7ea3b944dbd3c6444b2d9ea9aecf2eda51f0ba9283c7ba50b9562f7917';

const generateToken = (payload) => {
    console.log(SECRET_KEY);
    return jwt.sign(payload, SECRET_KEY);
}

const verifyToken = (token) => {
    return jwt.verifyToken(token, SECRET_KEY);
}

const identifyUser = (req,res, next) => {
    const authHeader = req.headers.authorization;
    console.log("authheader",authHeader);
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    const token = authHeader.split(' ')[1];
    console.log(token)
    if(!token)
        return res.status(401).json({ error: 'Unauthorized: No token provided' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(402).json({ error: 'Unauthorized: Invalid token' });
        }
        console.log(decoded.userId);
        req.user = decoded.userId;
    });
    next();
}

module.exports = {
    generateToken,
    verifyToken,
    identifyUser
};