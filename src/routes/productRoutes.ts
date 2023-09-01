import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController';

const productRoutes = express.Router()

productRoutes.route('/').post(createProduct).get(getProducts)
productRoutes.route('/:id').get(getProductById).patch(updateProduct).delete(deleteProduct)

export default productRoutes
