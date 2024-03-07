const catchAsync = require('../utils/catchAsync');
const services = require('../MODEL/servicesModel');
const user = require('../MODEL/userModel');
const contact = require('../MODEL/contactModel');
const logger = require('./../logger/index');

exports.getIndexPage = catchAsync(async (req, res, next) => {
  logger.info('inside get index page');
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;"
    )
    .render('index', {
      title: 'Web | Best ',
    });
  logger.info('outside get index page');
});

exports.getAdminLogin = catchAsync(async (req, res, next) => {
  logger.info('inside get admin page');
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;"
    )
    .render('admin', {
      title: 'Admin Page',
    });
  logger.info('outside get admin page');
});

exports.getCreateAccount = catchAsync(async (req, res, next) => {
  logger.info('inside get create account page');
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;"
    )
    .render('createAccount', {
      title: 'Create New Account',
    });
  logger.info('outside get create account page');
});

exports.getDashboard = catchAsync(async (req, res, next) => {
  logger.info('inside get dashboard page');
  const userDataSet = await user.find();
  // const serviceDataSet = await services.find();
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;"
    )
    .render('dashboard', {
      title: 'Admin Dashboard',
      userDataSet,
      // serviceDataSet,
    });
  logger.info('outside get dashboard page');
});

exports.getContact = catchAsync(async (req, res, next) => {
  logger.info('inside get contact page');
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;"
    )
    .render('contact', {
      title: 'Contact us for any service',
    });
  logger.info('outside get contact page');
});
exports.saveContact = catchAsync(async (req, res, next) => {
  logger.info('inside save contact api');
  const { name, email, phoneNumber, message } = req.body;
  // console.log(req.body);
  const contactData = {
    name,
    email,
    phoneNumber,
  };

  if (message) {
    contactData.message = message;
  }

  const doc = await contact.create(contactData);

  // const doc = await contact.create({
  //   name: req.body.name,
  //   email: req.body.email,
  //   phoneNumber: req.body.phoneNumber,
  //   timestamp: req.body.timestamp,
  // });
  // console.log("done");
  res.status(201).json({
    status: 'success',
    data: doc,
  });
  logger.info('outside save contact api');
});

exports.createAccount = catchAsync(async (req, res, next) => {
  // console.log('hello');
  logger.info('inside save account api');
  const doc = await user.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  // console.log("done");
  res.status(201).json({
    status: 'success',
    data: doc,
  });
  logger.info('outside save account api');
});

exports.getUsersDisplay = catchAsync(async (req, res, next) => {
  // console.log('hello');
  logger.info('inside user display api');
  const dataSet = await user.find();
  // console.log('dataSet1', dataSet);
  // console.log("done");
  res.status(201).json({
    status: 'success',
    data: dataSet,
  });
  logger.info('outside user display api');
});

exports.getServicesDisplay = catchAsync(async (req, res, next) => {
  // console.log('hello');
  logger.info('inside service display api');
  const dataSet = await services.find();
  // console.log('dataSet', dataSet);
  res.status(201).json({
    status: 'success',
    data: dataSet,
  });
  logger.info('outside service display api');
});

exports.getContactDisplay = catchAsync(async (req, res, next) => {
  // console.log('hello');
  logger.info('inside contact display api');
  const dataSet = await contact.find();
  // console.log('dataSet', dataSet);
  res.status(201).json({
    status: 'success',
    data: dataSet,
  });
  logger.info('outside contact display api');
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  // console.log(req.body.id)
  logger.info('inside delete user api');
  await user.findByIdAndUpdate(req.body.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
  logger.info('outside delete user api');
});
