import catchAsync from './../utils/catchAsync.js'
import AppError from './../utils/AppError.js'
import Order from '../models/orderModel.js'

const addOrderItems = catchAsync(async (req, res) => {
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

export {
    addOrderItems
}