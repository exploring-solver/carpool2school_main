const knexConfig = require('./configs');
const environment = process.env.NODE_ENV || 'development';
const db = require('knex')(knexConfig(environment));

// Test the database connection
db.raw('SELECT 1+1 AS result')
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  });

module.exports = db;
