import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Defining  the validation schema for product data
const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
  quantity: Joi.number().integer().min(0).required(),
  category: Joi.string().min(3).required(),
});


// Middleware to validate product input
export const validateProduct = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = productSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      next(); 
    }
  };

  // middleware to  validate updated product 

  export const validateProductUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { name, category, quantity } = req.body;
  
    // Validate quantity
    if (quantity !== undefined && (isNaN(quantity) || quantity < 0)) {
      return res.status(400).json({ error: 'Quantity must be a valid number and >= 0' });
    }
  
    // Validate name and category
    if (name !== undefined && name.trim() === '') {
      return res.status(400).json({ error: 'Name cannot be empty' });
    }
    if (category !== undefined && category.trim() === '') {
      return res.status(400).json({ error: 'Category cannot be empty' });
    }
  
    next();
  };


  // Middleware to validate the quantity filter
export const validateQuantityFilter = (req: Request, res: Response, next: NextFunction) => {
  const { minQuantity, maxQuantity } = req.query;

  // Ensure both minQuantity and maxQuantity are present
  if (!minQuantity || !maxQuantity) {
    return res.status(400).json({ error: 'Both minQuantity and maxQuantity are required' });
  }

  // Parse and validate they are numbers
  const min = parseInt(minQuantity as string, 10);
  const max = parseInt(maxQuantity as string, 10);

  if (isNaN(min) || isNaN(max)) {
    return res.status(400).json({ error: 'Quantity values must be valid numbers' });
  }

  next(); // Proceed to the controller if validation passes
};

