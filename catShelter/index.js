const express = require('express');
const hbs = require('express-handlebars').create({extname:'.hbs'});

const port = 3000;
const homeCtroller = require('./controllers/homeController');
const addCatController = require('./controllers/addCatController');
const addBreedController = require('./controllers/addBreedController');
const catShelterController = require('./controllers/catShelterController');
const editCatController = require('./controllers/editCatController');

const app = express();
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('static'));

app.use(homeCtroller);
app.use('/addCat', addCatController);
app.use('/addBreed', addBreedController);
app.use('/deleteCat', catShelterController);
app.use('/editCat', editCatController);


app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});