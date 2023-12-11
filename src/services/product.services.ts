import ProductModel from '../model/product.model'
import { logger } from '../utils/logger'
import ProductType from '../types/product.type'

export const addProductToDB = async (payload: ProductType) => {
    try {
    // Use the Sequelize create method
        await ProductModel.create({
            product_id: payload.product_id,
            name: payload.name,
            price: payload.price,
            size: payload.size
        })

        console.log('Product added to the database successfully')
    } catch (error) {
        console.error('Error adding product to the database:', error)
        throw new Error('Failed to add product to the database')
    }
}

export const getProductFromDB = async () => {
    try {
        const data = await ProductModel.findAll()
        console.log(data)
        return data
    } catch (error) {
        logger.info('Cannot GET Data')
        logger.error(error)
        throw new Error('Error fetching data from the database')
    }
}

export const getProductByID = async (id: any) => {
    try {
        return await ProductModel.findOne({ where: { product_id: id } })
    } catch (error) {
        logger.info(`Cannot GET Data for product_id ${id}`)
        logger.error(error)
        throw new Error(`Error fetching data for product_id ${id}`)
    }
}

export const updateProductByID = async (id: string, payload: ProductType) => {
    try {
        const [, updatedRows] = await ProductModel.update(payload, {
            where: { product_id: id },
            returning: true // Make sure to include this to get the updated rows
        })

        if (updatedRows.length === 0) {
            throw new Error(`Product with product_id ${id} not found`)
        }

        return updatedRows[0].get()
    } catch (error) {
        logger.error(`Error updating product with product_id ${id}`, error)
        throw new Error(`Error updating product with product_id ${id}`)
    }
}

export const deleteProductByID = async (id: string) => {
    try {
        const deletedRows = await ProductModel.destroy({
            where: { product_id: id }
        })

        if (deletedRows === 0) {
            throw new Error(`Product with product_id ${id} not found`)
        }

        return { message: `Product with product_id ${id} deleted successfully` }
    } catch (error) {
        logger.error(`Error deleting product with product_id ${id}`, error)
        throw new Error(`Error deleting product with product_id ${id}`)
    }
}
