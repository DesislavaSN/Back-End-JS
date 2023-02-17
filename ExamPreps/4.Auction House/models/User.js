const { Schema, model } = require('mongoose');

const urlRegex = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/gmi;

const userSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: (value) => {
                return urlRegex.test(value);
            },
            message: (props) => {
                return `${props.value} is not a valid email. Only English letters are allowed for any of the parts of the email`
            }
        }
    },
    firstName: { 
        type: String, 
        required: true,
        minLength: [1, 'First name should be at least 1 character long']
    },
    lastName: { 
        type: String, 
        required: true, 
        minLength: [1, 'Last name should be at least 1 character long']
    },
    hashedPassword: { type: String, required: true}

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