const Trainer = require('../models/Trainer');

// @desc    Get all trainers
// @route   GET /api/trainers
// @access  Public
const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find({ isActive: true });
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single trainer
// @route   GET /api/trainers/:id
// @access  Public
const getTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    
    if (trainer) {
      res.json(trainer);
    } else {
      res.status(404).json({ message: 'Trainer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create trainer
// @route   POST /api/trainers
// @access  Private/Admin
const createTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.create(req.body);
    res.status(201).json(trainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update trainer
// @route   PUT /api/trainers/:id
// @access  Private/Admin
const updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (trainer) {
      res.json(trainer);
    } else {
      res.status(404).json({ message: 'Trainer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete trainer
// @route   DELETE /api/trainers/:id
// @access  Private/Admin
const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    
    if (trainer) {
      res.json({ message: 'Trainer removed' });
    } else {
      res.status(404).json({ message: 'Trainer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTrainers,
  getTrainer,
  createTrainer,
  updateTrainer,
  deleteTrainer
};