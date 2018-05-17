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
    if (process.env.MONGO_URL) {
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
    // todo use aggregation
    City.find({ cityName })
        .then(async (cities) => {
            let allBooks = [];

            for (const city of cities) {
                const books = await Book.find({ cityRefs: city.cityId }, 'id title authors');
                allBooks = allBooks.concat(allBooks, books);
            }

            allBooks = allBooks.splice(0, 100)
            resolve(allBooks);
        })
        .catch(reject);
});

// Given a book title, your application plots all cities mentioned in this book onto a map.
exports.getCitiesFromBook = (title) => new Promise((resolve, reject) => {
    // todo no unwind
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
        { $project: { 'city': true, '_id': false } },
        { $limit: 100 }
    ])
        .then((cities) => {
            cities = cities.map((e) => {
                return {
                    cityId: e.city[0].cityId,
                    name: e.city[0].cityName,
                    latitude: e.city[0].location.coordinates[1],
                    longitude: e.city[0].location.coordinates[0]
                }
            })
            resolve(cities)
        })
        .catch(reject)
})

// Given an author name your application lists all books written by that author and plots all cities mentioned in any of the books onto a map.
exports.getCitiesAndBooksFromAuthor = (author) => new Promise((resolve, reject) => {
    Book.aggregate([
        { $match: { authors: author } },
        {
            $lookup:
                {
                    from: 'cities',
                    localField: 'cityRefs',
                    foreignField: 'cityId',
                    as: 'cities',
                }
        },
        { $limit: 100 }
    ])
        .then((books) => {
            books.map((book) => {
                book.cities = book.cities.map((city) => {
                    return {
                        name: city.cityName,
                        latitude: city.location.coordinates[1],
                        longitude: city.location.coordinates[0]
                    }
                })
                delete book.cityRefs // todo project in query
                return book
            })
            resolve(books)
        })
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
        },
        { $limit: 100 }
    ])
        .then((result) => {
            let books = []

            for (let city of result) {
                for (let book of city.books) {
                    book.ref = city.cityName
                    delete book.cityRefs
                    books.push(book)
                }
            }

            resolve(books)
        })
        .catch(reject)
});