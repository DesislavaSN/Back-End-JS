const express = require('express');
const expressConfig = require('./config/express');
const routsConfig = require('./config/routs');
const databeseConfig = require('./config/database');

const port = 3000;

async function start(){
    const app = express();
    await databeseConfig(app);
    expressConfig(app);
    routsConfig(app);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
start();


