const Sequelize = require('sequelize');

let db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/boilerplate', { logging: false })

module.exports = db;
