import { Router } from 'express';
import { createProduct, updateProduct } from '../controllers/productController';
import { validateProduct, validateProductUpdate } from '../middleware/validateProduct';



const router = Router();

// POST: Create a new product (with validation middleware)
router.post('/products', validateProduct, createProduct);
// PUT: Update product details
// @ts-ignore
router.patch('/products/:id', validateProductUpdate,updateProduct);

export default router;
