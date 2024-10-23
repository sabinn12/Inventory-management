import { Router } from 'express';
import { createProduct, updateProduct, deleteProduct, getAllProducts,  getProductById} from '../controllers/productController';
import { validateProduct, validateProductUpdate } from '../middleware/validateProduct';



const router = Router();

// POST
router.post('/products', validateProduct, createProduct);

// PUT
// @ts-ignore
router.patch('/products/:id', validateProductUpdate,updateProduct);

// DELETE
// @ts-ignore
router.delete('/products/:id', deleteProduct);

// GET
// @ts-ignore
router.get('/products', getAllProducts);

// GET: Retrieve a product by ID
// @ts-ignore
router.get('/products/:id', getProductById);

export default router;
