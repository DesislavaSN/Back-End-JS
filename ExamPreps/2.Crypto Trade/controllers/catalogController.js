const { getAll } = require('../services/cryptoService');

const catalogController = require('express').Router();

catalogController.get('/', async (req, res) => {
    const coins = await getAll();
    res.render('catalog', {
        title: 'Catalog Page',
        coins
    });
});

module.exports = catalogController;