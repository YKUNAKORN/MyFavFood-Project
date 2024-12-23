Restaurant Management Backend System

A web-based backend management system for a restaurant, allowing staff to manage inventory, track orders, and analyze sales efficiently. This project supports the essential backend functionalities of inventory tracking, order management, and sales analysis.

Table of Contents

	•	Project Overview
	•	Features
	•	Technologies Used
	•	Installation
	•	Usage
	•	File Structure
	•	API Endpoints
	•	Contributors

Project Overview

This project is designed to streamline restaurant management tasks by providing a centralized platform to:

	•	Manage inventory items
	•	Track order data
	•	Record and analyze sales data

It includes a backend built with Node.js and Express, a frontend in HTML, CSS, and JavaScript, and a MySQL database for storing restaurant data.

Features

	•	Inventory Management: Add, view, and update inventory items.
	•	Order Tracking: Manage and display orders placed by customers.
	•	Sales Analytics: Generate sales data and basic analysis to assist in decision-making.

Technologies Used

	•	Backend: Node.js, Express
	•	Frontend: HTML, CSS, JavaScript
	•	Database: MySQL
	•	Additional: SQL scripts for setup and sample data

Installation

	1.	Clone the repository:

git clone https://github.com/yourusername/restaurant-management.git
cd restaurant-management


	2.	Install dependencies for the backend:

cd backend
npm install


	3.	Set up the database:
	•	Run the SQL scripts in database/setup.sql to create tables.
	•	Optionally, run database/seed.sql to populate the database with sample data.
	4.	Configure the database connection:
	•	Edit backend/config/db.js to add your database credentials.
	5.	Start the server:

node server.js


	6.	Access the frontend:
	•	Open frontend/index.html in your browser.

Usage

	•	Inventory Management: Navigate to the Inventory page to manage stock data.
	•	Order Tracking: Use the Orders page to view and manage customer orders.
	•	Sales Analytics: Check the Sales page for sales data summaries.

File Structure

restaurant-management-project/
├── backend/
│   ├── server.js                   # Main server file
│   ├── routes/
│   │   ├── inventory.js            # API routes for inventory
│   │   ├── orders.js               # API routes for orders
│   │   └── sales.js                # API routes for sales
│   ├── controllers/
│   │   ├── inventoryController.js  # Business logic for inventory
│   │   ├── ordersController.js     # Business logic for orders
│   │   └── salesController.js      # Business logic for sales
│   ├── models/                     
│   │   └── productModel.js         # Data model for products
│   └── config/                     
│       └── db.js                   # Database connection settings
├── frontend/
│   ├── index.html                  # Main HTML page
│   ├── pages/
│   │   ├── inventory.html          # Inventory page
│   │   ├── orders.html             # Orders page
│   │   └── sales.html              # Sales page
│   ├── css/
│   │   ├── style.css               # Main CSS file
│   └── js/
│       ├── inventory.js            # JS for inventory page
│       ├── orders.js               # JS for orders page
│       └── sales.js                # JS for sales page
├── database/
│   ├── setup.sql                   # SQL file to set up tables
│   └── seed.sql                    # SQL file for sample data
└── README.md                       # Project overview and setup guide

API Endpoints

	•	Inventory
	•	GET /inventory - Retrieve all inventory items
	•	POST /inventory - Add a new inventory item
	•	PUT /inventory/:id - Update an inventory item
	•	DELETE /inventory/:id - Delete an inventory item
	•	Orders
	•	GET /orders - Retrieve all orders
	•	POST /orders - Place a new order
	•	PUT /orders/:id - Update an existing order
	•	DELETE /orders/:id - Cancel an order
	•	Sales
	•	GET /sales - Retrieve sales data

Contributors

	•	Frontend: Kao
	•	Backend: Mo
	•	Database: Folk

This README provides a quick overview and setup guide for the Restaurant Management Backend System, designed to enhance the backend operations of restaurant management through effective inventory, orders, and sales tracking.