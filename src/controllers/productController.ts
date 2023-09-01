import { db } from '../connectors/prisma';
import { Request, Response, NextFunction } from 'express';

export async function createProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const product = await db.product.create({ data: req.body });
        return res.status(201).json(product);
    }
    catch (err) {
        next(err)
    }
}

export async function getProducts(req: Request, res: Response, next: NextFunction) {
    try {
        let products: any;
        if (req.query.category) {
            products = await db.product.findMany({
                where: {
                    productCategoryId: Number(req.query.category)
                }
            });
        } else {
            products = await db.product.findMany();
        }
        return res.status(200).json(products);
    }
    catch (err) {
        next(err)
    }
};

export async function getProductById(req: Request, res: Response, next: NextFunction) {
    try {
        const product = await db.product.findUnique({ where: { id: Number(req.params.id) } });
        return product ? res.status(200).json(product) : res.status(404).json({ error: `Cannot find product with id =  ${req.params.id}` })
    }
    catch (err) {
        next(err)
    }
};


export async function updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const product = await db.product.findUnique({ where: { id: Number(req.params.id) } });
        if (!product)
            return res.status(404).json({ error: `Cannot find product with id =  ${req.params.id}` });

        const updatedProduct = await db.product.update({ where: { id: Number(req.params.id) }, data: req.body });

        if (updatedProduct) {
            return res.status(200).json(updatedProduct);
        } else {
            throw new Error(`Cannot update product category`)
        }
    }
    catch (err) {
        next(err)
    }
}


export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const deleteProduct = await db.product.delete({ where: { id: Number(req.params.id) } });
        return deleteProduct ? res.status(200).json(deleteProduct) : res.status(404).json({ error: `Cannot find product with id =  ${req.params.id}` })
    }
    catch (err) {
        next(err)
    }
}
