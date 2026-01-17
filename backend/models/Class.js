const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a class name']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: true
  },
  schedule: {
    day: {
      type: String,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  },
  capacity: {
    type: Number,
    required: true,
    default: 20
  },
  enrolledMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48'
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  category: {
    type: String,
    enum: ['Cardio', 'Strength', 'Yoga', 'HIIT', 'Boxing', 'CrossFit', 'Pilates'],
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Class', classSchema);