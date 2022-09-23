//Models
const { Meal } = require('../models/meal.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const mealExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: { id, status: 'active' },
  });

  if (!meal) return next(new AppError('Restaurant not found', 404));

  req.meal = meal;
  next();
});

module.exports = { mealExists };
