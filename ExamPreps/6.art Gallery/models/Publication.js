const { Schema, model, Types } = require('mongoose');

const urlRegex = /^(https?:\/)?\/.+$/i;

const publicationSchema = new Schema({
    title: { 
        type: String, 
        required: true, 
        minLength: [4, 'Title must be at least 4 chars long']
    },
    technique: { 
        type: String, 
        required: true,
        max: [15, 'Painting technique must be max 15 chars long'] 
    },
    imageUrl: { 
        type: String, 
        required: true,
        validate: {
            validator: (value) => {
                return urlRegex.test(value);
            },
            message: (props) => {
                return `${props.value} is not a valid image URL. The Art picture should starts with http:// or https:// or /`;
            }
        }
    },
    certificate: { 
        type: String, 
        required: true, 
        enum: {
            values:['Yes', 'No'],
            message: 'The Certificate of authenticity there must be value "Yes" or "No".'
        }    
    },
    owner: { type: Types.ObjectId, ref: 'User', required: true },
    userShares: { type: [Types.ObjectId], ref: 'User', default: [] }
});

const Publication = model('Publication', publicationSchema);
module.exports = Publication;