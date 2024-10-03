const User = require('../models/userModel');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const sendCookie = require('../utils/sendCookie');

exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const { username, email, password, name } = req.body;

  if (!username || !email || !password) {
    return next(new ErrorHandler('Please fill all fields', 204));
  }

  const user = await User.findOne({
    $or: [{ username, email }],
  });

  if (user) {
    if (user.username === username) {
      return next(new ErrorHandler('username already exists', 401));
    }
    return next(new ErrorHandler('email already exists', 401));
  }

  const newUser = await User.create({
    name: name,
    username: username,
    email: email,
    password: password,
    role: req.body.role,
  });

  sendCookie(newUser, 201, res);
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { userId, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: userId }, { username: userId }],
  }).select('+password');

  if (!user) {
    return next(new ErrorHandler('user does not exists', 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('password does not match'));
  }

  sendCookie(user, 201, res);
});

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expire: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out',
  });
});

exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find().select('+password');

  res.status(200).json({
    success: true,
    users,
  });
});

exports.getUserById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler('user does not exists'), 404);
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.getCurrentUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler('user does not exists', 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateCurrentUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler('user does not exists', 404));
  }

  const newUserData = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
  };

  await User.findByIdAndUpdate(req.user._id, newUserData);

  res.status(200).json({
    success: true,
    message: 'update successfully',
  });
});

exports.deleteUserById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler('user does not exists', 404));
  }

  await User.deleteOne({ _id: user._id });

  res.status(200).json({
    success: true,
    message: 'delete successfully',
  });
});
