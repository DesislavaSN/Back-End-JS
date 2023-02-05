const cubeController = require('express').Router();

const { getById, editCube, deleteCubeById } = require('../services/cubicService');

// ----------- EDIT CUBE:
cubeController.get('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const cube = await getById(id);
    // console.log('REQ.USER: ' ,req.user);
    // console.log('CUBE OWNER: '  ,cube.owner);

    if (!req.user || cube.owner != req.user._id) {
        console.log(cube.owner);
        return res.redirect('/auth/login');
    }
    res.render('edit', {
        title: 'Edit Cube',
        cube
    });
});

cubeController.post('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const cube = await getById(id);

    if (!req.user || cube.owner != req.user._id) {
        console.log('cubeController.js file- cube owner: ',cube.owner);
        return res.redirect('/auth/login');
    }

    try {
        const result = await editCube(id, req.body);
        res.redirect('/details/' + result._id);
    } catch (error) {
        console.log('cubeController.js - error: ', error);
        res.render('edit', {
            title: 'Request Error',
            cube: req.body
        });
    }
});

// ----------- DELETE CUBE:
cubeController.get('/:id/delete', async (req, res) => {
    const id = req.params.id;
    const cube = await getById(id);
    if(!req.user || cube.owner != req.user._id){
        return res.redirect('/auth/login');
    }
    res.render('delete', {
        title: 'Delete Cube',
        cube
    });
});

cubeController.post('/:id/delete', async (req, res) => {
    const id = req.params.id;
    const cube = await getById(id);
    if(!req.user || cube.owner != req.user._id){
        return res.redirect('/auth/login');
    }
    try {
        await deleteCubeById(id);
        res.redirect('/');
    } catch (error) {
        req.body._id = id;
        res.render('delete', {
            title: 'Request Error',
            cube: req.body
        });
    }
});

module.exports = cubeController;