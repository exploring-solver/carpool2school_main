const dotenv = require('dotenv');
dotenv.config();

const client = "mysql"
const migrations = {
  "tableName": "knex_migrations",
  directory: './migrations'
}

module.exports = (ENV) => {
  this.database = {
    "development": {
      client,
      "connection": {
        "database": process.env.DEVELOPMENT_DB_NAME,
        "user": process.env.DEVELOPMENT_DB_USERNAME,
        "password": process.env.DEVELOPMENT_DB_PASSWORD
      },
      "pool": { "min": 2, "max": 10 },
      migrations,
      seeds: {
        directory: './seeds',
      },
    },

    "staging": {
      client,
      "connection": {
        "database": process.env.STAGING_DB_NAME,
        "user": process.env.STAGING_DB_USERNAME,
        "password": process.env.STAGING_DB_PASSWORD
      },
      "pool": { "min": 2, "max": 10 },
      migrations,
      seeds: {
        directory: './seeds',
      },
    },

    "production": {
      client,
      "connection": {
        "database": process.env.PRODUCTION_DB_NAME,
        "user": process.env.PRODUCTION_DB_USERNAME,
        "password": process.env.PRODUCTION_DB_PASSWORD
      },
      "pool": { "min": 2, "max": 10 },
      migrations,
      seeds: {
        directory: './seeds',
      },
    }
  }

  return this.database[ENV];
}

