import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct
} from '../controllers/productController.js'
import { admin, protect } from '../middlewares/authMiddleware.js'



router.route('/').get(getProducts).post(protect,admin,createProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)

export default router