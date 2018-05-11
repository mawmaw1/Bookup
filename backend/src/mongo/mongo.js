const mongoose = require('mongoose');

const City = require('./cityModel');
const Book = require('./bookModel');

mongoose.Promise = global.Promise;
const dbConnectionOpts = {
    'reconnectInterval': 1000,
    'reconnectTries': Number.MAX_VALUE
};

exports.connect = () => {
    mongoose.connect(process.env.MONGO_URL, dbConnectionOpts).
        catch((err) => {
            console.log(err);
        });
};

exports.disconnect = () => mongoose.disconnect();

exports.getCities = () => City.find({}).limit(10);

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

exports.nearGeo = (lng, lat) => {

    const maxDistance = 10000;
    const limit = 10;

    mongoose.connection.db.collection('cities').aggregate([
        {
            '$geoNear': {
                'near': {
                    'coordinates': [
                        lat,
                        lng
                    ],
                    'type': 'Point'
                },
                distanceField: 'dist.calculated',
                maxDistance,
                num: limit,
                spherical: true
            }
        }
    ]);

};