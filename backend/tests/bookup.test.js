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
            expect(err).toBeNull();
            console.log(err);
        });
});

test('get books that reference paris', async () => {
    await mongo.getBooksMetionCity('Paris')
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            expect(err).toBeNull();
        });
});