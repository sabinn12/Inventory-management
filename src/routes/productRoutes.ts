import { Router } from 'express';
import { createProduct, updateProduct, deleteProduct, getAllProducts,  getProductById} from '../controllers/productController';
import { validateProduct, validateProductUpdate } from '../middleware/validateProduct';



const router = Router();

// POST: Create a new product (with validation middleware)
router.post('/products', validateProduct, createProduct);
// PUT: Update product details
// @ts-ignore
router.patch('/products/:id', validateProductUpdate,updateProduct);

// DELETE: Delete a product (only if quantity is 0)
// @ts-ignore
router.delete('/products/:id', deleteProduct);

// GET: Retrieve all products
// @ts-ignore
router.get('/products', getAllProducts);

// GET: Retrieve a product by ID
// @ts-ignore
router.get('/products/:id', getProductById);

export default router;
