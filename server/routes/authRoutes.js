const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

const User = require('../models/User');

// Just for testing And Not For Production 
router.get('/all', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Hide password
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/signup', signup); // /api/auth/signup
router.post('/login', login); // /api/auth/login

module.exports = router;