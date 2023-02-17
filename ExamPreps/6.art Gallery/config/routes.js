const authController = require("../controllers/authController");
const catalogController = require("../controllers/catalogController");
const errorController = require("../controllers/errorController");
const homeController = require("../controllers/homeController");
const galleryController = require("../controllers/galleryController");
const profileController = require("../controllers/profilecontroller");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/catalog', catalogController);
    app.use('/gallery', galleryController);
    app.use('/profile', profileController);
    
    app.all('*', errorController);
}
