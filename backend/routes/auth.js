const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../models/db'); // ไฟล์ฐานข้อมูล
const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // ใช้ environment variable หรือ default key

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
        const [rows] = await db.query('SELECT * FROM employee WHERE EMP_EMAIL = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = rows[0];
        const isPasswordValid = password === user.EMP_PASS; // ถ้าต้องการเข้ารหัส ให้ใช้ bcrypt.compare

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // สร้าง JWT และใส่ข้อมูลที่ต้องการใน Payload
        const token = jwt.sign(
            {
                EMP_ID: user.EMP_ID,
                EMP_FNAME: user.EMP_FNAME,
                EMP_LNAME: user.EMP_LNAME,
                CONTRACT_ID: user.CONTRACT_ID,
                EMP_POS: user.EMP_POS,
            },
            SECRET_KEY,
            { expiresIn: '1h' } // Token หมดอายุใน 1 ชั่วโมง
        );
        
        return res.status(200).json({
            message: 'Login successful! Token created.',
            token: token,
        });
        

        res.json({ token }); // ส่ง JWT กลับไปยัง Client
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
