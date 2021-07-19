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

const getMyOrders = catchAsync(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

const updateOrderToPaid = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    return next(new AppError('Order not found',404))
  }
})

export {
    addOrderItems,
    getOrderById,
    getMyOrders,
    updateOrderToPaid
}