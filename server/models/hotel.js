const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    id: String,
    name: String,
    address: String,
    cuisines: String,
    rating: String,
    reviews: String,
    feature_image: String,
    thumbnail_image: String,
    menu: [{
        id: Number,
        name: String,
        desc: String,
        price: Number
    }]
});

module.exports = mongoose.model('hotel', hotelSchema, 'hotels');