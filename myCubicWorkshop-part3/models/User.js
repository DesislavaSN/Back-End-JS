const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true },
    hashedPass: {type: String, required: true},
    roles: {type: [{type: String, enum: ['user', 'admin']}], default: ['user']}
});

userSchema.index({username: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;