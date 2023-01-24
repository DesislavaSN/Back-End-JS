const fs = require('fs');

const filenameCats = './models/cats.json';
const filenameBreeds = './models/breeds.json';
const catsData = JSON.parse(fs.readFileSync(filenameCats));
const breedsData = JSON.parse(fs.readFileSync(filenameBreeds));

async function persistCat(){
    return new Promise((res, rej) => {
        fs.writeFile(filenameCats, JSON.stringify(catsData, null, 2), (err) => {
            if(err == null){
                res();
            } else {
                rej(err);
            }
        });
    });
}

async function persistBreed(){
    return new Promise((res, rej) => {
        fs.writeFile(filenameBreeds, JSON.stringify(breedsData, null, 2), (err) => {
            if(err == null){
                res();
            } else {
                rej(err);
            }
        });
    });
}

function getAllCats() {
    return catsData; 
}

function getAllBreeds(){
    return breedsData;
}

function getById(id){
    return catsData.find(c => c.id == id);
}

async function createCat(catData){
    const newCat = {
        id: getRandomId(),
        imageUrl: catData.imageUrl,
        name: catData.name,
        breed: catData.breed,
        description: catData.description,
    }

    catsData.push(newCat);
    await persistCat();
    return newCat;
}

function editCat(catData){
    const editCat = {
        id: catData.id,
        imageUrl: catData.imageUrl,
        name: catData.name,
        breed: catData.breed,
        description: catData.description,
    }

    persistCat();
    return editCat;
}

function spliceCat(index, num, newData){
    return catsData.splice(index, num, newData);
}

async function createBreed(breedData){
    const newBreed = breedData.breed;

    breedsData.push(newBreed);
    await persistBreed();
    return newBreed;
}

function getRandomId(){
    return ('000000' + (Math.random() * 999999 | 0).toString(16)).slice(-5);
}

module.exports = {
    getAllCats,
    getAllBreeds,
    getById,
    createCat,
    createBreed,
    catsData,
    persistCat,
    editCat,
    spliceCat
}