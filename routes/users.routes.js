const express = require('express');

// Controllers
const {
  createUser,
  updateUser,
  deleteUser,
  login,
  getOrders,
  getOrderById,
} = require('../controllers/users.controller');

// Middlewares
const { userExists } = require('../middlewares/users.middlewares');
const { orderExists } = require('../middlewares/orders.middlewares');
const {
  protectSession,
  protectUsersAccount,
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

usersRouter.get('/orders', getOrders);

usersRouter.get('/orders/:id', orderExists, getOrderById);

module.exports = { usersRouter };
