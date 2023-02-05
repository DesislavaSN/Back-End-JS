const jwt = require('jsonwebtoken');
const authController = require('express').Router();
const { login, register } = require('../services/authService');

// ----------- LOGIN: -----------
authController.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    });
});

authController.post('/login', async (req, res) => {
    try {
        const result = await login(req.body.username.trim(), req.body.password.trim());
        attchToken(req, res, result);
        res.redirect('/');
    } catch (error) {
        console.log('authController.js - error:', error);
        res.render('login', {
            title: 'Request Error',
            error: error.message
        });
    }
});

// ----------- REGISTER: -----------
authController.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register'
    });
});

authController.post('/register', async (req, res) => {
    try {
        if (req.body.username.trim() == '' || req.body.password.trim() == ''){
            throw new Error('All fields are required');
        }
        if (req.body.password.trim() != req.body.repeatPassword.trim()) {
            throw new Error('Passwords do not match!');
        }

        const result = await register(req.body.username.trim(), req.body.password.trim());
        attchToken(req, res, result);
        res.redirect('/');
    } catch (error) {
        console.log('authController.js - error: ', error);
        res.render('register', {
            title: 'Request Error',
            error: error.message
        });
    }
});

// ----------- LOGOUT: -----------
authController.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
});

// ---------- tazi f. pravi token i go zakacha kum cookie-to:
function attchToken(req, res, data){
    const token = req.signJwt(data);
    res.cookie('jwt', token, {maxAge: 14400000});
}

module.exports = authController;