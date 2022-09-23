const express = require('express');

//Controllers
const {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
} = require('../controllers/meals.controller');

//Middlewares
const { protectSession } = require('../middlewares/auth.middlewares');
const { restaurantExists } = require('../middlewares/restaurants.middlewares');
const { mealExists } = require('../middlewares/meals.middlewares');
const {
  createMealValidators,
} = require('../middlewares/validators.middlewares');

const mealsRouter = express.Router();

mealsRouter.get('/', getAllMeals);

mealsRouter.get('/:id', mealExists, getMealById);

// Protecting below endpoints
mealsRouter.use(protectSession);

mealsRouter.post('/:id', restaurantExists, createMealValidators, createMeal);

mealsRouter.patch('/:id', mealExists, updateMeal);

mealsRouter.delete('/:id', mealExists, deleteMeal);

module.exports = { mealsRouter };
