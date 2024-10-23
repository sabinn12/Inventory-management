import pool from './../config/database';

// Function to create a new product
export const createProductService = async (name: string, quantity: number, category: string) => {
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

    return result.rows[0]; // Return the newly created product
  } catch (error) {
    throw error; // Propagate error to be handled in the controller
  }
};

interface ProductUpdate {
    name?: string;
    category?: string;
    quantity?: number;
  }
// Update product details
export const updateProductService = async (id: number, updates: ProductUpdate) => {
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
  return result.rows[0];
};

/// Function to delete a product
export const deleteProductService = async (id: number) => {
    try {
      // Check if the product exists and its quantity
      const existingProduct = await pool.query(
        'SELECT * FROM products WHERE id = $1',
        [id]
      );
  
      if (existingProduct.rows.length === 0) {
        throw new Error('Product not found');
      }
  
      const product = existingProduct.rows[0];
  
      // Check if the quantity is greater than 0
      if (product.quantity > 0) {
        throw new Error('Cannot delete product with quantity greater than 0');
      }
  
      // Delete the product
      const result = await pool.query(
        'DELETE FROM products WHERE id = $1 RETURNING *',
        [id]
      );
  
      return result.rows[0]; // Return the deleted product details
    } catch (error) {
      throw error; // Propagate error to be handled in the controller
    }
  };