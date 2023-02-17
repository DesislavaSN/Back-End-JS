const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        minLength: [4, 'Username must be at least 4 chars long']
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        minLength: [10, 'Email must be at least 10 chars long']
    },
    hashedPassword: { type: String, required: true}

});

userSchema.index({username: 1}, {
    unique: true,
    collation: {
        local: 'en',
        strength: 2
    }
});

userSchema.index({email: 1}, {
    unique: true,
    collation: {
        local: 'en',
        strength: 2
    }
});


const User = model('User', userSchema);

module.exports = User;