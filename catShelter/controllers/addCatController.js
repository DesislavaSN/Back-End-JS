const router = require('express').Router();

const { createCat, getAllBreeds } = require('../services/catService');

router.get('/', (req, res) => {
    const allBreeds = getAllBreeds();
    // console.log(allBreeds);

    res.render('addCat', {
        title: 'Cat Shelter - Add Cat',
        allBreeds
    });
});

router.post('/', async(req, res) => {
    try {
        const result = await createCat(req.body);
        // console.log(result);
        res.redirect('/');
    } catch (error) {
        res.render('addCat', {
            title: 'Request error'
        });
    }
});

module.exports = router;
