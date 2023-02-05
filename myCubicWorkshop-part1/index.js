const express = require('express');
const hbs = require('express-handlebars').create({extname: '.hbs'});

const port = 3000;
const homeController = require('./controllers/homeController');
const createController = require('./controllers/createController');
const detailsController = require('./controllers/detailsController');
const defaultController = require('./controllers/defaultController');

const app = express();
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('static'));

app.use(homeController);
app.use('/create', createController);
app.use('/details', detailsController);
app.all('*', defaultController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});