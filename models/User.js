// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  nid: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^\d{10,17}$/, // Supports 10 or 13 or 17-digit NID
    index: true
  },
  drivingLicense: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
    match: /^[A-Z0-9\-]+$/ // e.g., DL-2021-98765
  },
  carNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
    match: /^[A-Z\s]+\s*[A-Z]*\s*[0-9\-]+$/ // e.g., DHAKA METRO GA-12-3456
  },
  dob: {
    type: Date,
    required: true,
    validate: {
      validator: function(v) {
        return v && v < new Date(); // DOB must be in the past
      },
      message: 'Date of Birth cannot be in the future.'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to update `updatedAt`
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});


module.exports = mongoose.model('User', userSchema);