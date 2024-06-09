const router = require('express').Router();;
const currencyController = require('../controller/currency');

router.get('/currencies', currencyController.getCurrencies);

router.post('/currencies', currencyController.postCurrencies);

router.get('/currency/:code', currencyController.getCurrencyByCode);

module.exports = router;