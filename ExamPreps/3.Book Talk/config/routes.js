const authController = require("../controllers/authController");
const bookController = require("../controllers/bookController");
const catalogController = require("../controllers/catalogController");
const homeController = require("../controllers/homeController");
const profuleController = require("../controllers/profileController");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/catalog', catalogController);
    app.use('/book', bookController);
    app.use('/profile', profuleController);
}