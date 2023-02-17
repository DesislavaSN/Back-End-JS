const homeController = require('express').Router();
const { getAll, getSharedArts, getById } = require('../services/gallerySerrvice');

homeController.get('/', async (req, res) => {
    const allPublications = await getAll();
    res.render('home', {
        title: 'Home Page',
        user: req.user,
        allPublications
    });
});

module.exports = homeController;