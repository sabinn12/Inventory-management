import request from 'supertest';
import { app } from '../index';
import { Server } from 'http';
import pool from '../config/database';  // Add pool for database connection

describe('Product API tests', () => {
  let server: Server;

  // Start the server before running the tests
  beforeAll((done) => {
    server = app.listen(3000, () => done());
  });

  // Close the server and the database connection after all tests are done
  afterAll((done) => {
    server.close(() => {
      pool.end(() => {  // Close the database pool
        done();
      });
    });
  });

  it('should create a new product and return 201 status', (done) => {
    const newProduct = {
      name: 'Lap',
      quantity: 110,
      category: 'irakiza',
    };

    request(app)
      .post('/api/products')
      .send(newProduct)
      .expect(201)  // Check if status code is 201 Created
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.product).toHaveProperty('id');
        expect(res.body.product.name).toBe(newProduct.name);
        done();  // Signal that the test is complete
      });
  });
});
