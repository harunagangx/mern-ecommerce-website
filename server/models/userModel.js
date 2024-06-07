const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'please enter username'],
      unique: [true, 'username already exists'],
      minLength: [4, 'username must be as least 4 characters'],
    },
    email: {
      type: String,
      required: [true, 'please enter email'],
      unique: [true, 'email already exists'],
      validator: [validator.isEmail, 'please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'please enter password'],
      minLength: [6, 'password must be as least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
