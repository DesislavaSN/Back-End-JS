const router = require('express').Router();

const { createCube } = require('../services/cubicService');

router.get('/', (req, res) => {
    res.render('create', {
        title: 'Create a Cube'
    });
});

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const result = await createCube(req.body);
        // console.log('Result is: ', result);
        res.redirect('/details/' + result._id);
    } catch (error) {
        console.error(error.message);
        res.render('404', {
            title: 'Request error'
        });
    }
});

module.exports = router;