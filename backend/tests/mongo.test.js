const axios = require('axios')

const mongo = require('../src/mongo/mongo');
const server = require('../src/server')
require('dotenv').load();

beforeAll(() => {
    server('localhost', 8080)
    // return mongo.connect();
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
        const res = await mongo.getBooksMetionCity('Rome')
        expect(res.length).toBeGreaterThan(0)
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
        console.log(res)
        expect(res.length).toBeGreaterThan(0)
    } catch (err) {
        expect(err).toBeNull();
    }
})

test('get books from neaby cities to location', async () => {
    try {
        const res = await mongo.getBooksNearLocation(-95, 33)
        expect(res.length).toBeGreaterThan(0)
    } catch (err) {
        expect(err).toBeNull();
    }
})

test('api get books that reference Rome', async () => {
    try {
        const res = await axios.post('http://localhost:8080/mongo/query1', { city: 'Rome'})
        // console.log(res.data)
        expect(res.data.length).toBe(100)
    } catch (err) {
        expect(err).toBeNull()
    }
})

test('api get cities from The Federalist Papers book', async () => {
    try {
        const res = await axios.post('http://localhost:8080/mongo/query2', { title: 'The Federalist Papers'})
        // console.log(res.data)
        expect(res.data.length).toBe(32)
    } catch (err) {
        expect(err).toBeNull()
    }
})

test('api get books and cities from J. Sheridan LeFanu author', async () => {
    try {
        const res = await axios.post('http://localhost:8080/mongo/query3', { author: 'J. Sheridan LeFanu'})
        // console.log(res.data)
        expect(res.data.length).toBe(2)
    } catch (err) {
        expect(err).toBeNull()
    }
})

test('api get books from neaby cities to location', async () => {
    try {
        const res = await axios.post('http://localhost:8080/mongo/query4', { lng: -95, lat: 35})
        // console.log(res.data)
        expect(res.data.length).toBe(19)
    } catch (err) {
        expect(err).toBeNull()
    }
})
