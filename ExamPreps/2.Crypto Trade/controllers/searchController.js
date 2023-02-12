const searchController = require('express').Router();

const { getAll } = require('../services/cryptoService');
const searchCrypto = require('../services/searchService');

searchController.get('/', async (req, res) => {
    const coins = await getAll();
    res.render('search', {
        title: 'Search Page',
        coins 
    });
});

searchController.post('/', async (req, res) => {
    // console.log(req.body);
    const {name, payment } = req.body;
    const foundCoin = await searchCrypto(name, payment);
    console.log(foundCoin);
    res.render('search', {foundCoin});
})

module.exports = searchController;