// all CRUD operations regarding hotel - create, display all + details of one, edit, delete:

const Auction = require("../models/Auction");
const User = require("../models/User");

async function getAll(){
    return await Auction.find({}).lean();
}

async function getById(id){
    return await Auction.findById(id).lean();
} 


async function createAuction(offer) {
    return await Auction.create(offer);
}

async function update(id, offer) {
    const existing = await Auction.findById(id);

    existing.title = offer.title;
    existing.description = offer.description;
    existing.category = offer.category;
    existing.imageUrl = offer.imageUrl;
    existing.price = offer.price;

    await existing.save();
}

async function deleteById (id) {
    await Auction.findByIdAndRemove(id);
}

async function getUserAuction(userId) {
    return await User.findById(userId).lean();
}

async function auctionBidder(itemId, userId, price) {
    const item = await Auction.findById(itemId);

    item.bidder.push(userId);
    item.price = price;
    item.save();
}

module.exports = {
    getAll,
    getById,
    createAuction,
    update,
    deleteById,
    getUserAuction,
    auctionBidder,

}