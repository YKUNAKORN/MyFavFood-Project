const express = require('express');

module.exports = (pool) => {
    const router = express.Router();

    // API สำหรับดึงข้อมูลเมนูตามชื่อ
    router.get('/:menuId', async (req, res) => {
        const menuId = req.params.menuId;

        try {
            const [rows] = await pool.query(
                'SELECT sand_name, sand_price FROM sandwich WHERE sand_name = ?',
                [menuId]
            );

            if (rows.length > 0) {
                res.json(rows); // ส่งข้อมูลกลับในรูปแบบ JSON
            } else {
                res.status(404).json({ error: 'Menu not found' });
            }
        } catch (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    router.post('/save-order', async (req, res) => {
        const orderItems = req.body.items; // รับรายการข้อมูลที่ส่งมาจาก Frontend
    
        if (!Array.isArray(orderItems) || orderItems.length === 0) {
            return res.status(400).json({ error: 'No items to save' });
        }
    
        try {
            // เตรียมคำสั่ง SQL สำหรับบันทึกข้อมูลหลายรายการพร้อมกัน
            const values = orderItems.map(item => [item.sand_name, item.sand_price]);
            const query = 'INSERT INTO sandwich (sand_name, sand_price) VALUES ?';
    
            // บันทึกข้อมูลลงฐานข้อมูล
            const [result] = await pool.query(query, [values]);
            console.log('Order saved:', result);
            
            res.json({ message: 'Order saved successfully', insertedRows: result.affectedRows });
        } catch (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Failed to save order' });
        }
    });

    return router;



  
};


