const { Schema, model, Types } = require('mongoose');

const urlRegex = /^(https?:\/)?\/.+$/i;

const bookSchema = new Schema({
    title: { 
        type: String, 
        required: true, 
        unique: true,
        minLength: [2, 'Book Title must be at least 2 chars long']
    },
    author: { 
        type: String, 
        required: true,
        minLength: [5, 'Book Author must be at least 5 chars long']

    },
    imageUrl: { 
        type: String, 
        required: true,
        validate: {
            validator: (value) => {
                return urlRegex.test(value);
            },
            message: (props) => {
                return `${props.value} is not a valid image URL`
            }
        }
    },
    review: { 
        type: String, 
        required: true, 
        minLength: [10, 'Book Review must be at least 10 chars long']
    },
    genre: {
        type: String, 
        required: true,
        minLength: [3, 'Book Genre must be at least 3 chars long']
    },
    stars: {
        type: Number, 
        required: true, 
        minLength: [1, 'Rooms must be between 1 and 5'],
        maxLenght: [5, 'Rooms must be between 1 and 5'],
        validate: {
            validator: (value) => {
                return value > 0;
            },
            message: (props) => {
                return `${props.value} must be a positive number`
            }
        }
    },
    wishList: { type: [Types.ObjectId], ref: 'User', default: [] },
    owner: { type: Types.ObjectId, ref: 'User', required: true }
});

bookSchema.index({title: 1}, {
    unique: true,
    collation: {
        local: 'en',
        strength: 2
    }
});

const Book = model('Book', bookSchema);

module.exports = Book;