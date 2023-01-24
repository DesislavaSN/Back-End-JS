const router = require('express').Router();

const { getAllCats } = require('../services/catService');


router.get('/', (req, res) => {
    const allCats = getAllCats();
    res.render('home', {
        title: 'Cat Shelter - Home Page',
        allCats
    });
})

module.exports = router;