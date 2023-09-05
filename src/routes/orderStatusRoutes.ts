import express from 'express';
import { createOrderStatus, getOrderStatuses, getOrderStatusById, updateOrderStatus, deleteOrderStatus } from '../controllers/orderStatusController';

const orderStatusRoutes = express.Router()

orderStatusRoutes.route('/').post(createOrderStatus).get(getOrderStatuses)
orderStatusRoutes.route('/:id').get(getOrderStatusById).patch(updateOrderStatus).delete(deleteOrderStatus)

export default orderStatusRoutes
