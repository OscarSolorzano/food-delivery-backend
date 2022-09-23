const express = require('express');

//Controllers
const {
  createOrder,
  updateOrder,
  cancelOrder,
  getUserOrders,
} = require('../controllers/orders.controller');

//Middlewares
const {
  protectSession,
  protecUserOrder,
} = require('../middlewares/auth.middlewares');
const { mealExists } = require('../middlewares/meals.middlewares');
const {
  orderExists,
  orderIsActive,
} = require('../middlewares/orders.middlewares');

const ordersRouter = express.Router();

ordersRouter.use(protectSession);

ordersRouter.post('/', mealExists, createOrder);

ordersRouter.get('/me', getUserOrders);

ordersRouter.patch(
  '/:id',
  orderExists,
  protecUserOrder,
  orderIsActive,
  updateOrder
);

ordersRouter.delete(
  '/:id',
  orderExists,
  protecUserOrder,
  orderIsActive,
  cancelOrder
);

module.exports = { ordersRouter };
