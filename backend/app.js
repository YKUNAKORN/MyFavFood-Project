    const express = require('express');
    const bodyParser = require('body-parser');
    const cors = require('cors');
        require('dotenv').config();

    const app = express();
    const path = require('path');


    const mysql = require('mysql2/promise');
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'motaro1024',
        database: 'myfavfood',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
    

    
    // Middleware
    app.use(cors());
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, '../public')));

    // Middleware เพื่อแปลง request body เป็น JSON
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  



    // Routes
    
    const authRoutes = require('./routes/auth');
    app.use('/api/auth', authRoutes);
    const protectedRoutes = require('./routes/protected');
    app.use('/api/protected', protectedRoutes);

    const startDayRoutes = require('./routes/start-day');
    app.use('/api/start-day', startDayRoutes);
    const cashDrawerRoutes = require('./routes/cash-in-drawer');
    app.use('/api/cash-in-drawer', cashDrawerRoutes);
    const endDayRoutes = require('./routes/end-day');
    app.use('/api/end-day', endDayRoutes);

    // const cashRoutes = require('./routes/cash');
    // app.use('/api/cash', cashRoutes)(pool);


    
    const employeesRoutes = require('./routes/employees');
    app.use('/api/employees', employeesRoutes);


    const menuRoutes = require('./routes/menu')(pool);  // เชื่อมโยงเส้นทาง menu.js
    app.use('/api/menu', menuRoutes);  // เส้นทางนี้ต้องใช้ '/api/menu'

    const wasteRoutes = require('./routes/waste')(pool); 
    app.use('/api/waste', wasteRoutes);  



    const signupRoutes = require('./routes/signup');
    app.use('/signup', signupRoutes);


    const deliveryRoutes = require('./routes/delivery');
    app.use('/api/items', deliveryRoutes);    
    const inventoryRoute = require("./routes/inventory");
    app.use('/api/inventory', inventoryRoute);
    const NewwasteRoute = require('./routes/new_waste');
    app.use('/api/new_waste' , NewwasteRoute);
    const AddNewwasteRoute = require('./routes/add_new_waste');
    app.use('/api/add_new_waste' , AddNewwasteRoute);


    const stockRoute = require("./routes/stock");
    app.use("/api/stock" ,stockRoute);
    const EdeliveryRoute = require("./routes/e_delivery");
    app.use("/api/e_delivery" ,EdeliveryRoute);
    const DdeliveryRoute = require("./routes/d_delivery");
    app.use("/api/d_delivery" ,DdeliveryRoute);
    


    const checkpos = require("./routes/permission");
    app.use("/api/permission" ,  checkpos);


    // Static Files
    //app.use(express.static(path.join(__dirname, 'New_Project')));


    // Login Page
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
      });


    app.use((req, res) => {
        res.status(404).json({ error: 'Route not found' });
    });


    // Server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


  
  

