const Publication = require("../models/Publication");

async function getSharedPosts(userId){
    return await Publication.find({ userShares: userId }).lean();
}

async function getOwnerPosts(userId){
    return await Publication.find({owner: userId}).lean();
}

module.exports = {
    getSharedPosts,
    getOwnerPosts,
}