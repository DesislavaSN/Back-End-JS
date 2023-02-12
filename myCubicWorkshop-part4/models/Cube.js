const { Schema, model, Types } = require('mongoose');

const URL_REGEX = /^https?:\/\/.*$/gmi;

const cubeSchema = new Schema ({
    name: {type: String, required: true, minLength: [
        5, 'Cube Name must be at least 5 characters long and only English letters and Digits are allowed'
    ]},
    description: {type: String, required: true, minLength: [
        20, 'The Description must be at least 20 characters long and only English letters and Digits are allowed'
    ]},
    imageUrl: {
        type: String,
        validate: {
            validator:(value) => {
                return URL_REGEX.test(value);
            },
            message: (props) => {
                return `${props.value} is not a valid image URL`
            }
        }
    },
    difficultyLevel: {type: Number, required: true, min: 1, max: 6},
    accessories: {type: [Types.ObjectId], default: [], ref: 'Accessory'},
    owner: { type: Types.ObjectId, ref: 'User', required: true }
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;