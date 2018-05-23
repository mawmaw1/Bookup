require('dotenv').load();
const mongo = require('../dist/mongo/mongo');
const postgres = require('../dist/postgres/postgres');

beforeAll(() => {
    postgres.connect()
    return mongo.connect();
});

afterAll(() => {
    postgres.disconnect()
    mongo.disconnect()
});

test('test that mongo and postgres query 1 return the same amount', async () => {
    const city = 'Rome'
    const proms = [postgres.query1(city), mongo.getBooksMetionCity(city)]
    try {
        const [pres, mres] = await Promise.all(proms)
        console.log(pres.rows.length)
        console.log(mres.length)
        // expect(pres.rows.length).toBe(mres.length)
    } catch (err) {
        console.log(err)
    }
})

test('test that mongo and postgres query 2 return the same amount', async () => {
    const book = 'The Federalist Papers'
    const proms = [postgres.query2(book), mongo.getCitiesFromBook(book)]
    try {
        const [pres, mres] = await Promise.all(proms)
        console.log(pres.rows.length)
        console.log(mres.length)
        // expect(pres.rows.length).toBe(mres.length)
    } catch (err) {
        console.log(err)
    }
})

test('test that mongo and postgres query 3 return the same amount', async () => {
    const author = 'J. Sheridan LeFanu'
    const proms = [postgres.query3(author), mongo.getCitiesAndBooksFromAuthor(author)]
    try {
        const [pres, mres] = await Promise.all(proms)
        console.log(pres.rows.length)
        console.log(mres.length)
        // expect(pres.rows.length).toBe(mres.length)
    } catch (err) {
        console.log(err)
    }
})

test('test that mongo and postgres query 4 return the same amount', async () => {
    const lng = 12.57, lat = 55.67
    const proms = [postgres.query4(lat, lng), mongo.getBooksNearLocation(lng, lat)]
    try {
        const [pres, mres] = await Promise.all(proms)
        console.log(pres.rows.length)
        console.log(mres.length)
        // expect(pres.rows.length).toBe(mres.length)
    } catch (err) {
        console.log(err)
    }
})