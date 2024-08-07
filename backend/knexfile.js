// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: require('./configs/configs')(process.env.NODE_ENV),
  staging: require('./configs/configs')(process.env.NODE_ENV),
  production: require('./configs/configs')(process.env.NODE_ENV)
};
