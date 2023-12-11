import { Request, Response } from 'express'
import { createProductValidation, updateProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'
import {
    addProductToDB,
    deleteProductByID,
    getProductByID,
    getProductFromDB,
    updateProductByID
} from '../services/product.services'
import { getDataWithCaching } from '../cache/cache'

export const getProduct = async (req: Request, res: Response) => {
    const {
        params: { id }
    } = req

    if (id) {
        // Cache key for fetching a product by ID
        const cacheKey = `product_by_id_${id}`

        const products = await getDataWithCaching(cacheKey, async () => {
            const product = await getProductByID(id)

            if (product) {
                // Product found, return it in an array
                return [product]
            } else {
                // Product not found, return an empty array
                return []
            }
        })

        if (products.length > 0) {
            logger.info('Success GET Product data by ID')
            return res.status(200).json({ status: true, statusCode: 200, data: products })
        } else {
            return res.status(404).json({ status: true, statusCode: 404, message: 'Product not found', data: null })
        }
    } else {
        // Cache key for fetching all products
        const cacheKey = 'products_all'

        const products: any = await getDataWithCaching(cacheKey, async () => {
            return await getProductFromDB()
        })

        if (products.length > 0) {
            logger.info('Success GET All Products')
            return res.status(200).json({ status: true, statusCode: 200, data: products })
        } else {
            return res.status(404).json({ status: true, statusCode: 404, message: 'No products found', data: null })
        }
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const {
        params: { id }
    } = req

    const { error, value } = updateProductValidation(req.body)
    logger.info(value)
    if (error != null) {
        logger.error('ERR: Product - Update = ', error.details[0].message)
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
    }

    try {
        const result = await updateProductByID(id, value)
        if (result) {
            logger.info('Success Update Product')
            return res.status(201).send({ status: true, statusCode: 201, message: 'Update Product Success ' })
        } else {
            logger.info('Failed Update Product')
            return res.status(404).send({ status: true, statusCode: 404, message: 'Data not found' })
        }
    } catch (error) {
        logger.error('ERR: Product - Update = ', error)
        return res.status(422).send({ status: false, statusCode: 422, message: error })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    const {
        params: { id }
    } = req

    if (id) {
        try {
            const result = await deleteProductByID(id)
            if (result) {
                logger.info('Success Delete Product')
                return res.status(200).send({ status: true, statusCode: 201, message: 'Delete Product Success ' })
            } else {
                logger.info('Failed Delete Product')
                return res.status(404).send({ status: true, statusCode: 404, message: 'Data not found' })
            }
        } catch (error) {
            logger.error('ERR: Product - Delete = ', error)
            return res.status(422).send({ status: false, statusCode: 422, message: error })
        }
    }
}

export const createProduct = async (req: Request, res: Response) => {
    const { error, value } = createProductValidation(req.body)
    logger.info(req.body)
    if (error != null) {
        logger.error('ERR: Product - Create = ', error.details[0].message)
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
    }
    try {
        console.log(value)
        await addProductToDB(value)
        logger.info('Success Add New Product')
        return res.status(201).send({ status: true, statusCode: 201, message: 'Add Product success ' })
    } catch (error) {
        logger.error('ERR: Product - create = ', error)
        return res.status(422).send({ status: false, statusCode: 422, message: error })
    }
}
