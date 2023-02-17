const adController = require("../controllers/adController");
const authController = require("../controllers/authController");
const catalogController = require("../controllers/catalogController");
const errorController = require("../controllers/errorController");
const homeController = require("../controllers/homeController");
const searchController = require("../controllers/searchController");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/catalog', catalogController);
    app.use('/ad', adController);
    app.use('/search', searchController);
    app.all('*',errorController);
}