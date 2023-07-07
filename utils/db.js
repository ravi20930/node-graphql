require("dotenv").config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, // Replace with the host of your PostgreSQL database
  port: process.env.DB_PORT, // Replace with the port number of your PostgreSQL database
  dialect: 'postgres',
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error.message);
  });

module.exports = sequelize;
