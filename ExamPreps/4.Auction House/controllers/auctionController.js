const auctionController = require('express').Router();
const { parseError } = require('../utils/parser');
const { createAuction, getById, update, deleteById, getUserAuction, auctionBidder } = require('../services/auctionSerrvice');
const generateCategory = require('../utils/generator');


// ----------- DETAILS AUCTION -----------
auctionController.get('/:id/details', async (req, res) => {
    const id = req.params.id;
    const item = await getById(id);
    
    if (!item) {
        throw new Error('Item not found');
    }

    item.isOwner = req.user && item.owner == req.user._id ? true : false;
    item.isBidder = req.user && item.bidder == req.user._id ? true : false;

    if (item.isOwner && item.bidder.length == 0) {
        res.render('details-owner', {item});
    } else if (item.isOwner) {
        item.isBidder = true;
        const bidedUser = await getUserAuction(item.bidder);
        // console.log('bidedUser:',bidedUser.firstName);
        res.render('details-owner', {item, bidedUser});
    } else {
        res.render('details', {item});
    }
});

// ----------- BID ON AUCTION -----------
auctionController.get('/:id/bid', async (req, res) => {
    const id = req.params.id;
    const item = await getById(id);
    
    try {
        if (item.owner == req.user._id) {
            item.isOwner = true;
            return res.render('auction', {
                item,
                error: 'Cannot bid for your awn auction!'
            });
        }

        if (item.isBidder == req.user._id) {
            item.isBidder = true;
            return res.render('details', {item});
        } else if (req.query.price > item.price){
            // console.log(req.query.price, item.price);
            await auctionBidder(id, req.user._id, req.query.price);
            res.redirect(`/auction/${id}/details`);
        } else { 
            throw new Error('You cannot bid less or equal amount than the currecnt price!');
        }
    } catch (error) {
        console.log(error);
        res.render('details', {
            item,
            errors: parseError(error)
        });
    }
});


// ----------- CREAT AUCTION -----------
auctionController.get('/create', (req, res) => {
    res.render('create');
});

auctionController.post('/create', async (req, res) => {
    const offer = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        imageUrl: req.body.imageUrl,
        price: Number(req.body.price),
        owner: req.user._id
    }

    try {
        if (Object.values(offer).some(v => !v)) {
            throw new Error('All fields are required!');
        }
        const result = await createAuction(offer);
        res.redirect('/catalog');
    } catch (error) {
        res.render('create', {
            body: offer,
            errors: parseError(error)
        });
    }
});

// ----------- EDIT AUCTION -----------
auctionController.get('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const item = await getById(id);
    const categories = generateCategory(item.category);

    if (item.owner != req.user._id) {
        req.redirect('/auth/login');
    }

    res.render('edit', {item, categories});
});

auctionController.post('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const item = await getById(id);

    if (item.owner != req.user._id) {
        req.redirect('/auth/login');
    }

    const edited = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        imageUrl: req.body.imageUrl,
        price: Number(req.body.price),
    }

    try {
        if (Object.values(edited).some(v => !v)) {
            throw new Error('All fields are required!');
        }
        const result = await update(id, edited);
        res.redirect(`/auction/${id}/details`);
    } catch (error) {
        console.log(error);
        res.render('edit', {
            item: Object.assign(edited, {_id:id}),
            errors: parseError(error)
        });
    }

});

// ----------- DELETE AUCTION -----------
auctionController.get('/:id/delete', async (req, res) => {
    const id = req.params.id;
    const item = await getById(id);

    if (item.owner != req.user._id) {
        req.redirect('/auth/login');
    }

    await deleteById(item);
    res.redirect('/catalog');
});


module.exports = auctionController;