const AuthService = require('../services/authService');

class AuthController {
  static async register(req, res, next) {
    try {
      const token = await AuthService.register(req.body);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;