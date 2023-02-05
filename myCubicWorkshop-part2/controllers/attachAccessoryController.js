const router = require('express').Router();

const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

router.get('/accessory/:id', async (req, res) => {
    try {
        const cube = await Cube.findById(req.params.id).lean();
        const accessories = await Accessory.find({_id: {$nin: cube.accessories}}).lean();
        // console.log(accessories);

        res.render('attachAccessory', {
            title: 'Attach New Accessory', 
            cube,
            accessories
        });
    } catch (error) {
        console.error(error.message);
        res.render('404');
    } 
});

router.post('/accessory/:id', async (req, res) => {    
    try {
        // console.log(req.body.accessory);
        const cube = await Cube.findById(req.params.id);
        const accessoryId = req.body.accessory;

        cube.accessories.push(accessoryId);
        await cube.save();

        res.redirect('/details/' + cube._id);
    } catch (error) {
        console.error(error.message);
        res.render('404', {
            title: 'Request Error'
        });
    }
});

module.exports = router;