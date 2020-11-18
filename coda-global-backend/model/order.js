const mongoose = require('mongoose');

module.exports = {
    orderSchema: new mongoose.Schema({
        "userId": { type: String, required: true },
        "products": [new mongoose.Schema({
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
        })],
        "orderTotal": { type: Number, required: true },
        "orderStatus": { type: String, enum: ['in-progress', 'delievered'], default: 'in-progress' },
        "date": { type: Date , required: true, default: new Date() }
    })
}