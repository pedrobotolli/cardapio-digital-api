import { db } from '../connectors/prisma';
import { Request, Response, NextFunction } from 'express';

export async function createOrder(req: Request, res: Response, next: NextFunction) {
    try {
        const order = await db.order.create({ data: req.body });
        return res.status(201).json(order);
    }
    catch (err) {
        next(err)
    }
}

export async function getOrders(req: Request, res: Response, next: NextFunction) {
    try {
        const orders = await db.order.findMany();
        return res.status(200).json(orders)
    }
    catch (err) {
        next(err)
    }
};

export async function getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
        const order = await db.order.findUnique({ where: { id: Number(req.params.id) } });
        return order?res.status(200).json(order):res.status(404).json({error: `Cannot find order with id =  ${req.params.id}`})
    
    }
    catch (err) {
        next(err)
    }
};


export async function updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
        const order = await db.order.findUnique({ where: { id: Number(req.params.id) } });
        if(!order)
            return res.status(404).json({error: `Cannot find order with id =  ${req.params.id}`});
        const updatedOrder = await db.order.update({ where: { id: Number(req.params.id) }, data: req.body });
        
        if(updatedOrder){
            return res.status(200).json(updatedOrder);
        }else{
            throw new Error(`Cannot update order`)
        }
    }
    catch (err) {
        next(err)
    }
}


export async function deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {        
        const deleteOrder = await db.order.delete({ where: { id: Number(req.params.id) } });
        return deleteOrder?res.status(200).json(deleteOrder):res.status(404).json({error: `Cannot find order with id =  ${req.params.id}`})
    }
    catch (err) {
        next(err)
    }
}
