const mongo = require('../src/mongo/mongo');
require('dotenv').load();

beforeAll(() => {
    return mongo.connect();
});

afterAll(() => {
    mongo.disconnect()
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

test('get books that reference Rome', async () => {
    await mongo.getBooksMetionCity('Rome')
        .then((res) => {
            expect(res.length).toBe(6)
        })
        .catch((err) => {
            expect(err).toBeNull();
        });
});

test('get cities from The Federalist Papers book', async () => {
    await mongo.getCitiesFromBook('The Federalist Papers')
        .then((res) => {
            console.log(res)
            if (res[0] && res[0].city[0]) {
                console.log(res[0].city[0])
            }
        })
        .catch((err) => {
            console.log(err)
        })
})

test('get books and cities from J. Sheridan LeFanu author', async () => {
    await mongo.getCitiesAndBooksFromAuthor('J. Sheridan LeFanu')
        .then((res) => {
            console.log(res)
            if (res[0]) {
                console.log(res[0])
            }
        })
        .catch((err) => {
            console.log(err)
        })
})

test('get books from neaby cities to location', async () => {
    await mongo.getBooksNearLocation(-95, 33)
        .then((res) => {
            console.log(res)
            if (res[0]) {
                console.log(res[0])
            }
        })
        .catch((err) => {
            console.log(err)
        })
})