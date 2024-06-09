const Currency = require('../model/currency');

exports.getCurrencies = (req, res, next) => {
    Currency.findAll()
        .then(currencies => {
            res.status(200).json({
                message: 'Fetched currencies successfully',
                currencies: currencies
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Database error' });
        });
};
exports.postCurrencies = (req, res, next) => {
    const { code, name, sign } = req.body;

    if (!code || !name || !sign) {
        return res.status(400).json({ message: 'Code, name and sign are required' });
    }

    Currency.findOne({ where: { code } })
        .then(existingCurrency => {
            if (existingCurrency) {
                return res.status(409).json({ message: 'Currency with this code already exists' });
            }

            return Currency.create({ code, name, sign });
        })
        .then(newCurrency => {
            res.status(201).json({
                message: 'Currency created successfully',
                currency: newCurrency
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Database error' });
        });
};
exports.getCurrencyByCode = (req, res, next) => {
    const code = req.params.code;

    Currency.findOne({ where: { code } })
        .then(currency => {
            if (!currency) {
                return res.status(404).json({ message: 'Currency not found' });
            }

            res.status(200).json({
                message: 'Fetched currency successfully',
                currency: currency
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Database error' });
        });
};
