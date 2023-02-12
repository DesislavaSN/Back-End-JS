const profileController = require('express').Router();

const { hasUser } = require('../middlewares/guard');
const { getByUserBooking } = require('../services/hotelService');

profileController.get('/', hasUser(), async (req, res) => {
    const bookings = await getByUserBooking(req.user._id);
    // console.log(bookings);

    res.render('profile', {
        title: 'Profile Page',
        user: Object.assign({bookings}, req.user)
    });
});

module.exports = profileController;