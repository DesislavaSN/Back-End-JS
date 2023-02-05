const router = require('express').Router();

const Accessory = require('../models/Accessory');
const { getById } = require('../services/cubicService');

router.get('/:id', async (req, res) => {
    const cubeId = req.params.id;

    /* popyliram accessories svoistvoto v Cuba koito sum nameriq chrez id-to my i 
    sled tova v attachAccessoryController -> post deistvieto sum push-nala  accessory-to */ 
    const cube = await getById(cubeId).populate('accessories').lean();

    // console.log('USER:' ,req.user);
    // console.log('CUBE OWNER:', cube.owner);
    if (!req.user || cube.owner != req.user._id) {
        return res.redirect('/auth/login');
    }

    if (cube && cube.owner == req.user._id) {
        res.render('details', {
            title: 'Details Page',
            cube
        });
    } 
});

module.exports = router;