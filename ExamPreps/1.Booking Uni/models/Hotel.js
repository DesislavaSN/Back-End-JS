const { Schema, model, Types } = require('mongoose');

const urlRegex = /^https?:\/\/.+$/i;

const hotelSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true,
        minLength: [4, 'Hotel name must be at least 4 chars long']
    },
    city: { 
        type: String, 
        required: true,
        minLength: [3, 'Hotel name must be at least 3 chars long'] 
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
    rooms: { 
        type: Number, 
        required: true, 
        minLength: [1, 'Rooms must be between 1 and 100'],
        maxLenght: [100, 'Rooms must be between 1 and 100'] 
    },
    bookings: { type: [Types.ObjectId], ref: 'User', default: [] },
    owner: { type: Types.ObjectId, ref: 'User', required: true }
});

hotelSchema.index({name: 1}, {
    unique: true,
    collation: {
        local: 'en',
        strength: 2
    }
});

const Hotel = model('Hotel', hotelSchema);

module.exports = Hotel;