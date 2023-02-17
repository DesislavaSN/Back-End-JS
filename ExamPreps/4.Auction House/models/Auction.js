const { Schema, model, Types } = require('mongoose');


const auctionSchema = new Schema({
    title: { 
        type: String, 
        required: true,
        minLength: [4, 'The title should be a minimum of 4 characters long']
    },
    description: {
        type: String,
        maxLength: [200, 'The description should be a maximum of 200 characters long']
    },
    category: { 
        type: String, 
        required: true,
        enum: ['Vehicles', 'Real Estate', 'Electronics', 'Furniture', 'Other']
    },
    imageUrl: {type: String},
    price: {
        type: Number, 
        required: true,
        min: [0.01, 'The price cannot be negative']
    },
    bidder: {
        type: [Types.ObjectId], 
        ref: 'User', 
        default: [] 
    },
    owner: { 
        type: [Types.ObjectId], 
        required: [true, 'Author is required'],  
        ref: 'User', 
        default: [],
    }
});

const Auction = model('Auction', auctionSchema);

module.exports = Auction;