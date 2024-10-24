import pool from '../config/database';
import { Product } from '../models/productModel'; 

// Function to create a new product
export const createProductService = async (name: string, quantity: number, category: string): Promise<Product> => {
  try {
    // Check if the product name already exists
    const existingProduct = await pool.query(
      'SELECT * FROM products WHERE name = $1',
      [name]
    );

    if (existingProduct.rows.length > 0) {
      throw new Error('Product with this name already exists');
    }

    // Insert new product into the database
    const result = await pool.query(
      'INSERT INTO products (name, quantity, category) VALUES ($1, $2, $3) RETURNING *',
      [name, quantity, category]
    );

    return result.rows[0] as Product; 
  } catch (error) {
    throw error; 
  }
};

interface ProductUpdate {
  name?: string;
  category?: string;
  quantity?: number;
}

// Function to update product details
export const updateProductService = async (id: number, updates: ProductUpdate): Promise<Product | null> => {
  const fields = [];
  const values = [];

  if (updates.name) {
    fields.push('name = $' + (fields.length + 1));
    values.push(updates.name);
  }
  
  if (updates.category) {
    fields.push('category = $' + (fields.length + 1));
    values.push(updates.category);
  }
  
  if (updates.quantity !== undefined) {
    fields.push('quantity = $' + (fields.length + 1));
    values.push(updates.quantity);
  }

  // If no fields are provided to update, return null
  if (fields.length === 0) {
    return null;
  }

  const query = `UPDATE products SET ${fields.join(', ')} WHERE id = $${fields.length + 1} RETURNING *`;
  values.push(id);  // Add the product ID to the values array

  const result = await pool.query(query, values);
  return result.rows[0] as Product;
};

// Function to delete a product
export const deleteProductService = async (id: number): Promise<Product> => {
  try {
    // Check if the product exists and its quantity
    const existingProduct = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

    if (existingProduct.rows.length === 0) {
      throw new Error('Product not found');
    }

    const product = existingProduct.rows[0];

    // Check if the quantity is greater than 0
    if (product.quantity > 0) {
      throw new Error('Cannot delete product with quantity greater than 0');
    }

    // Delete the product
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    return result.rows[0] as Product; // Return the deleted product details
  } catch (error) {
    throw error; 
  }
};

// Function to retrieve all products
export const getAllProductsService = async (): Promise<Product[]> => {
  try {
    const result = await pool.query('SELECT * FROM products');
    return result.rows as Product[]; // Return all products
  } catch (error) {
    throw error; 
  }
};

// Function to retrieve a product by ID
export const getProductByIdService = async (id: number): Promise<Product> => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      throw new Error('Product not found');
    }

    return result.rows[0] as Product; // Return the product
  } catch (error) {
    throw error; 
  }
};


// Service to filter products by category
export const filterProductsByCategoryService = async (category: string) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE category = $1',
      [category]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

// Service to filter products by quantity range
export const filterProductsByQuantityService = async (minQuantity: any, maxQuantity: any) => {
  try {
    // Ensure the query parameters are properly converted to numbers
    const min = parseInt(minQuantity, 10);
    const max = parseInt(maxQuantity, 10);

    // Check if the conversion to number failed
    if (isNaN(min) || isNaN(max)) {
      throw new Error('Quantity range must be valid numbers');
    }

    const result = await pool.query(
      'SELECT * FROM products WHERE quantity BETWEEN $1 AND $2',
      [min, max]
    );
    return result.rows;
  } catch (error) {
    throw error; // Propagate error to be handled in the controller
  }
};

