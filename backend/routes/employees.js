const express = require('express');
const db = require('../models/db'); // เชื่อมต่อฐานข้อมูล
const router = express.Router();

// API สำหรับดึงข้อมูลพนักงาน
router.get('/', async (req, res) => {
    try {
        // ดึงข้อมูลพนักงานจากฐานข้อมูล
        const [rows] = await db.query('SELECT EMP_ID, EMP_FNAME, EMP_LNAME, EMP_POS FROM employee');
        res.json(rows); // ส่งข้อมูลในรูปแบบ JSON
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// API สำหรับดึงข้อมูลพนักงานตาม emp_id
// router.get('/:emp_id', async (req, res) => {
//     const { emp_id } = req.params; // ดึง emp_id จาก URL
//     try {
//         const [rows] = await db.query('SELECT * FROM employee WHERE EMP_ID = ?', [emp_id]);
//         if (rows.length === 0) {
//             return res.status(404).json({ message: 'Employee not found' });
//         }
//         res.json(rows[0]); // ส่งข้อมูลพนักงานกลับไป
//     } catch (error) {
//         console.error('Error fetching employee data:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

router.get('/:emp_id', async (req, res) => {
    const { emp_id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM employee WHERE EMP_ID = ?', [emp_id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
