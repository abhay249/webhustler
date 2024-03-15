const catchAsync = require('../utils/catchAsync');
const services = require('./../MODEL/servicesModel');
const APIFeatures = require('./../utils/apifeatures');
const apperror = require('./../utils/appError');
const logger = require('./../logger/index');

exports.createService = catchAsync(async (req, res, next) => {
  // console.log("hello");
  logger.info('inside create service');
  const doc = await services.create({
    name: req.body.name,
    slug: req.body.slug,
    type: req.body.type,
    image1: req.body.image1,
    // image2: req.body.image2,
    content1: req.body.content1,
    content2: req.body.content2,
    // content3: req.body.content3,
    // content4: req.body.content4,
  });
  // console.log("done");
  res.status(201).json({
    status: 'success',
    data: doc,
  });
  logger.info('outside create service');
});

// exports.getCandidatePage = catchAsync(async (req, res, next) => {
//   // const candi = await candidate.find();

//   res
//     .status(200)
//     .set('Content-Security-Policy')
//     //  "connect-src 'self' http://127.0.0.1:5000/")
//     .render('candidate', {
//       title: 'Candidates',
//       // candi,
//     });
// });

exports.getAddService = catchAsync(async (req, res, next) => {
  logger.info('inside add service ');
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;"
    )
    .render('addService', {
      title: 'Add New Service',
    });
  logger.info('outside add service ');
});
exports.deleteMe = catchAsync(async (req, res, next) => {
  // console.log(req.body);
  logger.info('inside delete service');
  await services.findByIdAndUpdate(req.body.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
  logger.info('outside delete service');
});

exports.service = catchAsync(async (req, res, next) => {
  logger.info('inside get service');
  const data = await services.findOne({ slug: req.params.slug });
  let parts = req.params.slug.split('-');
  const Title = parts.map((word) => word).join(' ');
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;"
    )
    .render('services', {
      title: Title,
      data,
    });
  logger.info('outside get service');
});
