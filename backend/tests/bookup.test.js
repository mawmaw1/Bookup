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
        });
});

test('get books that reference paris', async () => {
    await mongo.getBooksMetionCity('Rome')
        .then((res) => {
            expect(res.length).toBe(6)
        })
        .catch((err) => {
            expect(err).toBeNull();
        });
});