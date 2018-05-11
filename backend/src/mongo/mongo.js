const mongoose = require('mongoose');

const City = require('./cityModel');
const Book = require('./bookModel');

mongoose.Promise = global.Promise;
const dbConnectionOpts = {
    'reconnectInterval': 1000,
    'reconnectTries': Number.MAX_VALUE
};

exports.connect = () => {
    let url = 'mongodb://localhost:27017/gutenberg'
    if (process.env.MONGO_URL && process.env.NODE_ENV !== 'test') {
        url = process.env.MONGO_URL
    }
    return mongoose.connect(url, dbConnectionOpts)
        .then(() => {
            console.log('connected to ' + url)
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.disconnect = () => mongoose.disconnect();

exports.getCities = () => City.find({}).limit(10);

// Given a city name your application returns all book titles with corresponding authors that mention this city.
// Returns promise with books that mention the cityName
exports.getBooksMetionCity = (cityName) => new Promise((resolve, reject) => {
    // Can return multiple cities with same name
    City.find({ cityName })
        .then(async (cities) => {
            let allBooks = [];

            for (const city of cities) {
                const books = await Book.find({ cityRefs: city.cityId }, 'title authors');
                allBooks = allBooks.concat(allBooks, books);
            }

            resolve(allBooks);
        })
        .catch(reject);
});

// Given a book title, your application plots all cities mentioned in this book onto a map.
exports.getCitiesFromBook = (title) => new Promise((resolve, reject) => {
    Book.aggregate([
        { $match: { title } },
        { $unwind: '$cityRefs' },
        {
            $lookup:
                {
                    from: 'cities',
                    localField: 'cityRefs',
                    foreignField: 'cityId',
                    as: 'city',
                }
        },
        { $project: { 'city': true, '_id': false } }
    ])
        .then(resolve)
        .catch(reject)
})

// Given an author name your application lists all books written by that author and plots all cities mentioned in any of the books onto a map.
exports.getCitiesAndBooksFromAuthor = (author) => new Promise((resolve, reject) => {
    Book.aggregate([
        { $match: { authors: author } },
        { $unwind: '$cityRefs' },
        {
            $lookup:
                {
                    from: 'cities',
                    localField: 'cityRefs',
                    foreignField: 'cityId',
                    as: 'city',
                }
        },
    ])
        .then(resolve)
        .catch(reject)
})

// Given a geolocation, your application lists all books mentioning a city in vicinity of the given geolocation.
exports.getBooksNearLocation = (lng, lat) => new Promise((resolve, reject) => {
    const maxDistance = 100000;
    const limit = 10;

    City.aggregate([
        {
            $geoNear: {
                near: {
                    coordinates: [
                        lng,
                        lat
                    ],
                    type: 'Point'
                },
                distanceField: 'dist.calculated',
                maxDistance,
                num: limit,
                spherical: true
            }
        },
        {
            $lookup:
                {
                    from: 'books',
                    localField: 'cityId',
                    foreignField: 'cityRefs',
                    as: 'books',
                }
        }
    ])
        .then(resolve)
        .catch(reject)
});