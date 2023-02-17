const Ad = require("../models/Ad");
const User = require("../models/User");

async function searchJob(search){
    const user = await User.find({
        email: {$regex: new RegExp(search, 'i')}
    });
    return user;
}

async function neddedInfo(userId){
    return await Ad.find({ owner: userId}).lean();
}

module.exports = {
    searchJob,
    neddedInfo
}