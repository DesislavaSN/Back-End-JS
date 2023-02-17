const errorController = require('express').Router();

errorController.get('*', (req, res) => {
    res.render('404', {title: 'Request Error'});
})

module.exports = errorController;