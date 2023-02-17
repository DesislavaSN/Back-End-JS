const { Schema, model, Types } = require('mongoose');

const urlRegex = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/gmi;

const userSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [
            urlRegex, 'Ivalid Email, only English letters are allowed for any of the parts of the email'
        ]
    },

    hashedPassword: { type: String, required: true},
    skills: {
        type: String, 
        required: true, 
        maxLength: [40, 'Deskription skills must be at max 40 chars long']
    },
    myAdds: [{type: Types.ObjectId, ref: 'Ad'}]
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