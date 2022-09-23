//Models
const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.util');

const createOrder = catchAsync(async (req, res, next) => {
  const { price } = req.meal;
  const { quantity, mealId } = req.body;
  const userId = req.sessionUser.id;
  const totalPrice = quantity * price;

  const newOrder = await Order.create({
    quantity,
    mealId,
    userId,
    totalPrice,
  });

  res.status(201).json({
    status: 'succes',
    data: { newOrder },
  });
});

const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;
  await order.update({ status: 'completed' });

  res.status(200).json({
    status: 'succes',
    data: { order },
  });
});

const cancelOrder = catchAsync(async (req, res, next) => {
  const { order } = req;
  await order.update({ status: 'cancelled' });

  res.status(204).json({
    status: 'succes',
  });
});

const getUserOrders = catchAsync(async (req, res, next) => {
  const userId = req.sessionUser.id;
  const orders = await Order.findAll({
    where: { userId },
    include: { model: Meal, include: Restaurant },
  });

  res.status(200).json({
    status: 'succes',
    data: { orders },
  });
});

const getOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: { id },
    include: { model: Meal, include: Restaurant },
  });

  res.status(200).json({
    status: 'succes',
    data: { order },
  });
});

module.exports = {
  createOrder,
  updateOrder,
  cancelOrder,
  getUserOrders,
  getOrderById,
};
