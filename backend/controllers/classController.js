const Class = require('../models/Class');
const User = require('../models/User');

// @desc    Get all classes
// @route   GET /api/classes
// @access  Public
const getClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('trainer', 'name image');
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single class
// @route   GET /api/classes/:id
// @access  Public
const getClass = async (req, res) => {
  try {
    const gymClass = await Class.findById(req.params.id)
      .populate('trainer')
      .populate('enrolledMembers', 'name email');
    
    if (gymClass) {
      res.json(gymClass);
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create class
// @route   POST /api/classes
// @access  Private/Admin
const createClass = async (req, res) => {
  try {
    const gymClass = await Class.create(req.body);
    res.status(201).json(gymClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update class
// @route   PUT /api/classes/:id
// @access  Private/Admin
const updateClass = async (req, res) => {
  try {
    const gymClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (gymClass) {
      res.json(gymClass);
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete class
// @route   DELETE /api/classes/:id
// @access  Private/Admin
const deleteClass = async (req, res) => {
  try {
    const gymClass = await Class.findByIdAndDelete(req.params.id);
    
    if (gymClass) {
      res.json({ message: 'Class removed' });
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Enroll in class
// @route   POST /api/classes/:id/enroll
// @access  Private
const enrollInClass = async (req, res) => {
  try {
    const gymClass = await Class.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!gymClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    if (gymClass.enrolledMembers.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already enrolled in this class' });
    }

    if (gymClass.enrolledMembers.length >= gymClass.capacity) {
      return res.status(400).json({ message: 'Class is full' });
    }

    gymClass.enrolledMembers.push(req.user._id);
    user.enrolledClasses.push(gymClass._id);

    await gymClass.save();
    await user.save();

    res.json({ message: 'Successfully enrolled in class' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClasses,
  getClass,
  createClass,
  updateClass,
  deleteClass,
  enrollInClass
};