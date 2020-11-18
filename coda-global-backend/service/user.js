const users = require('../dummy-users');
const connectionManger = require('../connection-manager');
const mongoose = require('mongoose');
const userSchema = require('../model/user')

const UserModel = mongoose.model('user', userSchema.userSchema);

module.exports.login = async (userLoginId, userPassword) => {
    const responseObj = {};
    const con = await connectionManger.establishConnection();
    if (con.connection) {
        const res = await UserModel.findOne({ userLoginId: userLoginId, password: userPassword });
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

