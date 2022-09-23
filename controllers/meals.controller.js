//Models
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const createMeal = catchAsync(async (req, res, next) => {
  const restaurantId = req.restaurant.id;
  const { name, price } = req.body;

  const newMeal = await Meal.create({ name, price, restaurantId });

  res.status(201).json({
    status: 'succes',
    data: { newMeal },
  });
});

//For the include the param Required Required : true
//if the restaurant is deleted we should not bring its meals even if the meal status is active
const getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: { status: 'active' },
    include: { model: Restaurant, where: { status: 'active' } },
  });

  res.status(200).json({
    status: 'succes',
    data: { meals },
  });
});

//For the include the param Required Required : true
//if the restaurant is deleted we should not bring its meals even if the meal status is active
const getMealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await Meal.findOne({
    where: { id, status: 'active' },
    include: { model: Restaurant, where: { status: 'active' } },
  });

  if (!meal)
    return next(
      new AppError('The restaurant that has this meal is no longer active', 400)
    );

  res.status(200).json({
    status: 'succes',
    data: { meal },
  });
});

const updateMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { meal } = req;

  await meal.update({ name, price });

  res.status(200).json({
    status: 'succes',
    data: { meal },
  });
});

const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: 'deleted' });

  res.status(204).json({ status: 'succes' });
});

module.exports = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
};
