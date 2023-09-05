import { db } from '../connectors/prisma';
import { Request, Response, NextFunction } from 'express';

export async function createOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
        const orderStatus = await db.orderStatus.create({ data: req.body });
        return res.status(201).json(orderStatus);
    }
    catch (err) {
        next(err)
    }
}

export async function getOrderStatuses(req: Request, res: Response, next: NextFunction) {
    try {
        let orderStatuses: any = await db.orderStatus.findMany();
        return res.status(200).json(orderStatuses);
    }
    catch (err) {
        next(err)
    }
};

export async function getOrderStatusById(req: Request, res: Response, next: NextFunction) {
    try {
        const orderStatus = await db.orderStatus.findUnique({ where: { id: Number(req.params.id) } });
        return orderStatus ? res.status(200).json(orderStatus) : res.status(404).json({ error: `Cannot find orderStatus with id =  ${req.params.id}` })
    }
    catch (err) {
        next(err)
    }
};


export async function updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
        const orderStatus = await db.orderStatus.findUnique({ where: { id: Number(req.params.id) } });
        if (!orderStatus)
            return res.status(404).json({ error: `Cannot find orderStatus with id =  ${req.params.id}` });

        const updatedOrderStatus = await db.orderStatus.update({ where: { id: Number(req.params.id) }, data: req.body });

        if (updatedOrderStatus) {
            return res.status(200).json(updatedOrderStatus);
        } else {
            throw new Error(`Cannot update orderStatus`)
        }
    }
    catch (err) {
        next(err)
    }
}


export async function deleteOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
        const deleteOrderStatus = await db.orderStatus.delete({ where: { id: Number(req.params.id) } });
        return deleteOrderStatus ? res.status(200).json(deleteOrderStatus) : res.status(404).json({ error: `Cannot find orderStatus with id =  ${req.params.id}` })
    }
    catch (err) {
        next(err)
    }
}
