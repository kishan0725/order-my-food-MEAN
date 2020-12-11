const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    orders: [{
        menu: [{
            id: Number,
            name: String,
            price: String,
            quantity: Number,
            hotel: String,
        }],
        amountPaid: Number,
        orderDate: Date
    }]
});

module.exports = mongoose.model('user', userSchema, 'users');