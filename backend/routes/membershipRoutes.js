const express = require('express');
const router = express.Router();
const {
  getMemberships,
  getMembership,
  createMembership,
  updateMembership,
  deleteMembership,
  subscribeMembership
} = require('../controllers/membershipController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getMemberships)
  .post(protect, admin, createMembership);

router.route('/:id')
  .get(getMembership)
  .put(protect, admin, updateMembership)
  .delete(protect, admin, deleteMembership);

router.post('/:id/subscribe', protect, subscribeMembership);

module.exports = router;