import { Request, Response, NextFunction } from 'express';
import { createProductService, updateProductService, deleteProductService, getAllProductsService, getProductByIdService, filterProductsByQuantityService, filterProductsByCategoryService, getEventLogsService, getProductsWithPagination } from '../services/productService';
import { Product, EventLog } from '../models/productModel'; 

// POST: Add a new product
export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, quantity, category } = req.body;

  try {
    const product: Product = await createProductService(name, quantity, category);
    res.status(201).json({ product });
  } catch (error: any) {
    if (error.message === 'Product with this Name already exists') {
      res.status(400).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

// PUT: Update product details 
export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { id } = req.params;
  const { name, category, quantity } = req.body;

  try {
    // Validate that quantity is not negative
    if (quantity !== undefined && quantity < 0) {
      return res.status(400).json({ error: 'Quantity must be greater than or equal to 0' });
    }

    // Call the service to update the product
    const updatedProduct: Product | null = await updateProductService(Number(id), { name, category, quantity });

    if (updatedProduct) {
      return res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } else {
      return res.status(404).json({ error: 'Product not found' });
    }
  } catch (error: any) {
    next(error); // Pass error to the error handling middleware
  }
};

// DELETE: Delete a product (only if quantity is 0)
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedProduct: Product = await deleteProductService(Number(id));
    return res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

// GET: Retrieve all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products: Product[] = await getAllProductsService();
    return res.status(200).json({ message: 'Products retrieved successfully', products });
  } catch (error: any) {
    return res.status(500).json({ error: 'Server error' });
  }
};

// GET: Retrieve a product by ID
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product: Product = await getProductByIdService(Number(id));
    return res.status(200).json({ message: 'Product retrieved successfully', product });
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
};


// Filter products by category
export const filterProductsByCategory = async (req: Request, res: Response) => {
  const { category } = req.query;

  try {
    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    }

    const products = await filterProductsByCategoryService(category as string);
    return res.status(200).json({ message: 'Products retrieved successfully', products });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};




// Filter products by quantity range
export const filterProductsByQuantity = async (req: Request, res: Response) => {
  const { minQuantity, maxQuantity } = req.query;

  try {
    const min = parseInt(minQuantity as string, 10);
    const max = parseInt(maxQuantity as string, 10);

    const products = await filterProductsByQuantityService(min, max);
    return res.status(200).json({ message: 'Products retrieved successfully', products });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Controller to retrieve all event logs
export const getEventLogs = async (req: Request, res: Response): Promise<Response> => {
  try {
    const logs: EventLog[] = await getEventLogsService();
    return res.status(200).json({ logs });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


// Pagination controller
export const getPaginatedProducts = async (req: Request, res: Response) => {
  try {
    // Ensure page and itemsPerPage are integers and set defaults if undefined
    const page = parseInt(req.query.page as string) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 10;

    // Validate that page and itemsPerPage are valid numbers
    if (isNaN(page) || isNaN(itemsPerPage)) {
      return res.status(400).json({ error: 'Page and itemsPerPage must be valid integers' });
    }

    const { products, totalPages, totalProducts } = await getProductsWithPagination(page, itemsPerPage);

    // Send the response back
    res.status(200).json({
      message: 'Products retrieved successfully',
      products,
      currentPage: page,
      totalPages,
      totalProducts,
    });
  } catch (error: any) {
    console.error('Error retrieving paginated products:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



