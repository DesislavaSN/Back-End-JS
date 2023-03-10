const { getById } = require('../services/cubicService');

const router = require('express').Router();

router.get('/:id', (req, res) => {
    const cubeId = req.params.id;
    const cube = getById(cubeId);
    if (cube) {
        res.render('details', {
            title: 'Details Page',
            cube
        });
    } else {
        res.render('404');
    } 
});

module.exports = router;