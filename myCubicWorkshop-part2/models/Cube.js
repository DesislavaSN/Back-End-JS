const { Schema, model, Types } = require('mongoose');

const cubeSchema = new Schema ({
    name: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String},
    difficultyLevel: {type: Number, required: true, min: 1, max: 6},
    accessories: {type: [Types.ObjectId], default: [], ref: 'Accessory'}
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;