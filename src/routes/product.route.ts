import { Router } from 'express'
import { createProduct, getProduct, updateProduct, deleteProduct } from '../controllers/product.controllers'
import { requireAdmin } from '../middleware/auth'

export const ProductRouter: Router = Router()

// Example route using caching for listing all products

ProductRouter.get('/', getProduct)
ProductRouter.get('/:id', getProduct)
ProductRouter.post('/', requireAdmin, createProduct)
ProductRouter.put('/:id', requireAdmin, updateProduct)
ProductRouter.delete('/:id', requireAdmin, deleteProduct)
