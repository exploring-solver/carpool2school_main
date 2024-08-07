const express = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/details', UserController.addOrUpdateUserDetail);
router.get('/details', UserController.getUserDetails);
router.delete('/address', UserController.deleteUserAddress);
router.get('/nearby', UserController.getNearbyUsers);

module.exports = router;