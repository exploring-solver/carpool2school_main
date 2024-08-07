const db = require('../../configs/db.configs');

class UserDetail {
  static tableName = 'user_details';
  static tableName2 = 'users';

  static async create(userDetail) {
    return db(this.tableName).insert(userDetail).returning('*');
  }

  static async findByUserId(userId) {
    return db(this.tableName)
      .join(this.tableName2, `${this.tableName}.user_id`, '=', `${this.tableName2}.id`)
      .where({ user_id: userId })
      .select(
        `${this.tableName}.*`,
        `${this.tableName2}.id`,
        `${this.tableName2}.email`,
        `${this.tableName2}.name_of_guardian`,
        `${this.tableName2}.name_of_student`,
        `${this.tableName2}.created_at`,
        `${this.tableName2}.updated_at`
      )
      .first();
  }

  static async update(userId, userDetail) {
    return db(this.tableName).where({ user_id: userId }).update(userDetail).returning('*');
  }

  static async delete(userId) {
    return db(this.tableName).where({ user_id: userId }).del();
  }

  static async findNearbyUsers(lat, lon, radius) {
    return db.raw(`
      SELECT u.id, u.email, u.name_of_guardian, u.name_of_student,
             ud.address, ud.phone_number1, ud.phone_number2, ud.latitude, ud.longitude,
             (6371 * acos(cos(radians(?)) * cos(radians(ud.latitude)) * cos(radians(ud.longitude) - radians(?)) + sin(radians(?)) * sin(radians(ud.latitude)))) AS distance
      FROM ${this.tableName2} u
      JOIN ${this.tableName} ud ON u.id = ud.user_id
      HAVING distance < ?
      ORDER BY distance
    `, [lat, lon, lat, radius]);
  }
}

module.exports = UserDetail;
