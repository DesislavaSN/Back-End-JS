const { Schema, model, Types } = require('mongoose');

const urlRegex = /^https?:\/\/.+$/i;

const cryptoSchema = new Schema({
    name: {
        type: String, 
        required: true, 
        minLength: [2, 'Crypto name must be at least 2 chars long']
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
    price: {
        type: Number, 
        required: true, 
        min: [0.01, 'Price must be a positive number']
    }, 
    description: {
        type: String, 
        required: true,
        minLength: [10, 'Description must be at least 10 chars long']
    }, 
    payment: {
        type: String, 
        required: true, 
        enum: ['Crypto Wallet', 'Credit Card', 'Debit Card', 'PayPal']
    }, 
    buy: {type: [Types.ObjectId], ref: 'User', default: []}, 
    owner: {type: Types.ObjectId, ref: 'User', required: true}, 
    
});

const Crypto = model('Crypto', cryptoSchema);

module.exports = Crypto;


