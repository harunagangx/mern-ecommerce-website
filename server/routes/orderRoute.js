const express = require('express');
const { isAuthenticatedUser, authorizeRole } = require('../middlewares/auth');
const {
  createOrder,
  getAllOrders,
  getOrderById,
  myOrders,
  updateOrder,
  deleteOrder,
  calculateTotalSales,
  calculateTotalSalesByDate,
  calculateTotalSalesByMonth
} = require('../controllers/orderController');

const router = express.Router();

router.route('/order').post(isAuthenticatedUser, createOrder);

router.route('/order/me').get(isAuthenticatedUser, myOrders);

router
  .route('/order/:id')
  .get(getOrderById)
  .delete(isAuthenticatedUser, deleteOrder);

router
  .route('/admin/orders')
  .get(isAuthenticatedUser, authorizeRole('admin'), getAllOrders);

router
  .route('/admin/order/:id')
  .put(isAuthenticatedUser, authorizeRole('admin'), updateOrder);

router
  .route('/admin/order/total-sales')
  .get(isAuthenticatedUser, authorizeRole('admin'), calculateTotalSales);

router
  .route('/admin/order/sales-by-date')
  .get(isAuthenticatedUser, authorizeRole('admin'), calculateTotalSalesByDate);

router
  .route('/admin/order/sales-by-month')
  .get(isAuthenticatedUser, authorizeRole('admin'), calculateTotalSalesByMonth);

module.exports = router;
