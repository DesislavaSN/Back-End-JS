const router = require('express').Router();

const { createAccessory } = require('../services/accessoryService');

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
    } catch (error) {
        console.error(error);
        res.render('404', {
            title: 'Request Error'
        });
    } 
});

module.exports = router;