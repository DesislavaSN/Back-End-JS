const mongoose = require('mongoose');

const connString = 'mongodb://127.0.0.1:27017/cubicle';
mongoose.set('strictQuery', false);

module.exports = async (app) => {
    try {
        await mongoose.connect(connString, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('~~ Database connected !');
    } catch (error) {
        console.error('Error initializing database.');
        console.error(error.mesage);
        process.exit(1);
    }
}