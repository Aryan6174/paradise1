const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a membership name']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  duration: {
    type: Number,
    required: true,
    default: 30 // days
  },
  features: [{
    type: String
  }],
  description: {
    type: String
  },
  isPopular: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Membership', membershipSchema);