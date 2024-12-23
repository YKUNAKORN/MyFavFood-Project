const mysql = require('mysql2');

// สร้าง Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ทดสอบการเชื่อมต่อฐานข้อมูลเมื่อเริ่มเซิร์ฟเวอร์
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
  } else {
    console.log('Connected to database as ID', connection.threadId);
    connection.release(); // คืน connection กลับไปยัง Pool
  }
});

module.exports = pool.promise();
