const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        minLength: [4, 'Username must be at least 4 chars long']
    },
    hashedPassword: { type: String, required: true},
    address: {
        type: String, 
        required: true,
        max: [20, 'the Address must be max 40 chars long']
    },
    myPublications: [{
        type: Types.ObjectId, 
        ref: 'Publication',
    }]
});

userSchema.index({username: 1}, {
    unique: true,
    collation: {
        local: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);
module.exports = User;