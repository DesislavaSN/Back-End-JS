// registration and login user:

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtSecret = 'mySecret';

// --------- REGISTER ---------
async function register(email, username, password) {
    const existingEmail = await User.findOne({email}).collation({locale: 'en', strength: 2});
    if (existingEmail) {
        throw new Error('Email is taken');
    }

    const existingUsername = await User.findOne({username}).collation({locale: 'en', strength: 2});
    if (existingUsername) {
        throw new Error('Username is taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        username,
        hashedPassword
    });

    // TODO see assignment if registration creates user session:
    const token = createSession(user);
    return token;
}

// --------- LOGIN ---------
async function login(email, password) {
    const user = await User.findOne({email}).collation({locale: 'en', strength: 2});
    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
    if (hasMatch == false ) {
        throw new Error('Incorrect email or password');
    }

    const token = createSession(user);
    return token;
}

// --------- CREATE SESSION ---------
function createSession({_id, email, username}) {
    const payload = {
        _id,
        email,
        username
    };
    const token = jwt.sign(payload, jwtSecret);
    return token;
}

// --------- VERIFY TOKEN ---------
function verifyToken(token){
    return jwt.verify(token, jwtSecret);
}


module.exports = {
    register,
    login,
    verifyToken,

}
