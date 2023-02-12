const Crypto = require("../models/Crypto");

async function searchCrypto(name, payment){
    let coin = await Crypto.find({name: {$regex: new RegExp(name, 'i')}}).lean();
    coin = coin.filter(c => c.payment == payment);
    return coin;
}

module.exports = searchCrypto;