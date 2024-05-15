const { Sequelize } = require("sequelize");
const dotenv = require('dotenv').config();

const sequelize = new Sequelize(process.env.DB, process.env.NAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: false,
    dialectOptions: {
        ssl: {
          require: true,
          ca: process.env.CA,
        }
      }
  });

module.exports = sequelize;