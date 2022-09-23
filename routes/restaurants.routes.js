const express = require('express');

//Controllers
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} = require('../controllers/restaurants.controller');
const {
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/review.controller');

// Middlewares
const { restaurantExists } = require('../middlewares/restaurants.middlewares');
const { protectAdmin } = require('../middlewares/auth.middlewares');
const { reviewExists } = require('../middlewares/reviews.middlewares');
const {
  protectSession,
  protectUserReview,
} = require('../middlewares/auth.middlewares');
const {
  createRestaurantValidators,
} = require('../middlewares/validators.middlewares');

const restaurantsRouter = express.Router();

restaurantsRouter.get('/', getAllRestaurants);

restaurantsRouter.get('/:id', restaurantExists, getRestaurantById);

// Protecting below endpoints
restaurantsRouter.use(protectSession);

restaurantsRouter.post('/', createRestaurantValidators, createRestaurant);

restaurantsRouter.patch(
  '/:id',
  protectAdmin,
  restaurantExists,
  updateRestaurant
);

restaurantsRouter.delete(
  '/:id',
  protectAdmin,
  restaurantExists,
  deleteRestaurant
);

restaurantsRouter.post('/reviews/:id', restaurantExists, createReview);

restaurantsRouter.patch(
  '/reviews/:id',
  reviewExists,
  protectUserReview,
  updateReview
);

restaurantsRouter.delete(
  '/reviews/:id',
  reviewExists,
  protectUserReview,
  deleteReview
);

module.exports = { restaurantsRouter };
