const galleryController = require('express').Router();

const { createPublication, getById, getByCreateUser, update, deleteById, getSharedArts } = require('../services/gallerySerrvice');
const { parseError } = require('../utils/parser');


// -------- CREATE PUB --------
galleryController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Page'
    });
});

galleryController.post('/create', async (req, res) => {
    const newPub = {
        title: req.body.title,
        technique: req.body.technique,
        imageUrl: req.body.imageUrl,
        certificate: req.body.certificate,
        owner: req.user._id
    }

    try {
        if(Object.values(newPub).some(v => !v)){
            throw new Error('All fields are required!');
        }
        const result = await createPublication(newPub);
        res.redirect('/catalog');
    } catch (error) {
        res.render('create', {
            title: 'Request Error',
            body: newPub,
            errors: parseError(error)
        });
    }
});

// -------- DETAILS PUB --------
galleryController.get('/:id/details', async (req, res) => {
    const id = req.params.id;
    const pub = await getById(id);

    const pubOwner = await getByCreateUser(pub.owner);
    const pubUsername = Object.assign(pubOwner.map(owner => owner.username))
    // console.log(pubUsername);

    pub.isOwner = req.user && pub.owner == req.user._id ? true : false;
    pub.isUser = req.user && 
    pub.userShares.map(u => u.toString()).includes(req.user._id.toString()) ? 
        true : false
    ;
    
    res.render('details', {
        title: 'Details Page',
        pub,
        pubUsername
    });
});

// -------- SHARED PUB --------
galleryController.get('/:id/share', async (req, res) => {
    const id = req.params.id;
    const pub = await getById(id);

    try {
        if (pub.owner == req.user._id) {
            res.redirect('details');
            throw new Error('You are not allowed to share your own publication!');
        }
        await getSharedArts(id, req.user._id);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        return res.render('details', {
            title: 'Request Error',
            pub,
            errors: parseError(error)
        });
    }
});


// -------- EDIT PUB --------
galleryController.get('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const pub = await getById(id);

    if (pub.owner != req.user._id) {
        res.redirect('/auth/login');
    }

    res.render('edit', {
        title: 'Edit Page',
        pub
    });
});

galleryController.post('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const pub = await getById(id);
    console.log( 'pub ID: ',id);

    if (pub.owner != req.user._id) {
        res.redirect('/auth/login');
    }

    const edited = {
        title: req.body.title,
        technique: req.body.technique,
        imageUrl: req.body.imageUrl,
        certificate: req.body.certificate
    }
    
    try {
        if (Object.values(edited).some(v => !v)) {
            throw new Error('All fields are required!');
        }
        const result = await update(id, edited);
        res.redirect(`/gallery/${id}/details`);
    } catch (error) {
        console.log(error);
        res.render('edit', {
            title: 'Request Error',
            pub: Object.assign(edited, {_id: id}),
            errors: parseError(error)
        });
    }
});

// -------- DELETE PUB --------
galleryController.get('/:id/delete', async (req, res) => {
    const id = req.params.id;
    const pub = await getById(id);

    if (pub.owner != req.user._id) {
        res.redirect('/auth/login');
    }

    await deleteById(id);
    res.redirect('/catalog');
});

module.exports = galleryController;