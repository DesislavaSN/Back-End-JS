// all CRUD operations regarding hotel - create, display all + details of one, edit, delete:

const Ad = require("../models/Ad");
const User = require("../models/User");

async function getAll(){
    return await Ad.find({}).lean();
}

async function getById(id){
    return await Ad.findById(id).lean();
} 

async function createAd(ad) {
    return await Ad.create(ad);
}

async function update(id, ad) {
    const existing = await Ad.findById(id);

    existing.headline = ad.headline;
    existing.location = ad.location;
    existing.companyName = ad.companyName;
    existing.description = ad.description;

    await existing.save();
}

async function deleteById (id) {
    await Ad.findByIdAndRemove(id);
}

async function getByCreateUser(userId){
    return await User.find(userId).lean();
}

async function getAppliedUsers(userId){
    return await User.find({_id: userId}).lean();
}

async function getAppliedJobs(adId, userId) {
    const ad = await Ad.findById(adId);
    const user = await User.findById(userId);

    ad.applied.push(userId);
    user.myAdds.push(adId);
    ad.save();
    user.save();

}

module.exports = {
    getAll,
    getById,
    createAd,
    update,
    deleteById,
    getByCreateUser,
    getAppliedUsers,
    getAppliedJobs
}