const express = require('express');
const db = require('../models/db'); // เชื่อมต่อฐานข้อมูล
const router = express.Router();

router.get('/', async (req, res) => {
    try {
    const [rows] = await db.query('SELECT item_name AS name ,item_qty FROM item');
        console.log(rows); // ดูข้อมูลที่ดึงมาได้
        res.json(rows);
    } catch (error) {
        console.error('Error fetching items:', error); // ดูข้อผิดพลาดใน Terminal
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;