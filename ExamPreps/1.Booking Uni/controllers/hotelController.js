const hotelController = require('express').Router();
const { parseError } = require('../utils/parser');
const { createHotel, getById, update, deleteById, bookRoom } = require('../services/hotelService');


// --------- HOTEL DETAILS: ------------------

hotelController.get('/:id/details', async (req, res) => {
    const id = req.params.id;
    const hotel = await getById(id);

    if (hotel.owner == req.user._id) {
        hotel.isOwner = true;
    } else if (hotel.bookings.map(b => b.toString()).includes(req.user._id.toString())) {
        hotel.isBooked = true;
    }

    res.render('details', {
        title: 'Hotel Details Page',
        hotel
    });
});

// --------- CREATE HOTEL: ------------------

hotelController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Hotel Page'
    });
});

hotelController.post('/create', async (req, res) => {
    const hotel = {
        name: req.body.name,
        city: req.body.city, 
        imageUrl: req.body.imageUrl, 
        rooms: Number(req.body.rooms), 
        owner: req.user._id
    }

    try {
        if (Object.values(hotel).some(v => !v)) {
            throw new Error('All fields are required');
        }
        const result = await createHotel(hotel);
        res.redirect('/');
    } catch (error) {
        res.render('create', {
            title: 'Request Error',
            body: hotel,
            errors: parseError(error)
        });
    }
});


//--------- EDIT HOTEL: ------------------
hotelController.get('/:id/edit', async(req, res) => {
    const id = req.params.id;
    const hotel = await getById(id);

    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login');
    }

    res.render('edit', {
        title: 'Edit Hotel Page',
        hotel
    });
});

hotelController.post('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const hotel = await getById(id);

    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login');
    }

    const editedHotel = {
        name: req.body.name,
        city: req.body.city, 
        imageUrl: req.body.imageUrl, 
        rooms: Number(req.body.rooms), 
    }

    try {
        if (Object.values(editedHotel).some(v => !v)) {
            throw new Error('All fields are required');
        }
        const result = await update(id, editedHotel);
        res.redirect(`/hotel/${id}/details`);
    } catch (error) {
        // console.log(error);
        res.render('edit', {
            title: 'Request Error',
            hotel: Object.assign(editedHotel, {_id: id}),
            errors: parseError(error)
        });
    }
    
});


//DELETE HOTEL:
hotelController.get('/:id/delete', async (req, res) => {
    const id = req.params.id;
    const hotel = await getById(id);

    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login');
    }

    await deleteById(id);
    res.redirect('/');
});


// -------------- BOOK HOTEL:--------------
hotelController.get('/:id/book', async (req, res) => {
    const id = req.params.id;
    const hotel = await getById(id);

    try {
        if (hotel.owner == req.user._id) {
            hotel.isOwner = true;
            throw new Error('Cannot book your own hotel')
        }

        if (hotel.bookings.map(b => b.toString()).includes(req.user._id.toString())) {
            hotel.isBooked = true;
            throw new Error('Cannot book twice');
        }

        await bookRoom(id, req.user._id);
        res.redirect(`/hotel/${id}/details`);
    } catch (error) {
        res.render('details', {
            title: 'Hotel Details Page',
            hotel,
            errors: parseError(error)
        })
    }
    

});


module.exports = hotelController;