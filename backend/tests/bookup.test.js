const mongo = require('../src/mongo/mongo');

require('dotenv').load();

beforeAll(() => {
    mongo.connect();
});

afterAll(() => {
    mongo.disconnect();
});

test('get cities', async () => {
    await mongo.getCities()
        .then((cities) => {
            expect(cities[0].location).toBeDefined();
            expect(cities[0].cityId).toBeDefined();
            expect(cities[0].cityName).toBeDefined();
        })
        .catch((err) => {
            console.log(err);
        });
});