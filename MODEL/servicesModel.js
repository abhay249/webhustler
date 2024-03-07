const mongoose = require('mongoose');
const slugify = require('slugify');

const servicesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'service name is required'],
  },
  type: {
    type: String,
    required: [true, 'service type is required'],
  },
  slug: String,
  image1: {
    type: String,
    required: [true, 'image1 is required'],
  },
  image2: {
    type: String,
    required: [true, 'image2 is required'],
  },
  content1: {
    type: String,
    required: [true, 'content1 is required'],
  },
  content2: {
    type: String,
    required: [true, 'content2 is required'],
  },
  content3: {
    type: String,
    required: [true, 'content3 is required'],
  },
  content4: {
    type: String,
    required: [true, 'content4 is required'],
  },
  active: {
    type: Boolean,
    default: true,
    // select: false,
  },
});

servicesSchema.pre('save', function (next) {
  console.log(this);
  this.slug = slugify(this.name, { lower: true });
  next();
});
const services = mongoose.model('Services', servicesSchema);

module.exports = services;
