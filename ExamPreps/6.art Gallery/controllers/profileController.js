const profileController = require('express').Router();

const {getSharedPosts, getOwnerPosts} = require('../services/profileService');

profileController.get('/', async (req, res) => {
    const allShares = await getSharedPosts(req.user._id);
    const sharedTitles = Object.assign(allShares.map(s => s.title));
    // console.log(titles);

    const ownePubs = await getOwnerPosts(req.user._id);
    const owneTitles = Object.assign(ownePubs.map(p => p.title));
    // console.log(owneTitles);

    res.render('profile', {
        title: 'Profile Page',
        sharedTitles,
        owneTitles
    });
});

module.exports = profileController;

