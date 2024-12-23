// const express = require('express');
// const jwt = require('jsonwebtoken'); // ใช้สำหรับ Token
// const router = express.Router();
// const db = require('../models/db'); // ไฟล์เชื่อมฐานข้อมูล

// // Middleware ตรวจสอบ Token
// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) return res.status(401).json({ error: 'No token provided' });

//     const token = authHeader.split(' ')[1];
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.emp_id = decoded.emp_id;
//         next();
//     } catch (err) {
//         res.status(403).json({ error: 'Invalid or expired token' });
//     }
// };

// // Route สำหรับอัปเดต drawer_cash
// router.post('/update-drawer-cash', verifyToken, async (req, res) => {
//     const { amount } = req.body;
//     const emp_id = req.emp_id;

//     if (!amount || isNaN(amount)) {
//         return res.status(400).json({ error: 'Invalid cash amount' });
//     }

//     try {
//         const [rows] = await db.query('SELECT drawer_cash FROM cash_control WHERE emp_id = ?', [emp_id]);
//         if (rows.length === 0) {
//             return res.status(404).json({ error: 'Employee not found' });
//         }

//         const newCash = rows[0].drawer_cash - amount;
//         await db.query('UPDATE cash_control SET drawer_cash = ? WHERE emp_id = ?', [newCash, emp_id]);

//         res.json({ message: 'Cash updated successfully', newCash });
//     } catch (err) {
//         console.error('Database error:', err);
//         res.status(500).json({ error: 'Failed to update cash' });
//     }
// });

// module.exports = router;
