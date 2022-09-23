//Models
const { Review } = require('../models/review.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.util');

const createReview = catchAsync(async (req, res, next) => {
  const restaurantId = req.restaurant.id;
  const userId = req.sessionUser.id;
  const { comment, rating } = req.body;

  const newReview = await Review.create({
    userId,
    restaurantId,
    comment,
    rating,
  });

  res.status(201).json({
    status: 'succes',
    data: { newReview },
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { review } = req;

  await review.update({ comment, rating });

  res.status(200).json({
    status: 'succes',
    data: { review },
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: 'deleted' });
  res.status(204).json({ status: 'succes' });
});

module.exports = { createReview, updateReview, deleteReview };
