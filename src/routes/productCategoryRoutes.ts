import express from 'express';
import { createProductCategory, getProductCategories, getProductCategoryById, updateProductCategory, deleteProductCategory } from '../controllers/productCategoryController';

const productCategoryRoutes = express.Router()

productCategoryRoutes.route('/').post(createProductCategory).get(getProductCategories)
productCategoryRoutes.route('/:id').get(getProductCategoryById).patch(updateProductCategory).delete(deleteProductCategory)

export default productCategoryRoutes
