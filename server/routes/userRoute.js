const express = require('express');
const {
  createUser,
  loginUser,
  logoutUser,
  getAllUser,
  getCurrentUserDetails,
  updateCurrentUserDetails,
  deleteUserById,
  getUserById,
} = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRole } = require('../middlewares/auth');

const router = express.Router();

router.route('/register').post(createUser);

router.route('/login').post(loginUser);

router.route('/logout').get(logoutUser);

router.route('/me').get(isAuthenticatedUser, getCurrentUserDetails);

router.route('/me/update').put(isAuthenticatedUser, updateCurrentUserDetails);

// ADMIN ROUTES
router
  .route('/admin/users')
  .get(isAuthenticatedUser, authorizeRole('admin'), getAllUser);

router
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizeRole('admin'), getUserById)
  .delete(isAuthenticatedUser, authorizeRole('admin'), deleteUserById);

module.exports = router;
