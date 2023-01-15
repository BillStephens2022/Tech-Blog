const Sequelize = require('sequelize');
require('dotenv').config();

let database = process.env.DATABASE_URL || 'tech_blog_db';

const sequelize = new Sequelize(
  database,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;