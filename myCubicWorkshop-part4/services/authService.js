const bcrypt = require('bcrypt');
const User = require('../models/User');

// ---------- REGISTER: 
async function register(username, password){
    try {
        const existingUser = await User.findOne({username: {$regex: new RegExp(username), $options: 'i'}});
        if (existingUser) {
            throw new Error('Username is taken!');
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            hashedPass
        });

        console.log('Registered user:', user.username);
        return {
            username,
            hashedPass
        }

        // console.log('autService.js - created user: ', user);
    } catch (error) {
        console.error(error);
    }
}

// ---------- LOGIN: 
async function login(username, password) {

    const existingUser = await User.findOne({username: {$regex: new RegExp(username), $options: 'i'}});
    if (!existingUser) {
        throw new Error('Incorrect username or password!');
    }

    const matchPass = await bcrypt.compare(password, existingUser.hashedPass);
    if (!matchPass) {
        throw new Error('Incorrect username or password!');
    }

    console.log('(authService.js file) Loged user: ', existingUser);
    return {
        '_id': existingUser._id,
        username: existingUser.username,
        roles: existingUser.roles
    }
}

module.exports = {
    register,
    login
}
