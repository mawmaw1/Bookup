const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    cityId: Number,
    cityName: String,
    location: {
        coordinates: [Number],
        type: { type: String }
    }
});

module.exports = mongoose.model('City', schema);