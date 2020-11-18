const mongoose = require('mongoose');

module.exports = {
    userSchema: new mongoose.Schema({
        "name":  { type: String, required: false },
        "email": { type: String, required: false },
        "password": { type: String, required: true },
        "userId": { type: String, required: true },
        "orders": { type: Array, required: false }
        // "address": {
        //     "delieveryLocation": { 
        //         latitude: { type: Number, require: false },
        //         longitude: { type: Number, required: false }
        //     },
        //     "area": { type: String, required: false}
        // }
    })
}