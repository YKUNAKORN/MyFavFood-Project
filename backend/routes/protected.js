const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Failed to authenticate token' });
    req.user = decoded;
    next();
  });
};

// Protected Route
router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Welcome to the dashboard, ${req.user.username}` });
});


router.get('/data', verifyToken, (req, res) => {
    res.json({ message: `Welcome to the Dashboard, ${req.user.username}!` });
  });
  
module.exports = router;
