const express = require('express');
const db = require('../models/db');

const router = express.Router();

// เส้นทางสำหรับการสมัครสมาชิก
router.post('/', (req, res) => {
    const { emp_fname, emp_lname,emp_uname, emp_gender, address, emp_phone, emp_pos, contract_id, emp_email, emp_pass } = req.body;

    const query = `
        INSERT INTO employee (emp_fname, emp_lname,emp_uname, emp_gender, address, emp_phone, emp_pos, contract_id, emp_email, emp_pass)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [emp_fname, emp_lname,emp_uname, emp_gender, address, emp_phone, emp_pos, contract_id, emp_email, emp_pass], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error saving data');
        } else {
            res.send('Account created successfully!');
        }
    });
});

module.exports = router;
