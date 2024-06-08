const path = require('path');

const express = require('express');
const bodeParser = require('body-parser');

const sequelize = require('./util/database');

const app = express();

app.use(bodeParser.json());

sequelize
    .sync()
    .then(result => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.log(err);
    });

