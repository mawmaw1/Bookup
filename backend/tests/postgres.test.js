require('dotenv').load();
const axios = require('axios')
const postgres = require('../dist/postgres/postgres');
const server = require('../dist/server')

beforeAll(() => {
    server('localhost', 8082)
})

afterAll(() => {
    postgres.disconnect()
})

test('get books that reference Liverpool', async () => {
    try {
        const res = await postgres.query1('Liverpool')
        expect(res.rows.length).toBe(330)
        console.log(res.rows.length)
    } catch (err) {
        expect(err).toBeNull();
    }
});

test('get cities from Moby Dick', async () => {
    try {
        const res = await postgres.query2('Moby Dick')
        expect(res.rows.length).toBe(3)
    } catch (err) {
        expect(err).toBeNull();
    }
})

test('get books and cities from Lindsay author', async () => {
    try {
        const res = await postgres.query3('Lindsay')
        expect(res.rows.length).toBe(1)
        expect(res.rows[0].cities.length).toBe(10)
    } catch (err) {
        expect(err).toBeNull();
    }
})

test('get books from nearby cities to location', async () => {
    try {
        const res = await postgres.query4(40.71427, -74.00597)
        expect(res.rows.length).toBe(3394)
    } catch (err) {
        expect(err).toBeNull();
    }
})