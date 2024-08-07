const db = require('../../configs/db.configs');

class User {
  static tableName = 'users';

  static async create(user) {
    return db(this.tableName).insert(user).returning('*');
  }

  static async findByEmail(email) {
    return db(this.tableName).where({ email }).first();
  }

  static async findById(id) {
    return db(this.tableName).where({ id }).first();
  }
}

module.exports = User;