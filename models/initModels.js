// Models
const { User } = require('./user.model');
const { Order } = require('../models/order.model');
const { Review } = require('../models/review.model');
const { Restaurant } = require('../models/restaurant.model');
const { Meal } = require('../models/meal.model');

const initModels = () => {
  // 1 User <---> M Order
  User.hasMany(Order, {
    foreignKey: 'userId',
  });
  Order.belongsTo(User);

  // 1 User <---> M Review
  User.hasMany(Order, {
    foreignKey: 'userId',
  });
  Review.belongsTo(User);

  //1 Restaurant <---> M Review
  Restaurant.hasMany(Review, {
    foreignKey: 'restaurantId',
  });
  Review.belongsTo(Restaurant);

  // 1 Restaurant <---> M Meal
  Restaurant.hasMany(Meal, {
    foreignKey: 'restaurantId',
  });
  Meal.belongsTo(Restaurant);

  //1 Meal <---> M Order
  // Meal.hasOne(Order, { foreignKey: 'mealId' });
  // Order.belongsTo(Meal);
};

module.exports = { initModels };
