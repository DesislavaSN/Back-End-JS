const { createBook, getById, update, deleteById, addToWishList } = require('../services/bookSerrvice');
const { parseError } = require('../utils/parser');

const bookController = require('express').Router();


// --------- BOOK DETAILS: ------------------
bookController.get('/:id/details', async (req, res) => {
    const id = req.params.id;
    const book = await getById(id);

    book.isOwner = req.user && book.owner == req.user._id ? true : false;
    book.wishedBook = req.user && book.wishList.map(w => w.toString()).includes(req.user._id.toString()) ? true : false;

    res.render('details', { book });
});


// --------- CREATE BOOK: ------------------
bookController.get('/create', (req, res) => {
    res.render('create');
});

bookController.post('/create', async (req, res) => {
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        stars: Number(req.body.stars),
        imageUrl: req.body.imageUrl,
        review: req.body.review,
        owner: req.user._id
    }
    // console.log(book);

    try {
        if (Object.values(book).some(v => !v)) {
            throw new Error('All fields are required');
        }
        const result = await createBook(book);
        res.redirect('/catalog');
    } catch (error) {
        res.render('create', {
            body: book,
            errors: parseError(error)
        });
    }
});


// --------- EDIT BOOK: ------------------
bookController.get('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const book = await getById(id);

    if (book.owner != req.user._id) {
        res.redirect('/auth/login');
    }
    res.render('edit', { book });
});

bookController.post('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const book = await getById(id);

    if (book.owner != req.user._id) {
        res.redirect('/auth/login');
    }

    const edited = {
        title: req.body.title,
        author: req.body.author,
        imageUrl: req.body.imageUrl,
        review: req.body.review,
        genre: req.body.genre,
        stars: Number(req.body.stars),
    }
    // console.log(edited);

    try {
        if (Object.values(edited).some(v => !v)) {
            throw new Error('All fields are required!');
        }
        const result = await update(id, edited);
        res.redirect(`/book/${id}/details`);
    } catch (error) {
        console.log(error);
        res.render('edit', {
            book: Object.assign(edited, {_id: id}),
            errors: parseError(error),
        });
    }
});


// --------- DELETE BOOK: ------------------
bookController.get('/:id/delete', async (req, res) => {
    const id = req.params.id;
    const book = await getById(id);

    if (book.owner != req.user._id) {
        res.redirect('/auth/login');
    }

    await deleteById(id);
    res.redirect('/catalog');

});

// --------- ADD BOOK TO WISH LIST: ------------------
bookController.get('/:id/wishList', async (req, res) => {
    const id = req.params.id;
    const book = await getById(id);

    try {
        if (book.owner == req.user._id) {
            book.isOwner = true;
            throw new Error('You cannot add your book to the wish list');
        }
    
        if (book.wishList.map(w => w.toString()).includes(req.user._id.toString())) {
            book.wishedBook = true;
            throw new Error('You already added the book to your wish list');
        }
    
        await addToWishList(id, req.user._id);
        res.redirect(`/book/${id}/details`);
    } catch (error) {
        res.render('details' , {
            book,
            errors: parseError(error)
        });
    }
});



module.exports = bookController;
