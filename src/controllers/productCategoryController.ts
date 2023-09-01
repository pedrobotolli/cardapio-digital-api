import { db } from '../connectors/prisma';
import { Request, Response, NextFunction } from 'express';

export async function createProductCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const productCategory = await db.productCategory.create({ data: req.body });
        return res.status(201).json(productCategory);
    }
    catch (err) {
        next(err)
    }
}

export async function getProductCategories(req: Request, res: Response, next: NextFunction) {
    try {
        const productCategories = await db.productCategory.findMany();
        return res.status(200).json(productCategories)
    }
    catch (err) {
        next(err)
    }
};

export async function getProductCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
        const productCategory = await db.productCategory.findUnique({ where: { id: Number(req.params.id) } });
        return productCategory?res.status(200).json(productCategory):res.status(404).json({error: `Cannot find product category with id =  ${req.params.id}`})
    
    }
    catch (err) {
        next(err)
    }
};


export async function updateProductCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const productCategory = await db.productCategory.findUnique({ where: { id: Number(req.params.id) } });
        if(!productCategory)
            return res.status(404).json({error: `Cannot find product category with id =  ${req.params.id}`});
        
        const updatedProductCategory = await db.productCategory.update({ where: { id: Number(req.params.id) }, data: req.body });
        
        if(updatedProductCategory){
            return res.status(200).json(updatedProductCategory);
        }else{
            throw new Error(`Cannot update product category`)
        }
    }
    catch (err) {
        next(err)
    }
}


export async function deleteProductCategory(req: Request, res: Response, next: NextFunction) {
    try {        
        const deleteProductCategory = await db.productCategory.delete({ where: { id: Number(req.params.id) } });
        return deleteProductCategory?res.status(200).json(deleteProductCategory):res.status(404).json({error: `Cannot find product category with id =  ${req.params.id}`})
    }
    catch (err) {
        next(err)
    }
}
