import { Request, Response, NextFunction } from 'express';
import { createProductService, updateProductService } from '../services/productService';

// POST: Add a new product
export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, quantity, category } = req.body;

  try {
    const product = await createProductService(name, quantity, category);
    res.status(201).json({ product });
  } catch (error: any) {
    if (error.message === 'Product with this name already exists') {
      res.status(400).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

// PUT: Update product details (name, category, quantity)
export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { id } = req.params;
    const { name, category, quantity } = req.body;

    try {
        // Validate that quantity is not negative
        if (quantity !== undefined && quantity < 0) {
            return res.status(400).json({ error: 'Quantity must be greater than or equal to 0' });
        }

        // Call the service to update the product
        const updatedProduct = await updateProductService(Number(id), { name, category, quantity });

        if (updatedProduct) {
            return res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error: any) {
         next(error); // Pass error to the error handling middleware
    }
};