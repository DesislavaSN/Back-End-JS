const homeController = require('../controllers/homeController');
const createController = require('../controllers/createController');
const detailsController = require('../controllers/detailsController');
const createAccessoryController = require('../controllers/createAccessoryController');
const attachAccessoryController = require('../controllers/attachAccessoryController');
const authController = require('../controllers/authController');
const cubeController = require('../controllers/cubeController');
const defaultController = require('../controllers/defaultController');
const { hasUser } = require('../middlewares/guards');

module.exports = (app) => {
    app.use(homeController);
    app.use('/create', hasUser(), createController);
    app.use('/create', hasUser(), createAccessoryController);
    app.use('/details', detailsController);
    app.use('/attach', attachAccessoryController);
    app.use('/auth', authController);
    app.use('/cube', cubeController);
    app.all('*', defaultController);
}