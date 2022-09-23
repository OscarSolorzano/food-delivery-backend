const express = require('express');

// Controllers
const {
  createUser,
  updateUser,
  deleteUser,
  login,
} = require('../controllers/users.controller');
const {
  getUserOrders,
  getOrderById,
} = require('../controllers/orders.controller');

// Middlewares
const { userExists } = require('../middlewares/users.middlewares');
const { orderExists } = require('../middlewares/orders.middlewares');
const {
  protectSession,
  protectUsersAccount,
  protecUserOrder,
} = require('../middlewares/auth.middlewares');
const {
  createUserValidators,
} = require('../middlewares/validators.middlewares');

const usersRouter = express.Router();

usersRouter.post('/singup', createUserValidators, createUser);

usersRouter.post('/login', login);

// Protecting below endpoints
usersRouter.use(protectSession);

usersRouter.patch('/:id', userExists, protectUsersAccount, updateUser);

usersRouter.delete('/:id', userExists, protectUsersAccount, deleteUser);

usersRouter.get('/orders', getUserOrders);

usersRouter.get('/orders/:id', orderExists, protecUserOrder, getOrderById);

module.exports = { usersRouter };
