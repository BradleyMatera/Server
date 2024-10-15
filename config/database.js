const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'wdv442_space_tracker', // Database name
  process.env.DB_USER || 'asl',                 // MySQL username
  process.env.DB_PASSWORD || 'asl',             // MySQL password
  {
    host: process.env.DB_HOST || 'wdv442-mysql', // MySQL container name
    dialect: 'mysql',
  }
);

module.exports = sequelize;