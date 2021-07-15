import catchAsync from './../utils/catchAsync.js'
import AppError from './../utils/AppError.js'
import Order from '../models/orderModel.js'

const addOrderItems = catchAsync(async (req, res,next) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    } = req.body
  
    if (orderItems && orderItems.length === 0) {
      return next(new AppError('No order items',400))
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        totalPrice,
      })
  
      const createdOrder = await order.save()
  
      res.status(201).json(createdOrder)
    }
})

const getOrderById = catchAsync(async (req, res,next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    return next(new AppError('Order not found',404))
  }
})

export {
    addOrderItems,
    getOrderById
}