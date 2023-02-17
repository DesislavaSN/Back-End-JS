// registration and login user:

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtSecret = 'mySecret';

// --------- REGISTER ---------
async function register(username, password, address) {
    const existing = await User.findOne({username}).collation({locale: 'en', strength: 2});
    if (existing) {
        throw new Error('Username is taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        hashedPassword,
        address
    });

    // TODO see assignment if registration creates user session:
    const token = createSession(user);
    return token;
}

// --------- LOGIN ---------
async function login(username, password) {
    const user = await User.findOne({username}).collation({locale: 'en', strength: 2});
    if (!user) {
        throw new Error('Incorrect username or password');
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
    if (hasMatch == false ) {
        throw new Error('Incorrect username or password');
    }

    const token = createSession(user);
    return token;
}

// --------- CREATE SESSION ---------
function createSession({_id, username, address}) {
    const payload = {
        _id,
        username,
        address
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
