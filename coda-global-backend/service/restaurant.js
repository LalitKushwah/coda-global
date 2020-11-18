
const connectionManger = require('../connection-manager');
const mongoose = require('mongoose');
const restaurantSchema = require('../model/restaurant');
const RestaurantModel = mongoose.model('restaurant', restaurantSchema.restaurantSchema)

module.exports.getRestaurantList = async (searchTerm) => {
    const responseObj = {};
    let query = searchTerm === 'all' ? {} : {
        $or: [
            {
                "address.area": searchTerm
            },
            {
                "menu.name": searchTerm
            }
        ]
    }
    query = JSON.stringify(query);
    query = JSON.parse(query);
    try {
        const con = await connectionManger.establishConnection();
        if (con.connection) {
            const res = await RestaurantModel.find(query);
            if (res.length) {
                responseObj.status = 200;
                responseObj.message = 'User logged in successfully';
                responseObj.body = res;
            } else {
                responseObj.status = 404;
                responseObj.message = 'Restaurant not found';
                responseObj.body = res;
            }
        } else {
            responseObj.status = 500;
            responseObj.message = 'Problem while connection with database';
        }
        return responseObj;
    } catch (error) {
        responseObj.status = 500;
        responseObj.message = error;
        return responseObj
    }    
}