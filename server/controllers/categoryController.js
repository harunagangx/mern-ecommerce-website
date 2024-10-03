const Category = require('../models/categoryModel');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    category,
  });
});

exports.getAllCategory = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    categories,
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
