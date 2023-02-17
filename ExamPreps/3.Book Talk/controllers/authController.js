const authController = require('express').Router();

const { register, login } = require('../services/userService');
const { parseError } = require('../utils/parser');

// ---------- REGISTER ----------
authController.get('/register', (req, res) => {
    res.render('register');
});

authController.post('/register', async (req,res) => {
    // console.log(req.body);
    try {
        if (req.body.email == ''  || req.body.username == '' || req.body.password == '') {
            throw new Error('All fields are required!');
        }
        if (req.body.password.length < 3) {
            throw new Error('Password should be at least 3 chars long!');
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords do not match!');
        }

        const token = await register(req.body.email, req.body.username, req.body.password);

        res.cookie('token', token);
        res.redirect('/'); 

    } catch (error) {
        console.log('authController.js - register - Error:', error.errors);
        const errors = parseError(error);

        res.render('register', {
            body: req.body,
            errors
        });
    } 
});


// ---------- LOGIN ----------

authController.get('/login', (req, res) => {
    res.render('login');
});

authController.post('/login', async (req, res) => {
    try {
        if (req.body.email == '' || req.body.password == '') {
            throw new Error('All fields are required!');
        }
        const token = await login(req.body.email, req.body.password)
        res.cookie('token', token);
        res.redirect('/'); 
    } catch (error) {
        console.log('authController.js - login - Error:', error);
        const errors = parseError(error);

        res.render('login', {
            body: req.body,
            errors
        });
    }
});


// ---------- LOGOUT ----------

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});


module.exports = authController;