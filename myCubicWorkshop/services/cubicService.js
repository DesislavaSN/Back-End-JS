const fs = require('fs');

const filename = './models/data.json';
const data = JSON.parse(fs.readFileSync(filename));

async function persist(){
    return new Promise((res, rej) => {
        fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
            if (err == null) {
                res();
            } else {
                rej(err);
            }
        });
    });
}

function getAll(search, from, to){
    if (search || from || to) {
        return data.filter(c => c.name.toLowerCase().includes(search));
        // .filter(c => c.difficultyLevel >= from && c.difficultyLevel <= to);
    } else {
        return data;
    }
}

function getById(id){
    return data.find(c => c.id == id);
}

async function createCube(cubeData){
    const cube = {
        id: getRandomId(),
        name: cubeData.name,
        description: cubeData.description,
        imageUrl: cubeData.imageUrl,
        difficultyLevel: cubeData.difficultyLevel
    }

    data.push(cube);
    await persist();
    return cube;
}

function getRandomId(){
    return ('000000' + (Math.random() * 999999 | 0).toString(16)).slice(-5);
}

module.exports = {
    getAll,
    getById,
    createCube,
    getRandomId
}