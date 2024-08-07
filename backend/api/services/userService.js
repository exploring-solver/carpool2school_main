const UserDetail = require('../models/UserDetail');

class UserService {
  static async addOrUpdateUserDetail(userId, userDetailData) {
    const existingDetail = await UserDetail.findByUserId(userId);
    if (existingDetail) {
      return UserDetail.update(userId, userDetailData);
    }
    return UserDetail.create({ user_id: userId, ...userDetailData });
  }

  static async getUserDetails(userId) {
    return UserDetail.findByUserId(userId);
  }

  static async deleteUserAddress(userId) {
    return UserDetail.delete(userId);
  }

  static async getNearbyUsers(lat, lon, radius) {
    return UserDetail.findNearbyUsers(lat, lon, radius);
  }
}

module.exports = UserService;