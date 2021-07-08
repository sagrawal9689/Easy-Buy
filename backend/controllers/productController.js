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

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = catchAsync(async (req, res,next) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    return next(new AppError('Product not found',404))
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = catchAsync(async (req, res,next) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = catchAsync(async (req, res,next) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    return next(new AppError('Product not found',404))
  }
})


export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct
}
