const adController = require('express').Router();

const { createAd, getById, update, deleteById, getByCreateUser, getAppliedUsers, getAppliedJobs } = require('../services/adSerrvice');
const { parseError } = require('../utils/parser');


// --------- CREATE AD ----------
adController.get('/create', async (req, res) => {
    res.render('create', {title: 'Create Page'});
});

adController.post('/create', async (req, res) => {
    const ad = {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        description: req.body.description,
        owner: req.user._id,
    }

    try {
        if (Object.values(ad).some(v => !v)) {
            throw new Error('All fields are requied!');
        }

        const result = await createAd(ad);
        res.redirect('/catalog');
    } catch (error) {
        res.render('create', {
            title: 'Request Error',
            body: ad,
            errors: parseError(error)
        })
    }
});

// --------- DETAILS AD ----------
adController.get('/:id/details', async (req, res) => {
    const id = req.params.id;
    const ad = await getById(id);

    const adOwner = await getByCreateUser(ad.owner);
    const ownerEmail = Object.assign(adOwner.map(owner => owner.email));
    // console.log(ownerEmail);

    ad.isOwner = req.user && ad.owner == req.user._id ? true : false;
    ad.isApplicant = req.user && 
        ad.applied.map(a => a.toString()).includes(req.user._id.toString()) ? 
        true : false
    ;

    const lengthApplications = ad.applied.length > 0 ? true : false;
    const lenght = ad.applied.length;
    const appliedUser = await getAppliedUsers(ad.applied);

    res.render('details', {
        title: 'Details Page',
        ad, 
        ownerEmail, 
        lengthApplications, 
        lenght, 
        appliedUser});
});

// --------- APPLIED FOR AD ----------
adController.get('/:id/apply', async (req, res) => {
    const id = req.params.id;
    const ad = await getById(id);

    try {
        if (ad.owner == req.user._id) {
            res.redirect('details');
            throw new Error('Cannot apply for your own ad!');
        }

        await getAppliedJobs(id, req.user._id);
        res.redirect(`/ad/${id}/details`)
    } catch (error) {
        console.log(error);
        return res.render('details', {
            title: 'Request Error',
            ad,
            errors: parseError(error)
        });
    }
});


// --------- EDIT AD ----------
adController.get('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const ad = await getById(id);

    if (ad.owner != req.user._id) {
        res.redirect('/auth/login');
    }
    res.render('edit', {
        title: 'Edit Page',
        ad
    });
});

adController.post('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const ad = await getById(id);

    if (ad.owner != req.user._id) {
        res.redirect('/auth/login');
    }
    const edited = {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        description: req.body.description,
    }

    try {
        if (Object.values(edited).some(v => !v)) {
            throw new Error('all fields are required!');
        }
        const result = await update(id, edited);
        res.redirect(`/ad/${id}/details`);
    } catch (error) {
        res.render('edit', {
            title: 'Request Error',
            ad: Object.assign(edited, {_id: id}),
            errors: parseError(error)
        });
    }
});

// --------- DELETE AD ----------
adController.get('/:id/delete', async (req, res) => {
    const id = req.params.id;
    const ad = await getById(id);

    if (ad.owner != req.user._id) {
        res.redirect('/auth/login');
    }
    await deleteById(id);
    res.redirect('/catalog');
});

module.exports = adController;