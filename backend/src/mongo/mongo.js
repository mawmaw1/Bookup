const mongoose = require('mongoose');
const City = require('./cityModel');

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

exports.getBooksMetionCity = (cityName) => {

    mongoose.connection.db.collection('cities').aggregate([
        {'$match': {cityName}},
        {'$project': {}}
    ]);

};

exports.nearGeo = (lng, lat) => {

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
                'distanceField': 'dist.calculated',
                'maxDistance': 100000,
                'num': 5,
                'spherical': true
            }
        }
    ]);

};