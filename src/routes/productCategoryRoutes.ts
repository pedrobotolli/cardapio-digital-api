import express from 'express';
import { createProductCategory, getAllProductCategories, getProductCategoryById, updateProductCategory, deleteProductCategory } from '../controllers/productCategoryController';

const productCategoryRoutes = express.Router()

productCategoryRoutes.route('/').post(createProductCategory).get(getAllProductCategories)
productCategoryRoutes.route('/:id').get(getProductCategoryById).patch(updateProductCategory).delete(deleteProductCategory)

export default productCategoryRoutes
