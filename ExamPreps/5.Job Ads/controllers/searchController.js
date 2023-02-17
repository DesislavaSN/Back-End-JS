const searchController = require('express').Router();
const { searchJob, neddedInfo } = require('../services/searchService');


searchController.get('/', async (req, res) => {
    const {search} = req.query;
    const found = await searchJob(search);
    const jobs = await neddedInfo(found);

    res.render('search', {
        title: 'Search Page',
        body: req.query,
        jobs
    });
});


module.exports = searchController;