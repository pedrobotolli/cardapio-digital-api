import { db } from '../connectors/prisma';
import { Request, Response, NextFunction } from 'express';
import { add } from 'date-fns';


export async function createOrder(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.body.items)
            throw new Error(`Invalid order, the "items" property is required and it must be an array`);
        console.log(typeof (req.body.items))

        let order = await db.order.create({
            data: {
                address: req.body.address,
                telephoneNumber: req.body.telephoneNumber,
                ordererName: req.body.ordererName,
                orderStatusId: 1,
                deliveryTime: add(new Date(), {
                    minutes: 30
                }).toJSON()
            }
        })

        const orderItems = await db.$transaction(
            req.body.items.map((item: any) => {
                let { quantity, additionalInfo, productId } = item
                return db.orderItem.create(
                    {
                        data: { ...{ quantity: parseInt(quantity), additionalInfo: additionalInfo, productId: parseInt(productId) }, orderId: String(order.id) }, include: { product: true }
                    })
            })
        )

        return res.status(201).json({ ...order, orderItems: orderItems });
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
        const order = await db.order.findUnique({
            where: { id: String(req.params.id) },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                },
                orderStatus: true
            }
        });
        return order ? res.status(200).json(order) : res.status(404).json({ error: `Cannot find order with id =  ${req.params.id}` })
    }
    catch (err) {
        next(err)
    }
};


export async function updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
        const order = await db.order.findUnique({ where: { id: String(req.params.id) } });
        if (!order)
            return res.status(404).json({ error: `Cannot find order with id =  ${req.params.id}` });
        const updatedOrder = await db.order.update({ where: { id: String(req.params.id) }, data: req.body });

        if (updatedOrder) {
            return res.status(200).json(updatedOrder);
        } else {
            throw new Error(`Cannot update order`)
        }
    }
    catch (err) {
        next(err)
    }
}


export async function deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
        const deleteOrder = await db.order.delete({ where: { id: String(req.params.id) } });
        return deleteOrder ? res.status(200).json(deleteOrder) : res.status(404).json({ error: `Cannot find order with id =  ${req.params.id}` })
    }
    catch (err) {
        next(err)
    }
}
