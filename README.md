Inventory Management API
## Table of Contents
- Features
- Installation
- Configuration
- Running the Server
- API Endpoints
- Testing
- Running Product API Tests
- Technologies
Features

- Add new products to the inventory.
- Retrieve product details.
- Update existing product information.
- Delete products from the inventory.
- Database connectivity to PostgreSQL.

Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/inventory-management.git
   cd inventory-management
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your PostgreSQL configuration:
   ```plaintext
   PORT=3000
   DB_USER=inventory_management
   DB_PASSWORD=8897
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=inventory_management
   ```

Configuration

Ensure PostgreSQL is installed and running on your local system. Set up a database using the credentials provided in `.env`.

1. **Create Database and Tables** (if needed):
   ```sql
   CREATE DATABASE inventory_management;
   ```
   Use your preferred method to create any required tables within this database.

Running the Server

To start the server locally:

```bash
npm start
```

This will start the server on the port specified in your `.env` file or default to port 3000. Access the server at `http://localhost:3000`.

API Endpoints

- **GET** `/api/products` - Retrieve all products
- **POST** `/api/products` - Create a new product
- **PUT** `/api/products/:id` - Update a product
- **DELETE** `/api/products/:id` - Delete a product
- **GET** `/test-db` - Test database connection, returning the current date and time


### Example Request with cURL

```bash
curl -X POST http://localhost:3000/api/products -H "Content-Type: application/json" -d '{"name":"Laptop","quantity":10,"category":"Electronics"}'
```

Testing

### Running All Tests

To test the API, make sure your server is not running (to free up the test port), then run:

```bash
npm test
```

This will execute all test cases, including unit and integration tests, and provide feedback on functionality and coverage.

Running Product API Tests

To specifically test the Product API endpoints:

1. **Ensure the test environment is properly set up**. This includes any required database tables and test data.

2. Run the following command:
   ```bash
   jest src/testing/productAdd.test.ts
   ```

   This runs tests specific to product addition, verifying that the API is creating products correctly and returning the expected status codes and data structures.


### Example Product API Test Code

The `productAdd.test.ts` file includes tests that:
- Check the creation of a new product via the `/api/products` endpoint.
- Verify that the response status code is `201`.
- Validate that the product object in the response includes an ID and matches the input data.

Technologies

- **Node.js** - Backend runtime environment
- **Express** - Web framework for Node.js
- **PostgreSQL** - Relational database for data storage
- **Jest** - JavaScript testing framework
- **Supertest** - HTTP assertions for testing API endpoints