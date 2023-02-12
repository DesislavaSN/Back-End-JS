const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {type: String, 
        required: true, 
        unique: true, 
    },

    username: { 
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9]+$/i,'Username must containe only english letters and digits'] 
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