const catalogController = require('express').Router();

const { getAll } = require('../services/adSerrvice');

catalogController.get('/', async (req, res) => {
    const allAdds = await getAll();
    res.render('all-ads', { allAdds });
});

module.exports = catalogController;