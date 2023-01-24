const router = require('express').Router();

const { getById, catsData, persistCat } = require('../services/catService');

router.get('/:id', (req, res) => {
    const catId = req.params.id;
    const delCat = getById(catId);
    res.render('catShelter', {
        title: 'Cat Shelter',
        delCat
    });
});

// delete a cat from the data
router.post('/:id', (req, res) => {
    const catId = req.params.id;
    const cat = getById(catId);
    const catIndex = catsData.indexOf(cat);
    catsData.splice(catIndex, 1);
    // console.log(catsData);
    persistCat();
    res.redirect('/');
});


module.exports = router;
