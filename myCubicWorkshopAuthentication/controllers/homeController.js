const router = require('express').Router();

const { getAll } = require('../services/cubicService');

router.get('/', async (req, res) => {
   try {
        const allCubes = await getAll();
        // console.log(search);
        res.render('home', {
            title: 'Home Page',
            allCubes
        });
   } catch (error) {
        console.error(error.message);
        res.redirect('/404');
   }  
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page'
    });
});

module.exports = router;