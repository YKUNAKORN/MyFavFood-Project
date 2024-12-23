const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';



function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Token is required' });
    }

    const token = authHeader.split(' ')[1]; // ตัด Bearer ออก

    try {
        const decoded = jwt.verify(token, SECRET_KEY); // ตรวจสอบ Token
        req.user = decoded; // เพิ่มข้อมูลที่ถอดรหัสลงใน req.user
        next(); // เรียกฟังก์ชันถัดไป
    } catch (error) {
        console.error('JWT Verification Error:', error);
        res.status(403).json({ message: 'Invalid or expired token' });
    }
}

module.exports = authenticateJWT;
