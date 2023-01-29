const router = require('express').Router();

const Accessory = require('../models/Accessory');
const { getById } = require('../services/cubicService');

router.get('/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cube = await getById(cubeId).populate('accessories').lean();
    // console.log(cube);
    if (cube) {
        res.render('details', {
            title: 'Details Page',
            cube
        });
    } else {
        res.render('404', {
            title: 'Request Error'
        });
    } 
});

module.exports = router;