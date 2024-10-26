
# Inventory Management API

An Inventory Management API for managing product data, including features to create, update, retrieve, and delete products in an inventory. This project is built using Node.js, Express, and PostgreSQL.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Pagination, Filtering, and Event Logging](#pagination-filtering-and-event-logging)
- [Testing](#testing)
- [Technologies](#technologies)

## Features
- Add new products to the inventory.
- Retrieve product details.
- Update existing product information.
- Delete products from the inventory.
- Database connectivity to PostgreSQL.

## Installation

Clone the repository:
```bash
git clone https://github.com/your-username/inventory-management.git
cd inventory-management
```

Install dependencies:
```bash
npm install
```

## Configuration

Set up environment variables: Create a `.env` file in the root directory and add your PostgreSQL configuration:

```plaintext
PORT=3000
DB_USER=inventory_management
DB_PASSWORD=8897
DB_HOST=localhost
DB_PORT=5432
DB_NAME=inventory_management
```

Ensure PostgreSQL is installed and running on your local system. Set up a database using the credentials provided in `.env`.

### Create Database and Tables (if needed)
```sql
CREATE DATABASE inventory_management;
```

## Running the Server

To start the server locally:
```bash
npm start
```
This will start the server on the port specified in your `.env` file or default to port 3000. Access the server at `http://localhost:3000`.

## API Endpoints

- **GET /api/products** - Retrieve all products (supports pagination)
- **POST /api/products** - Create a new product
- **PUT /api/products/:id** - Update a product
- **DELETE /api/products/:id** - Delete a product
- **GET /test-db** - Test database connection, returning the current date and time

### Example Request with cURL
```bash
curl -X POST http://localhost:3000/api/products -H "Content-Type: application/json" -d '{"name":"Laptop","quantity":10,"category":"Electronics"}'
```

## Pagination, Filtering, and Event Logging

### 1. Pagination
Pagination is supported in the product retrieval endpoint. Use `page` and `limit` query parameters to specify the page and number of results per page.

Example:
```bash
GET /api/products?page=1&limit=10
```

### 2. Filtering Products
Filter products by their category or quantity range. Use query parameters such as `category` and `quantity` to filter results.

Example:
```bash
GET /api/products?category=Electronics&quantity=10
```

### 3. Event Logging
The API includes a simple event logging feature that tracks whenever products are added, updated, or deleted. Events are stored in an event log with timestamps, which can be extended to use a database for persistence.

## Testing

### Running All Tests

To test the API, make sure your server is not running (to free up the test port), then run:
```bash
npm test
```
This will execute all test cases, including unit and integration tests, and provide feedback on functionality and coverage.

### Running Product API Tests
To specifically test the Product API endpoints:

1. Ensure the test environment is properly set up. This includes any required database tables and test data.

2. Run the following command:
    ```bash
    jest src/testing/productAdd.test.ts
    ```
This runs tests specific to product addition, verifying that the API is creating products correctly and returning the expected status codes and data structures.

## Technologies
- **Node.js** - Backend runtime environment
- **Express** - Web framework for Node.js
- **PostgreSQL** - Relational database for data storage
- **Jest** - JavaScript testing framework
- **Supertest** - HTTP assertions for testing API endpoints
