const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('marko/node-require').install();
require('marko/express');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/estatico",express.static('src/app/public'))

const rotas = require('../app/rotas/rotas');
rotas(app);

module.exports = app;