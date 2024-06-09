const router = require('express').Router();

const exchangeRateController = require('../controller/exchangeRate');

router.get('/exchangeRates', exchangeRateController.getExchangeRates);
router.post('/exchangeRates', exchangeRateController.postExchangeRates);
router.patch('/exchangeRate/:currencyPair', exchangeRateController.updateExchangeRate);

module.exports = router;