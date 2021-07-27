import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = catchAsync(async (req, res,next) => {

  const products = await Product.find()
  //return next(new AppError('some err'))
  res.json({ products })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = catchAsync(async (req, res,next) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
      return next(new AppError('Product not found',404))
  }
})


const createProduct = catchAsync(async (req, res,next) => {
  
  console.log("hi");
  
  const {
    name,
    price,
    description,
    image,
    countInStock,
    user
  } = req.body

  const product = new Product({
    name,
    price,
    user,
    image,
    countInStock,
    description,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})


export {
  getProducts,
  getProductById,
  createProduct
}
