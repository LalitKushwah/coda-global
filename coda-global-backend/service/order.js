
const connectionManger = require('../connection-manager');
const mongoose = require('mongoose');
const orderSchema = require('../model/order');
const OrderModal = mongoose.model('order', orderSchema.orderSchema)

module.exports.getOrderByUserId = async (userId) => {
    const responseObj = {};
    let query = { "userId": userId }
    query = JSON.stringify(query);
    query = JSON.parse(query);
    try {
        const con = await connectionManger.establishConnection();
        if (con.connection) {
            const res = await OrderModal.find(query);
            if (res.length) {
                responseObj.status = 200;
                responseObj.message = 'Orders fetched successfully';
                responseObj.body = res;
            } else {
                responseObj.status = 404;
                responseObj.message = 'No orders found';
                responseObj.body = res;
            }
        } else {
            responseObj.status = 500;
            responseObj.message = 'Problem while connection with database';
        }
        return responseObj;
    } catch (error) {
        responseObj.status = 500;
        responseObj.message = 'Internal Server Error'
        return responseObj
    }    
}
module.exports.createOrder = async (serviceData) => {    
    const responseObj = {};
    // serviceData.date = new Date();
    let sum = 0;
    serviceData.products.map(item => {
        item.quantity = item.quantity ? Number(item.quantity) : 1
        sum = sum + (Number(item.price) * item.quantity);
    })
    serviceData.orderTotal = sum;
    console.log(serviceData);
    try {
        const con = await connectionManger.establishConnection();
        if (con.connection) {
            const order = new OrderModal(serviceData);            
            const res = await order.save();
            console.log(res);
            if (res) {
                responseObj.status = 200;
                responseObj.message = 'Order placed successfully';
                responseObj.body = res;
            } else {
                responseObj.status = 403;
                responseObj.message = 'Error while placing order';
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