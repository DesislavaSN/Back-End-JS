const Cube = require('../models/Cube');

function getAll(search, from, to){
    return result = Cube.find({}).lean();
}

function getById(id){
    return Cube.findById(id).lean();
}

async function createCube(cubeData){
    const cube = {
        name: cubeData.name,
        description: cubeData.description,
        imageUrl: cubeData.imageUrl,
        difficultyLevel: Number(cubeData.difficultyLevel)
    }

    const result = await Cube.create(cube);
    return result;
}

module.exports = {
    getAll,
    getById,
    createCube,
}