const { Schema, model, Types } = require('mongoose');

const addSchema = new Schema({
    headline: { 
        type: String, 
        required: true, 
        minLength: [4, 'Headline must be at least 4 chars long']
    },
    location: { 
        type: String, 
        required: true,
        minLength: [8, 'Location must be at least 8 chars long'] 
    },
    companyName: { 
        type: String, 
        required: true,
        minLength: [3, 'Company Name must be at least 3 chars long']
    },
    description: { 
        type: String, 
        required: true, 
        maxLenght: [40, 'Company description must be between 1 and 40 chars long'] 
    },
    owner: { type: Types.ObjectId, ref: 'User', required: true },
    applied: { type: [Types.ObjectId], ref: 'User', default: [] }
});


const Ad = model('Ad', addSchema);

module.exports = Ad;