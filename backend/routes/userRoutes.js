import express from 'express'
const router = express.Router()
import {
  getUsers,
  getUserById,
  deleteUser,
  authUser,
  getUserProfile,
  registerUser
} from '../controllers/userController.js'

import { protect } from './../middlewares/authMiddleware.js'

router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile)

router.route('/').post(registerUser).get(getUsers)

router
  .route('/:id')
  .get(getUserById)
  .delete(deleteUser)

export default router