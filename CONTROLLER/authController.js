const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('.././utils/appError');
const Users = require('.././MODEL/userModel');
const services = require('.././MODEL/servicesModel');
const catchAsync = require('../utils/catchAsync');
const logger = require('./../logger/index');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  logger.info('inside create send token');
  const token = signToken(user._id);
  // console.log('token', token, '_id', user._id);

  // Remove the password
  //their is no Password in services
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });
  // user.password = undefined;

  res.status(statusCode).json({
    token,
    status: 'success',
    data: {
      user,
    },
  });
  logger.info('outside create send token');
};

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  // 1)Getting tokenand
  logger.info('inside is logged in');
  // console.log('islogged');
  if (req.cookies.jwt) {
    try {
      // 1) verify token

      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      // console.log('here is ', decoded);
      // 2) Check if user still exists
      const currentUser = await Users.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      // console.log(res.locals.user, currentUser);
      return next();
    } catch (err) {
      return next();
    }
  }
  logger.info('outside is logged in');
  next();
});

exports.login = catchAsync(async (req, res, next) => {
  logger.info('inside is login');
  const { email, password } = req.body;
  // console.log(email, password);
  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await Users.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  logger.info('outside is login');
  createSendToken(user, 200, req, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  logger.info('inside is logout');
  if (req.cookies.jwt) {
    // 1) verify token

    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );
    // console.log('here is ', decoded);
    // 2) Check if user still exists
    const currentUser = await Users.findById(decoded.id);
    if (!currentUser) {
      return next();
    }
    const token = signToken(decoded.id);
    // THERE IS A LOGGED IN USER
    res.locals.user = currentUser;
    // console.log(res.locals.user, currentUser);
    // console.log(currentUser);
    res.cookie('jwt', token, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    });
    // user.password = undefined;

    res.status(200).json({
      token,
      status: 'success',
      data: {
        currentUser,
      },
    });
  }
  logger.info('outside is logout');
});
