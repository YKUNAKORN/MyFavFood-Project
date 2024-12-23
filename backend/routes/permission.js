const express = require('express');
const jwt = require('jsonwebtoken'); // ใช้สำหรับตรวจสอบ JWT
const router = express.Router();

// Middleware ตรวจสอบ Token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // อ่าน Header Authorization
    const token = authHeader && authHeader.split(' ')[1]; // ตัดคำว่า Bearer ออก

    if (!token) {
        return res.status(403).json({ message: 'No token provided' }); // หากไม่มี Token
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' }); // หาก Token ไม่ถูกต้อง
        }

        req.user = decoded; // เก็บข้อมูลที่ถอดรหัสได้จาก Token
        next();
    });
};


// Route ตรวจสอบสิทธิ์เพื่อเข้าถึงหน้า edit-profile
router.post('/permission', verifyToken, (req, res) => {
    const emp_pos = req.user.EMP_POS; // ดึง emp_pos จาก Token ที่ถอดรหัสแล้ว

    // ตรวจสอบสิทธิ์
    if (emp_pos === 'Manager' || emp_pos === 'Assistance-manager') {
        return res.status(200).json({ 
            message: 'You have permission to edit the profile', // เปลี่ยนข้อความตรงนี้
            redirect: '/pages/edit-profile.html' // URL สำหรับ Redirect ไปหน้า edit-profile
        });
    }

    // หากไม่มีสิทธิ์
    return res.status(403).json({ 
        message: 'Access denied. You do not have permission to access the edit-profile page.' 
    });
});


module.exports = router;
