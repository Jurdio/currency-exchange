const ExchangeRate = require('../model/exchangeRate');
const Currency = require('../model/currency');


exports.getExchangeRates = (req, res, next) => {
    ExchangeRate.findAll()
        .then(exchangeRates => {
            res.status(200).json({
                message: 'Fetched exchange rates successfully',
                exchangeRates: exchangeRates
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Database error' });
        });
};
exports.postExchangeRates = (req, res, next) => {
    const { baseCurrencyCode, targetCurrencyCode, rate } = req.body;

    if (!baseCurrencyCode || !targetCurrencyCode || !rate) {
        return res.status(400).json({ message: 'Base currency, target currency and rate are required' });
    }

    Currency.findOne({ where: { code: baseCurrencyCode } })
        .then(baseCurrency => {
            if (!baseCurrency) {
                return res.status(404).json({ message: 'Base currency not found' });
            }

            return Currency.findOne({ where: { code: targetCurrencyCode } })
                .then(targetCurrency => {
                    if (!targetCurrency) {
                        return res.status(404).json({ message: 'Target currency not found' });
                    }

                    return ExchangeRate.findOne({ where: { baseCurrencyId: baseCurrency.id, targetCurrencyId: targetCurrency.id } })
                        .then(existingExchangeRate => {
                            if (existingExchangeRate) {
                                return res.status(409).json({ message: 'Exchange rate already exists' });
                            }

                            return ExchangeRate.create({ baseCurrencyId: baseCurrency.id, targetCurrencyId: targetCurrency.id, rate })
                                .then(newExchangeRate => {
                                    res.status(201).json({
                                        message: 'Exchange rate created successfully',
                                        exchangeRate: newExchangeRate
                                    });
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({ message: 'Database error' });
                                });
                        });
                });
        });
};
exports.getExchangeRatesByCodes = (req, res, next) => {
    const currencyPair = req.params.currencyPair;
    const baseCurrencyCode = currencyPair.slice(0, 3);
    const targetCurrencyCode = currencyPair.slice(3);

    if (!baseCurrencyCode || !targetCurrencyCode) {
        return res.status(400).json({ message: 'Currency codes are required' });
    }

    Currency.findOne({ where: { code: baseCurrencyCode } })
        .then(baseCurrency => {
            if (!baseCurrency) {
                return res.status(404).json({ message: 'Base currency not found' });
            }

            return Currency.findOne({ where: { code: targetCurrencyCode } })
                .then(targetCurrency => {
                    if (!targetCurrency) {
                        return res.status(404).json({ message: 'Target currency not found' });
                    }

                    return ExchangeRate.findOne({ where: { baseCurrencyId: baseCurrency.id, targetCurrencyId: targetCurrency.id } })
                        .then(exchangeRate => {
                            if (!exchangeRate) {
                                return res.status(404).json({ message: 'Exchange rate not found' });
                            }

                            res.status(200).json({
                                id: exchangeRate.id,
                                baseCurrency: {
                                    id: baseCurrency.id,
                                    name: baseCurrency.name,
                                    code: baseCurrency.code,
                                    sign: baseCurrency.sign
                                },
                                targetCurrency: {
                                    id: targetCurrency.id,
                                    name: targetCurrency.name,
                                    code: targetCurrency.code,
                                    sign: targetCurrency.sign
                                },
                                rate: exchangeRate.rate
                            });
                        });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Database error' });
        });
};
exports.updateExchangeRate = (req, res, next) => {
    const currencyPair = req.params.currencyPair;
    const baseCurrencyCode = currencyPair.slice(0, 3);
    const targetCurrencyCode = currencyPair.slice(3);
    const rate = req.body.rate;

    if (!rate) {
        return res.status(400).json({ message: 'Rate is required' });
    }

    Currency.findOne({ where: { code: baseCurrencyCode } })
        .then(baseCurrency => {
            if (!baseCurrency) {
                return res.status(404).json({ message: 'Base currency not found' });
            }

            return Currency.findOne({ where: { code: targetCurrencyCode } })
                .then(targetCurrency => {
                    if (!targetCurrency) {
                        return res.status(404).json({ message: 'Target currency not found' });
                    }

                    return ExchangeRate.findOne({ where: { baseCurrencyId: baseCurrency.id, targetCurrencyId: targetCurrency.id } })
                        .then(exchangeRate => {
                            if (!exchangeRate) {
                                return res.status(404).json({ message: 'Exchange rate not found' });
                            }

                            exchangeRate.rate = rate;
                            return exchangeRate.save();
                        })
                        .then(updatedExchangeRate => {
                            res.status(200).json({
                                message: 'Exchange rate updated successfully',
                                exchangeRate: updatedExchangeRate
                            });
                        });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Database error' });
        });
};
exports.getExchange = (req, res, next) => {
    const from = req.query.from;
    const to = req.query.to;
    const amount = Number(req.query.amount);

    Currency.findOne({ where: { code: from }})
        .then(baseCurrency => {
            return Currency.findOne({ where: { code: to }})
                .then(targetCurrency => {
                    return [baseCurrency, targetCurrency];
                });
        })
        .then(([baseCurrency, targetCurrency]) => {
            return ExchangeRate.findOne({ where: { baseCurrencyId: baseCurrency.id, targetCurrencyId: targetCurrency.id }})
                .then(exchangeRate => {
                    if (exchangeRate) {
                        return [baseCurrency, targetCurrency, exchangeRate];
                    } else {
                        return ExchangeRate.findOne({ where: { baseCurrencyId: targetCurrency.id, targetCurrencyId: baseCurrency.id }})
                            .then(exchangeRate => {
                                if (exchangeRate) {
                                    return [baseCurrency, targetCurrency, { rate: 1 / exchangeRate.rate }];
                                } else {
                                    return Promise.all([
                                        ExchangeRate.findOne({ where: { baseCurrencyId: 'USD', targetCurrencyId: baseCurrency.id }}),
                                        ExchangeRate.findOne({ where: { baseCurrencyId: 'USD', targetCurrencyId: targetCurrency.id }})
                                    ]).then(([usdBaseExchangeRate, usdTargetExchangeRate]) => {
                                        return [baseCurrency, targetCurrency, { rate: usdTargetExchangeRate.rate / usdBaseExchangeRate.rate }];
                                    });
                                }
                            });
                    }
                });
        })
        .then(([baseCurrency, targetCurrency, exchangeRate]) => {
            const convertedAmount = amount * exchangeRate.rate;

            res.json({
                baseCurrency: {
                    id: baseCurrency.id,
                    name: baseCurrency.name,
                    code: baseCurrency.code,
                    sign: baseCurrency.sign
                },
                targetCurrency: {
                    id: targetCurrency.id,
                    name: targetCurrency.name,
                    code: targetCurrency.code,
                    sign: targetCurrency.sign
                },
                rate: exchangeRate.rate,
                amount,
                convertedAmount
            });
        })
        .catch(error => {
                next(error);
        });
};