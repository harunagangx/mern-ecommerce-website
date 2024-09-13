const express = require('express');
const { isAuthenticatedUser, authorizeRole } = require('../middlewares/auth');
const {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require('../controllers/categoryController');

const router = express.Router();

router.route('/categories').get(getAllCategory);

router
  .route('/admin/category')
  .post(isAuthenticatedUser, authorizeRole('admin'), createCategory);

router
  .route('/admin/category/:id')
  .get(isAuthenticatedUser, authorizeRole('admin'), getCategoryById)
  .put(isAuthenticatedUser, authorizeRole('admin'), updateCategoryById)
  .delete(isAuthenticatedUser, authorizeRole('admin'), deleteCategoryById);

module.exports = router;
