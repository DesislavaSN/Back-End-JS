const cryptoController = require('express').Router();

const { createCrypto, getById, deleteById, update, buyCrypto } = require('../services/cryptoService');
const generatePaymentMethod = require('../utils/generatePayment');
const { parseError } = require('../utils/parser');

// --------- CRYPTO DETAILS ---------

cryptoController.get('/:id/details', async (req, res) => {
    const id = req.params.id;
    const coin = await getById(id);

    coin.isOwner = req.user && coin.owner == req.user._id ? true : false;
    coin.isBought = req.user && coin.buy.map(b => b.toString()).includes(req.user._id.toString()) ? true : false;
    
    res.render('details', {
        tilte: 'Details Page',
        coin
    });
});


// --------- CREATE CRYPTO ---------
cryptoController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Page'
    });
});

cryptoController.post('/create', async (req, res) => {
    const coin = {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        price: Number(req.body.price),
        description: req.body.description,
        payment: req.body.payment,
        owner: req.user._id
    }

    // console.log(coin);
    try {
        if (Object.values(coin).some(v => !v)) {
            throw new Error('All fields are required!');
        }

        const result = await createCrypto(coin);
        res.redirect('/catalog');
    } catch (error) {
        res.render('404', {
            title: 'Request Error',
            body: coin,
            errors: parseError(error)
        });
    }
});

// --------- EDIT CRYPTO ---------
cryptoController.get('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const coin = await getById(id);
    const paymentMethods = generatePaymentMethod(coin.payment);
    // console.log(paymentMethod);

    if (coin.owner != req.user._id) {
        res.redirect('/auth/login');
    }

    res.render('edit', {
        title: 'Edit Page',
        coin,
        paymentMethods
    });
});

cryptoController.post('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const coin = await getById(id);

    if (coin.owner != req.user._id) {
        res.redirect('/auth/login');
    }

    const edited = {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        price: Number(req.body.price),
        description: req.body.description,
        payment: req.body.payment,
    }
    // console.log(edited);

    try {
        if (Object.values(edited).some(v => !v)) {
            throw new Error('All fields are required!');
        }

        const result = await update(id, edited);
        res.redirect(`/crypto/${id}/details`);
    } catch (error) {
        console.log(error);
        res.render('404', {
            title: 'Request Error',
            body: Object.assign(edited, {_id: id}),
            errors: parseError(error)
        });
    }
});

// --------- DELETE CRYPTO ---------
cryptoController.get('/:id/delete', async (req, res) => {
    const id = req.params.id;
    const coin = await getById(id);

    if (coin.owner != req.user._id) {
        res.redirect('/auth/login');
    }

    await deleteById(id);
    res.redirect('/catalog');
});

// --------- BUY CRYPTO ---------

cryptoController.get('/:id/buy', async (req, res) => {
    const id = req.params.id;
    const coin = await getById(id);

    try {
        if (coin.owner == req.user._id) {
            coin.isOwner = true;
            throw new Error('You are not allowed to buy your own currency');
        }

        if (coin.buy.map(b => b.toString()).includes(req.user._id.toString())) {
            coin.isBought = true;
            throw new Error('You already bought these crypto coins');
        }

        await buyCrypto(id, req.user._id);
        res.redirect(`/crypto/${id}/details`);
    } catch (error) {
        res.render('404', {
            title: 'Request Error',
            coin,
            errors: parseError(error)
        });
    }
});

module.exports = cryptoController;