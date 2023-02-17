const { getAll } = require('../services/gallerySerrvice');

const catalogController = require('express').Router();

catalogController.get('/', async (req, res) => {
    const allPubs = await getAll();
    res.render('gallery', {
        title: 'Gallery Page',
        allPubs
    });
});

module.exports = catalogController;