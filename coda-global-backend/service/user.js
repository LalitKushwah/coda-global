const users = require('../dummy-users');
const connectionManger = require('../connection-manager');
const mongoose = require('mongoose');
const userSchema = require('../model/user')

const Model = mongoose.model('user', userSchema.userSchema)

module.exports.login = async (userLoginId, userPassword) => {
    const responseObj = {};
    const con = await connectionManger.establishConnection();
    if (con.connection) {
        const res = await Model.findOne({ userLoginId: userLoginId, password: userPassword });
        if (res) {
            responseObj.status = 200;
            responseObj.message = 'User logged in successfully';            
        } else {
            responseObj.status = 403;
            responseObj.message = 'Invalid credentials';
        }    
    } else {
        responseObj.status = 500;
        responseObj.message = 'Problem while connection with database';
    }
    return responseObj
}

module.exports.resetPassword = (userLoginId, password) => {
    let flag = false;
    const responseObj = {};
    users.map(user => {
        if (user.userLoginId == userLoginId) {
            user.password = password
            flag = true;
        }
    })
    if (!flag) {
        responseObj.status = 404;
        responseObj.message = 'User not found';
    } else {
        responseObj.status = 200;
        responseObj.message = 'Password updated successfully';
    }
    return responseObj;
}