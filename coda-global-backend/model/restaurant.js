const mongoose = require('mongoose');

module.exports = {    
    restaurantSchema: new mongoose.Schema({
        "name":  { type: String, required: false },
        "cuisines": { type: Array, required: false },
        "menu": [ new mongoose.Schema({
            name: { type: String, required: true },
            price: { type: Number, required: true },
            ingridiants: { type: Array, required: true },
            imgURL: { type: String, required :true }
        }) ],
        "address": {
            "pickupLocation": { 
                latitude: { type: Number, require: false },
                longitude: { type: Number, required: false }
            },
            "area": { type: String, required: false}
        }
    })    
}