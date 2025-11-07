// models/Penalty.js
const mongoose = require('mongoose');

const penaltySchema = new mongoose.Schema({
  // 1. Car Number (required, uppercase, validated)
  carNumber: {
    type: String,
    required: [true, 'Car number is required'],
    trim: true,
    uppercase: true,
    minlength: [5, 'Car number too short'],
    match: [/^[A-Z0-9\s-]+$/, 'Invalid car number format']
  },

  // 2. Driving License Number (required)
  licenseNumber: {
    type: String,
    required: [true, 'Driving license number is required'],
    trim: true,
    minlength: [5, 'License number too short'],
    maxlength: [30, 'License number too long']
  },

  // 3. Penalty Amount (in Taka, minimum 50)
  amount: {
    type: Number,
    required: [true, 'Penalty amount is required'],
    min: [50, 'Minimum penalty is 50 Taka']
  },

  // 4. Violation / Crime Description
  violation: {
    type: String,
    required: [true, 'Violation description is required'],
    trim: true,
    minlength: [10, 'Description too short'],
    maxlength: [500, 'Description too long']
  },

  // 5. Status: due or paid
  status: {
    type: String,
    enum: ['due', 'paid'],
    default: 'due',
    required: true
  },

  // 6. Issued By (Police Officer)
  issuedBy: {
    type: String,
    required: true
  },
  Zone: {
    type: String,
    required: true
  },
  NameAndRank: {
    type: String,
    required: true
  },
  Driver: {
    type: String,
    required: true
  },

  // 7. Timestamp: When penalty was issued
  issuedAt: {
    type: Date,
    default: Date.now,
    required: true
  },

  // 8. Paid At (only if status = paid)
  paidAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true // adds createdAt, updatedAt
});


module.exports = mongoose.model('Penalty', penaltySchema);