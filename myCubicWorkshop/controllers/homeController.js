const { getAll } = require('../services/cubicService');

const router = require('express').Router();

router.get('/', (req, res) => {
    const search = req.query.search;
    const from = Number(req.query.from);
    const to = Number(req.query.to);
    // console.log( to);

    const allCubes = getAll(search, from, to);
    // console.log(search);
    res.render('home', {
        title: 'Home Page',
        allCubes,
        search,
        from,
        to
    });
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page'
    });
});

module.exports = router;