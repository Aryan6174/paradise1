const Membership = require('../models/Membership');
const User = require('../models/User');

// @desc    Get all memberships
// @route   GET /api/memberships
// @access  Public
const getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single membership
// @route   GET /api/memberships/:id
// @access  Public
const getMembership = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    
    if (membership) {
      res.json(membership);
    } else {
      res.status(404).json({ message: 'Membership not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create membership
// @route   POST /api/memberships
// @access  Private/Admin
const createMembership = async (req, res) => {
  try {
    const membership = await Membership.create(req.body);
    res.status(201).json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update membership
// @route   PUT /api/memberships/:id
// @access  Private/Admin
const updateMembership = async (req, res) => {
  try {
    const membership = await Membership.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (membership) {
      res.json(membership);
    } else {
      res.status(404).json({ message: 'Membership not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete membership
// @route   DELETE /api/memberships/:id
// @access  Private/Admin
const deleteMembership = async (req, res) => {
  try {
    const membership = await Membership.findByIdAndDelete(req.params.id);
    
    if (membership) {
      res.json({ message: 'Membership removed' });
    } else {
      res.status(404).json({ message: 'Membership not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Subscribe to membership
// @route   POST /api/memberships/:id/subscribe
// @access  Private
const subscribeMembership = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + membership.duration);

    user.membership = membership._id;
    user.membershipExpiry = expiryDate;

    await user.save();

    res.json({ 
      message: 'Successfully subscribed to membership',
      expiryDate 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMemberships,
  getMembership,
  createMembership,
  updateMembership,
  deleteMembership,
  subscribeMembership
};