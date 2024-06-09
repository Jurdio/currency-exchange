const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const ExchangeRate = sequelize.define('exchangeRate', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    baseCurrencyId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    targetCurrencyId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    rate: {
        type: Sequelize.DECIMAL(10, 6),
        allowNull: false
    }
});
module.exports = ExchangeRate;