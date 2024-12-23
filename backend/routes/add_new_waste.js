const express = require('express');
const db = require('../models/db'); // ไฟล์สำหรับการเชื่อมต่อฐานข้อมูล
const authenticateJWT = require('../middlewares/authenticateJWT'); // Import Middleware
const router = express.Router();

// เพิ่ม Delivery ID ลงในตาราง delivery
router.post('/add', authenticateJWT, async (req, res) => {
    const { waste_id } = req.body;

    if (!waste_id) {
        return res.status(400).json({ message: 'Delivery ID is required' });
    }

    try {
        const currentDateTime = new Date();
        const datetime = currentDateTime.toISOString().slice(0, 19).replace('T', ' ');
        const emp_id = req.user.EMP_ID; // ดึง emp_id จาก Token

        await db.query(
            'INSERT INTO waste (waste_id, waste_DATE, emp_id) VALUES (?, ?, ?)',
            [waste_id, datetime, emp_id]
        );

        res.status(200).json({ message: 'Waste ID added successfully' });
    } catch (error) {
        console.error('Error adding Waste:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// บันทึก Items ลงในตาราง deliverybasket
router.post('/save', async (req, res) => {
    const { waste_id, items } = req.body;

    if (!waste_id || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    try {
        

        const insertPromises = items.map(item => {
            return db.query(
                'INSERT INTO wastebasket (waste_id, item_id, ITEM_QTY ) VALUES (?, ?, ?)',
                [waste_id, item.item_id, item.item_qty]
            );
        });

        await Promise.all(insertPromises);
        res.status(200).json({ message: 'Items saved successfully' });      
    } catch (error) {
        console.error('Error saving items:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
