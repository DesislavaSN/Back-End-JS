const { createCube } = require('../services/cubicService');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('create', {
        title: 'Create a Cube'
    });
});

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const result = await createCube(req.body);
        console.log('Result is: ', result);
        res.redirect('/details/' + result.id);
    } catch (error) {
        res.render('create', {
            title: 'Request error'
        });
    }
});

module.exports = router;