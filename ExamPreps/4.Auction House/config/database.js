const mongoose = require('mongoose');

// TODO change database according to assignment
const connString = 'mongodb://127.0.0.1:27017/auction-house';
mongoose.set('strictQuery', false);

module.exports = async (app) => {
    try {
        await mongoose.connect(connString, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('~~ Database connected!');
        
    } catch (error) {
        console.error('Error initialization database');
        console.error(error.message);
        process.exit(1);
    }
}