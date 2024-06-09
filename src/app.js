const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');

const sequelize = require('./util/database');
const currencyRoutes = require('./router/currency');
const exchangeRateRoutes = require('./router/exchangeRate');

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
});

app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', currencyRoutes);

app.use('/api', exchangeRateRoutes);

/**
 * @swagger
 * /currencies:
 *   get:
 *     summary: Retrieve a list of currencies
 *     responses:
 *       200:
 *         description: A list of currencies.
 */
app.get('/currencies', (req, res, next) => { 
    res.json({ message: 'Currencies' });
   }
);

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