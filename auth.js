const User = require('./models/user');
const jwt = require('jsonwebtoken');

const secret = 'mySecret';

const newToken = (user) => {
    return jwt.sign({ id: user.id }, secret, { expiresIn: 300000});
}

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (error, payload) => {
            if(error) {
                reject(error);
            }else {
                resolve(payload);
            }
        });
    });
}

const protect = async (req, res, next) => {
    const bearer = req.headers.authorization;
    if(!bearer || !bearer.startsWith('Bearer')) {
        return res.status(400).end();
    } 

    const token = bearer.split('Bearer')[1];
    const payload = undefined;
    
    try {
        payload = await verifyToken(token);

    }
    catch(err) {
        return res.status(400).send(err);
    }
    
    const user = await User.findById(payload.id).select('-password').lean().exec();
    
    if(!user) {
        return res.status(400).end();
    }
    req.user = user;
    next();
}


module.exports = {
    newToken, 
    verifyToken,
    protect
}