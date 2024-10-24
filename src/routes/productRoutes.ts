import { Router } from 'express';
import { createProduct, updateProduct, deleteProduct, getAllProducts,  getProductById, filterProductsByCategory, filterProductsByQuantity, getEventLogs} from '../controllers/productController';
import { validateProduct, validateProductUpdate, validateQuantityFilter } from '../middleware/validateProduct';



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

// Route to filter products by category
//@ts-ignore
router.get('/products/filter/category', filterProductsByCategory);

// Route to filter products by quantity range
//@ts-ignore
router.get('/products/filter/quantity', validateQuantityFilter, filterProductsByQuantity);

// Route to get all event logs
//@ts-ignore
router.get('/event-logs', getEventLogs);


export default router;
