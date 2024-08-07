const UserService = require('../services/userService');

class UserController {
  static async addOrUpdateUserDetail(req, res, next) {
    try {
      const userDetail = await UserService.addOrUpdateUserDetail(req.user.id, req.body);
      res.json(userDetail);
    } catch (error) {
      next(error);
    }
  }

  static async getUserDetails(req, res, next) {
    try {
      const userDetails = await UserService.getUserDetails(req.user.id);
      res.json(userDetails);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUserAddress(req, res, next) {
    try {
      await UserService.deleteUserAddress(req.user.id);
      res.json({ message: 'Address deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async getNearbyUsers(req, res, next) {
    try {
      const { lat, lon, radius } = req.query;
      const nearbyUsers = await UserService.getNearbyUsers(lat, lon, radius);
      res.json(nearbyUsers);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;