const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// GET ALL PRODUCTS
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .sort()
    .filter();

  let products = await apiFeature.query;

  let productsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
  });
});

// GET ALL PRODUCTS (ADMIN)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find().populate('category');

  res.status(201).json({
    success: true,
    products,
  });
});

exports.getProductById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler('product does not exists', 401));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

exports.updateProductById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler('product does not exists', 401));
  }

  await Product.findByIdAndUpdate(id, req.body);

  res.status(200).json({
    success: true,
    message: 'update successfully',
  });
});

exports.deleteProductById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler('product does not exists', 401));
  }

  await Product.deleteOne({ _id: product._id });

  res.status(200).json({
    success: true,
    message: 'delete successfully',
  });
});
