const router = require('express').Router();

const { createCube } = require('../services/cubicService');
const { parseError } = require('../units/parser');

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
    } catch (errors) {
        // console.error(errors.messages);
        res.render('create', {
            title: 'Request error',
            body: req.body,
            errors: parseError(errors)
        });
    }

});

module.exports = router;