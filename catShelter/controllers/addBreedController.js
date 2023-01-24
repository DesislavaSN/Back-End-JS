const router = require('express').Router();

const { createBreed } = require('../services/catService');

router.get('/', (req, res) => {
    res.render('addBreed', {
        title: 'Cat Shelter - Add Breed',
    });
});

router.post('/', async (req, res) => {
    try {
        const result = await createBreed(req.body);
        res.redirect('/');
    } catch (error) {
        res.render('addBreed', {
            title: 'Request error'
        });
    }
});

module.exports = router;



