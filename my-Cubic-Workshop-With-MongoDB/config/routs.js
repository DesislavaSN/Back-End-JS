const homeController = require('../controllers/homeController');
const createController = require('../controllers/createController');
const detailsController = require('../controllers/detailsController');
const createAccessoryController = require('../controllers/createAccessoryController');
const attachAccessoryController = require('../controllers/attachAccessoryController');
const defaultController = require('../controllers/defaultController');

module.exports = (app) => {
    app.use(homeController);
    app.use('/create', createController);
    app.use('/create', createAccessoryController);
    app.use('/details', detailsController);
    app.use('/attach', attachAccessoryController);
    app.all('*', defaultController);
}