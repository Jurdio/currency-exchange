const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Currency = sequelize.define('currency', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sign: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Currency;