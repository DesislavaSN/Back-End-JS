const { Schema, model, Types } = require('mongoose');
const URL_REGEX = /^https?:\/\/.*$/gmi;

const accessorySchema = new Schema ({
    name: {type: String, required: true, minLength: [
        5, 'Accessory Name must be at least 5 characters long and only English letters and Digits are allowed'
    ]},
    imageUrl: {
        type: String,
        validate: {
            validator:(value) => {
                return URL_REGEX.test(value);
            },
            message: (props) => {
                return `The image URL ${props.value} is invalid`
            }
        }
    },
    description: {type: String, required: true, minLength: [
        20, 'Description must be at least 20 characters long and only English letters and Digits are allowed'
    ]},
    cubes: {type: [Types.ObjectId], default: [], ref: 'Cube'}
});

const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;