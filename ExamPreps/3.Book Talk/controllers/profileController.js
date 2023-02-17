const profuleController = require('express').Router();

const { getByWishList } = require('../services/bookSerrvice');

profuleController.get('/', async (req, res) => {
    const wishList = await getByWishList(req.user._id);
    // console.log(wishList);

    res.render('profile', {
        wishList, 
        user: Object.assign({wishList}, req.user)
    });

});



module.exports = profuleController;