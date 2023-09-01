import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/orderController';

const orderRoutes = express.Router()

orderRoutes.route('/').post(createOrder).get(getOrders)
orderRoutes.route('/:id').get(getOrderById).patch(updateOrder).delete(deleteOrder)

export default orderRoutes
