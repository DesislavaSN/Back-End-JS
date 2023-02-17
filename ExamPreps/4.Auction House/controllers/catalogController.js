const { getAll } = require('../services/auctionSerrvice');

const catalogController = require('express').Router();

catalogController.get('/', async (req, res) => {
    const allAuctions = await getAll();
    res.render('browse', {allAuctions});
})

module.exports = catalogController;
