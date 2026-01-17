const express = require('express');
const router = express.Router();
const {
  getClasses,
  getClass,
  createClass,
  updateClass,
  deleteClass,
  enrollInClass
} = require('../controllers/classController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getClasses)
  .post(protect, admin, createClass);

router.route('/:id')
  .get(getClass)
  .put(protect, admin, updateClass)
  .delete(protect, admin, deleteClass);

router.post('/:id/enroll', protect, enrollInClass);

module.exports = router;