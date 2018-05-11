const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: Number,
    title: String,
    authors: [String],
    cityRefs: [Number]
});

module.exports = mongoose.model('Book', schema);