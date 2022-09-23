//Models
const { Meal } = require('../models/meal.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const mealExists = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  if (!id) id = req.body.mealId;

  const meal = await Meal.findOne({
    where: { id, status: 'active' },
  });

  if (!meal) return next(new AppError('Meal not found', 404));

  req.meal = meal;
  next();
});

module.exports = { mealExists };
