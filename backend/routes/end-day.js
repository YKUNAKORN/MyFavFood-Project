const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const router = express.Router();

// Middleware สำหรับตรวจสอบ JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }

        req.user = decoded;
        next();
    });
};

// Route สำหรับบันทึกข้อมูล Start Day
router.post('/', verifyToken, async (req, res) => {
    console.log('Request body:', req.body); // ตรวจสอบข้อมูลที่ได้รับ

    const { DRAWER_CASH, coin, safe, BREAD_IN } = req.body; // รับค่าจาก Frontend
    const emp_id = req.user.EMP_ID; // ดึง EMP_ID จาก JWT

    try {
        // บันทึกข้อมูลลงในฐานข้อมูล
        await db.query(
            'INSERT INTO cash_control (DRAWER_CASH, COIN, SAFE, BREAD_IN, EMP_ID) VALUES (?, ?, ?, ?, ?)',
            [DRAWER_CASH, coin, safe, BREAD_IN, emp_id]
        );

        res.json({ message: 'Data saved successfully!' }); // ส่งข้อความตอบกลับ
    } catch (error) {
        console.error('Database error:', error); // แสดงข้อผิดพลาดใน Console
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;