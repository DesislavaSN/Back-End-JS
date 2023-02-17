const catalogController = require('express').Router();

const { getAll } = require('../services/bookSerrvice');

catalogController.get('/', async (req, res) => {
    const books = await getAll();
    res.render('catalog', { books });
});

module.exports = catalogController;