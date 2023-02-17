// all CRUD operations regarding hotel - create, display all + details of one, edit, delete:

const Publication = require("../models/Publication");
const User = require("../models/User");

async function getAll(){
    return await Publication.find({}).lean();
}

async function getById(id){
    return await Publication.findById(id).lean();
} 


async function createPublication(publication) {
    return await Publication.create(publication);
}

async function update(id, publication) {
    const existing = await Publication.findById(id);

    existing.title = publication.title;
    existing.technique = publication.technique;
    existing.imageUrl = publication.imageUrl;
    existing.certificate = publication.certificate;

    await existing.save();
}

async function deleteById (id) {
    await Publication.findByIdAndRemove(id);
}

async function getByCreateUser(userId){
    return await User.find(userId).lean();
}

async function getSharedArts(pubId, userId){
    const pub = await Publication.findById(pubId);
    const user = await User.findById(userId);

    pub.userShares.push(userId);
    user.myPublications.push(pubId);
    pub.save();
    user.save();
}


module.exports = {
    getAll,
    getById,
    createPublication,
    update,
    deleteById,
    getByCreateUser,
    getSharedArts,
    
}


// async function bookRoom(hotelId, userId){
//     const hotel = await Hotel.findById(hotelId);

//     if (hotel.bookings.includes(userId)) {
//         throw new Error('Cannot book twice');
//     }
    
//     hotel.bookings.push(userId);
//     hotel.rooms--;
//     await hotel.save();
// }