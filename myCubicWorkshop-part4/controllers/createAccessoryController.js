const router = require('express').Router();

const { createAccessory } = require('../services/accessoryService');
const { parseError } = require('../units/parser');

router.get('/accessory', (req, res) => {
    res.render('createAccessory', {
        title: 'create New Accessory'
    });
});

router.post('/accessory', async (req, res) => {
    // console.log(req.body);
    try {
        await createAccessory(req.body);
        res.redirect('/');
    } catch (errors) {
        console.error(errors.message);
        res.render('createAccessory', {
            title: 'Request Error',
            body: req.body,
            errors: parseError(errors)
        });
    } 
});

module.exports = router;