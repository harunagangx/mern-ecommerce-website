const Category = require('../models/categoryModel');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;

  const category = await Category.findOne({ name });

  if (category) {
    return next(new ErrorHandler('category already exists', 404));
  }

  const newCategory = await Category.create({ name: name });

  res.status(201).json({
    success: true,
    newCategory,
  });
});

exports.getAllCategory = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find().populate('products');

  res.status(200).json({
    success: true,
    categories,
  });
});

exports.getCategoryById = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id).populate('products');

  if (!category) {
    return next(new ErrorHandler('category does not exist', 404));
  }

  res.status(200).json({
    success: true,
    category,
  });
});

exports.updateCategoryById = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler('category does not exist', 404));
  }

  await Category.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: 'update successfully',
  });
});

exports.deleteCategoryById = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler('category does not exist', 404));
  }

  await Category.deleteOne({ _id: category._id });

  res.status(200).json({
    success: 'true',
    message: 'delete successfully',
  });
});
