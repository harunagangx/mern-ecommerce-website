const express = require('express');
const { isAuthenticatedUser, authorizeRole } = require('../middlewares/auth');
const {
  createProduct,
  getAllProducts,
  getAdminProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require('../controllers/productController');

const router = express.Router();

// PRODUCT ROUTES
router.route('/products').get(getAllProducts);

router.route('/product/:id').get(getProductById);

router.route('/admin/products').get(getAdminProducts);

router
  .route('/admin/product')
  .post(isAuthenticatedUser, authorizeRole('admin'), createProduct);

router
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizeRole('admin'), updateProductById)
  .delete(isAuthenticatedUser, authorizeRole('admin'), deleteProductById);

module.exports = router;
