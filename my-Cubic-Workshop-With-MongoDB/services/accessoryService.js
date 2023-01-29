const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

async function getAllAccessories(){
    return Accessory.find({}).lean();
}

async function createAccessory(accessoryData){
    const accessory = {
        name: accessoryData.name,
        description: accessoryData.description,
        imageUrl: accessoryData.imageUrl,
    }

    const result = Accessory.create(accessory);
    return result;
}

module.exports = {
    getAllAccessories,
    createAccessory
}