const router = require('express').Router();

const { createCube } = require('../services/cubicService');

router.get('/', (req, res) => {
    res.render('create', {
        title: 'Create a Cube'
    });
});

router.post('/', async (req, res) => {
    console.log('USER: ', req.user._id);

    try {
        const result = await createCube(req.body, req.user._id);
        console.log('Result is: ', result);
        res.redirect('/details/' + result._id);
    } catch (error) {
        console.error(error.message);
        res.render('404', {
            title: 'Request error'
        });
    }

    // const result = await createCube(req.body, req.user._id);

    // if (!req.user || cube.owner != req.user._id) {
    //     console.log(cube.owner);
    //     return res.redirect('/auth/login');
    // }

    // res.redirect('/details/' + result._id);
});

module.exports = router;