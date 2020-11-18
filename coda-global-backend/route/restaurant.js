const express = require('express');
const router = express.Router();
const restaurantController = require('../controller/restaurant');


router.get('', restaurantController.getRestaurantList)

module.exports = router