const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true
  },
  phone: {
    type: String
  },
  specialization: [{
    type: String
  }],
  experience: {
    type: Number,
    required: true
  },
  bio: {
    type: String
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b'
  },
  certifications: [{
    type: String
  }],
  socialMedia: {
    instagram: String,
    twitter: String,
    facebook: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Trainer', trainerSchema);