const Crypto = require('../models/Crypto');

async function getAll(){
    return await Crypto.find({}).lean();
}

async function getById(id){
    return await Crypto.findById(id).lean();
}

async function createCrypto(coin){
    return await Crypto.create(coin);
}

async function buyCrypto(coinId, userId){
    const coin = await Crypto.findById(coinId);

    if (coin.buy.includes(userId)) {
        throw new Error('You already bought these crypto coins.');
    }

    coin.buy.push(userId);
    coin.save();
}

async function update(id, coin){
    const existing = await Crypto.findById(id);

    existing.name = coin.name;
    existing.imageUrl = coin.imageUrl;
    existing.price = coin.price;
    existing.description = coin.description;
    existing.payment = coin.payment;

    await existing.save();
}

async function deleteById(id){
    return await Crypto.findByIdAndRemove(id);
}


module.exports = {
    getAll,
    getById,
    createCrypto,
    update,
    deleteById,
    buyCrypto
}