const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError.util');

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join('. ');

    return next(new AppError(message, 400));
  }

  next();
};

const createUserValidators = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('email').isEmail().withMessage('Must provide a valid email'),
  body('password')
    .isString()
    .withMessage('Password must be a string')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  checkValidations,
];

const createRestaurantValidators = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('address')
    .isString()
    .withMessage('Address must be a string')
    .notEmpty()
    .withMessage('Address cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Address must be at least 3 characters'),
  body('rating')
    .isInt({ min: 0, max: 5 })
    .withMessage('Rating must be an integer from 0 to 5')
    .notEmpty()
    .withMessage('Rating cannot be empty'),
  checkValidations,
];

const createMealValidators = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('price')
    .isInt({ min: 1 })
    .withMessage('Price must be an integer, Price must be at least one')
    .notEmpty()
    .withMessage('Price cannot be empty'),
  checkValidations,
];

module.exports = {
  createUserValidators,
  createRestaurantValidators,
  createMealValidators,
};
