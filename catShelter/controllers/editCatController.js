const router = require('express').Router();

const { getById, getAllBreeds, catsData, editCat } = require('../services/catService');


router.get('/:id', (req, res) => {
    const catId = req.params.id;
    const cat = getById(catId);
    const allBreeds = getAllBreeds();

    if (cat) {
        res.render('editCat', {
            title: 'Cat shelter - Edit Cat',
            cat,
            allBreeds
        });
    } else {
        res.render('404');
    }
});


// EDIT CAT: DOES NOT WORK!!! 
router.post('/:id', (req, res) => {
    try {
        const catId = req.params.id;
        const cat = getById(catId);
        const catIndex = catsData.indexOf(cat);

        const updatedCat = editCat(req.body);
        console.log(updatedCat);
        // catsData.splice(catIndex, 1, editCat);

        res.redirect('/');
    } catch (error) {
        res.render('editCat', {
            title: 'Request error'
        });
    }
    
});

module.exports = router;