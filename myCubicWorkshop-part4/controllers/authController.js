const jwt = require('jsonwebtoken');
const authController = require('express').Router();
const { body, validationResult } = require('express-validator')

const { login, register } = require('../services/authService');
const { parseError } = require('../units/parser');

// ----------- LOGIN: -----------
authController.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    });
});

authController.post('/login', 
    body(['username' , 'password'])
        .trim(),

    async (req, res) => {
        const { errors } = validationResult(req);
        try {
            if (errors.length > 0) {
                throw errors;
            }

            const result = await login(req.body.username, req.body.password);
            attchToken(req, res, result);
            res.redirect('/');
        } catch (errors) {
            console.log('authController.js - error:', errors);
            res.render('login', {
                title: 'Request Error',
                body: req.body,
                errors: parseError(errors)
            });
        }
});

// ----------- REGISTER: -----------
authController.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register'
    });
});

authController.post('/register', 
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required!').bail()
        .isAlphanumeric().withMessage('Username must contain only English letters and digits'),
    body('password')
        .trim()
        .notEmpty().withMessage('Password is required!').bail()
        .isAlphanumeric().withMessage('Password must contain only English letters and digits')
        .isLength({min: 8}).withMessage('Password must be at least 8 characters long and contain only English letters and digits'),
    body('repeatPassword')
        .trim()
        .custom(async (value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match!');
            }
        }),
    async (req, res) => {
        const { errors } = validationResult(req);
        try {
            if (errors.length > 0) {
                throw errors;
            }

            const result = await register(req.body.username.trim(), req.body.password.trim());
            attchToken(req, res, result);
            res.redirect('/');
        } catch (errors) {
            console.log('authController.js - error: ', errors);
            res.render('register', {
                title: 'Request Error',
                body: req.body,
                errors: parseError(errors)
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



/*
if (req.body.username.trim() == '' || req.body.password.trim() == ''){
    throw new Error('All fields are required');
}
if (req.body.password.trim() != req.body.repeatPassword.trim()) {
    throw new Error('Passwords do not match!');
}
*/