const express = require('express');
const { isAuthenticatedUser, authorizeRole } = require('../middlewares/auth');
const {
  createOrder,
  getAllOrders,
  getOrderById,
  myOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  updateOrder,
} = require('../controllers/orderController');

const router = express.Router();

router.route('/order').post(isAuthenticatedUser, createOrder);

router.route('/order').get(isAuthenticatedUser, myOrders);

router
  .route('/admin/orders')
  .get(isAuthenticatedUser, authorizeRole('admin'), getAllOrders);

router
  .route('/admin/order/:id')
  .get(isAuthenticatedUser, authorizeRole('admin'), getOrderById)
  .put(isAuthenticatedUser, authorizeRole('admin'), updateOrder);

router
  .route('/admin/order/total-sales')
  .get(isAuthenticatedUser, authorizeRole('admin'), calculateTotalSales);

router
  .route('/admin/order/sales-by-date')
  .get(isAuthenticatedUser, authorizeRole('admin'), calculateTotalSalesByDate);

module.exports = router;
