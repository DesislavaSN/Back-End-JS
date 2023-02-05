const jwt = require('jsonwebtoken');

module.exports = (jwtSecret) => (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const data = jwt.verify(token, jwtSecret);
            // console.log('Data - auth.js' ,data);
            req.user = data;
        } catch (error) {
            console.log('auth.js - error: ' ,error);
            res.clearCookie('jwt');
            return res.redirect('/auth/login');
        }
    }
    req.signJwt = (data) => jwt.sign(data, jwtSecret, {
        expiresIn: '5h'
    });
    next();
}