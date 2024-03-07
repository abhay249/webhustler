const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required field'],
  },
  email: {
    type: String,
    required: [true, 'Email is required field'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid Email'],
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (v) {
        // Define your phone number validation regex
        const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number

        return phoneRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'Phone number is required'],
  },
  message: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now, // This sets the default value to the current date and time
  },
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
