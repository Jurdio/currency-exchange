const router = require('express').Router();

const exchangeRateController = require('../controller/exchangeRate');

router.get('/exchangeRates', exchangeRateController.getExchangeRates);
router.post('/exchangeRates', exchangeRateController.postExchangeRates);
router.get('/exchangeRate/:currencyPair', exchangeRateController.getExchangeRatesByCodes);

module.exports = router;