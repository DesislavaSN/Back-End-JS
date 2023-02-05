const express = require('express');
const hbs = require('express-handlebars').create({extname: '.hbs'});
const cookiePasrer = require('cookie-parser');
const auth = require('../middlewares/auth');
const userNav = require('../middlewares/userNav');

const jwtSecret = 'this is my secret';

module.exports = (app) => {
    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');

    app.use(express.urlencoded({extended: true}));
    app.use('/static', express.static('static'));
    app.use(cookiePasrer());
    app.use(auth(jwtSecret));
    app.use(userNav());
}
