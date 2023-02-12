const Cube = require('../models/Cube');

// get all cubes:
function getAll(search, from, to){
    return result = Cube.find({}).lean();
}

//get cube by id:
function getById(id){
    return Cube.findById(id).lean();
}

// create cube:
async function createCube(cubeData, ownerId){
    const cube = {
        name: cubeData.name,
        description: cubeData.description,
        imageUrl: cubeData.imageUrl,
        difficultyLevel: Number(cubeData.difficultyLevel),
        owner: ownerId
    }

    const result = await Cube.create(cube);
    return result;
}

// edit cube:
async function editCube(cubeId, cubeData){
    const cube = await Cube.findById(cubeId);

    cube.name = cubeData.name.trim();
    cube.description = cubeData.description.trim();
    cube.imageUrl = cubeData.imageUrl.trim();
    cube.difficultyLevel = Number(cubeData.difficultyLevel);

    await cube.save();
    return cube;
}

//delete cube:
async function deleteCubeById(cubeId){
    return await Cube.findByIdAndRemove(cubeId);
}

module.exports = {
    getAll,
    getById,
    createCube,
    editCube,
    deleteCubeById
}