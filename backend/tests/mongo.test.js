require('dotenv').load();
const axios = require('axios')
const mongo = require('../dist/mongo/mongo');
const server = require('../dist/server')

beforeAll(() => {
    server('localhost', 8080)
    // return mongo.connect(); // started via server
});

afterAll(() => {
    mongo.disconnect()
});

test('get cities', async () => {
    try {
        const cities = await mongo.getCities()
        expect(cities[0].location).toBeDefined();
        expect(cities[0].cityId).toBeDefined();
        expect(cities[0].cityName).toBeDefined();
    } catch (err) {
        expect(err).toBeNull();
    }
});

test('get books that reference Rome', async () => {
    try {
        const res = await mongo.getBooksMetionCity('London')
        expect(res.length).toBeGreaterThan(0)
        console.log(res.length)
    } catch (err) {
        expect(err).toBeNull();
    }
});

test('get cities from The Federalist Papers book', async () => {
    try {
        const res = await mongo.getCitiesFromBook('The Federalist Papers')
        // console.log(res[1])
        expect(res.length).toBeGreaterThan(0)
    } catch (err) {
        expect(err).toBeNull();
    }
})

test('get books and cities from J. Sheridan LeFanu author', async () => {
    try {
        const res = await mongo.getCitiesAndBooksFromAuthor('J. Sheridan LeFanu')
        // console.log(res)
        expect(res.length).toBeGreaterThan(0)
    } catch (err) {
        expect(err).toBeNull();
    }
})

test('get books from nearby cities to location', async () => {
    try {
        const res = await mongo.getBooksNearLocation(12.57, 55.67)
        expect(res.length).toBeGreaterThan(0)
    } catch (err) {
        expect(err).toBeNull();
    }
})

test('api get books that reference Rome', async () => {
    try {
        const res = await axios.post('http://localhost:8080/mongo/query1', { city: 'Rome'})
        // console.log(res.data)
        expect(res.data.length).toBeGreaterThan(0)
    } catch (err) {
        expect(err).toBeNull()
    }
})

test('api get cities from The Federalist Papers book', async () => {
    try {
        const res = await axios.post('http://localhost:8080/mongo/query2', { title: 'The Federalist Papers'})
        // console.log(res.data)
        expect(res.data.length).toBeGreaterThan(0)
    } catch (err) {
        expect(err).toBeNull()
    }
})

test('api get books and cities from J. Sheridan LeFanu author', async () => {
    try {
        const res = await axios.post('http://localhost:8080/mongo/query3', { author: 'J. Sheridan LeFanu'})
        // console.log(res.data)
        expect(res.data.length).toBeGreaterThan(0)
    } catch (err) {
        expect(err).toBeNull()
    }
})

test('api get books from nearby cities to location', async () => {
    try {
        const res = await axios.post('http://localhost:8080/mongo/query4', { lng: 12.57, lat: 55.67 })
        // console.log(res.data)
        expect(res.data.length).toBeGreaterThan(0)
    } catch (err) {
        expect(err).toBeNull()
    }
})
