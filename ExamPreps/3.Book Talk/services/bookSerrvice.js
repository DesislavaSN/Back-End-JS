// all CRUD operations regarding hotel - create, display all + details of one, edit, delete:

const { findById } = require("../models/Book");
const Book = require("../models/Book");

async function getAll(){
    return await Book.find({}).lean();
}

async function getById(id){
    return await Book.findById(id).lean();
} 

async function createBook(book) {
    return await Book.create(book);
}

async function update(id, book) {
    const existing = await Book.findById(id);

    existing.title = book.title;
    existing.author = book.author;
    existing.imageUrl = book.imageUrl;
    existing.review = book.review;
    existing.genre = book.genre;
    existing.stars = book.stars;

    await existing.save();
}

async function deleteById (id) {
    await Book.findByIdAndRemove(id);
}

async function addToWishList(bookId, userId){
    const book = await Book.findById(bookId);

    if (book.wishList.includes(userId)) {
        throw new Error('You already added the book to your wish list ');
    }

    book.wishList.push(userId);
    await book.save();
}

async function getByWishList(userId) {
    return (await Book.find({wishList: userId}).lean());
}


module.exports = {
    getAll,
    getById,
    createBook,
    update,
    deleteById,
    addToWishList,
    getByWishList
}