const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

async function calPrices(orderItems) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingFee = itemsPrice > 1000 ? 0 : 10;
  const taxRate = 0.1;
  const taxPrice = (itemsPrice * taxRate).toFixed(2);

  const totalPrice = (itemsPrice + shippingFee + parseFloat(taxPrice)).toFixed(
    2
  );

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingFee: shippingFee.toFixed(2),
    taxPrice,
    totalPrice,
  };
}

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save();
}

exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  const { orderItems, shippingInfo } = req.body;

  const { itemsPrice, taxPrice, shippingFee, orderTotal } =
    calPrices(orderItems);

  const newOrder = await Order.create({
    user: req.user._id,
    shippingInfo: shippingInfo,
    orderItems: orderItems,
    itemsPrice: itemsPrice,
    taxPrice: taxPrice,
    shippingFee: shippingFee,
    orderTotal: orderTotal,
    isPaid: true,
    paidAt: Date.now(),
  });

  res.status(201).json({
    success: true,
    newOrder,
  });
});

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().populate('User', 'username email');

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.getOrderById = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'User',
    'username email'
  );

  if (!order) {
    return next(new ErrorHandler('Order not found with this ID', 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.findById({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.calculateTotalSales = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalSales = 0;

  orders.forEach((order) => {
    totalSales += order.itemsPrice;
  });

  res.status(200).json({
    success: true,
    totalSales,
  });
});

exports.calculateTotalSalesByDate = catchAsyncErrors(async (req, res, next) => {
  const salesByDate = await Order.aggregate([
    {
      $match: {
        isPaid: true,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$paidAt' },
        },
        totalSales: { $sum: '$itemsPrice' },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    salesByDate,
  });
});

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found with this ID', 404));
  }

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('You already delivered this order', 400));
  }

  if (order.orderStatus === 'Shipped') {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }

  order.orderStatus = req.body.orderStatus;

  if (req.body.status === 'Delivered') {
    order.deliveryAt = Date.now();
  }

  await order.save;

  res.status(200).json({
    success: true,
  });
});
