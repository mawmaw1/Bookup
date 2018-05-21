require('dotenv').load();
const mongo = require('../dist/mongo/mongo');
const postgres = require('../dist/postgres/postgres')

const cities = ['London', 'Paris', 'Rome', 'New York City', 'Salt Lake City']
const books = ['Moby Dick', 'The Warriors', 'The Mystery', 'The Magna Carta', 'The Mountains of California']
const authors = ['Edgar Allan Poe', 'William F. Cody', 'F. J. Cross', 'Charles S. Brooks', 'George Newne']
const coordinates = [
    { lng: -95.55, lat: 33.66 },
    { lng: 12.57, lat: 55.68 },
    { lng: -0.12, lat: 51.49 },
    { lng: 12.49, lat: 41.89 },
    { lng: -74, lat: 40.72 }
]

async function runMongo() {
    mongo.connect()

    console.time('mongo')
    let proms = []
    for (let c of cities) {
        proms.push(mongo.getBooksMetionCity(c))
    }
    for (let b of books) {
        proms.push(mongo.getCitiesFromBook(b))
    }
    for (let a of authors) {
        proms.push(mongo.getCitiesAndBooksFromAuthor(a))
    }
    for (let { lng, lat } of coordinates) {
        proms.push(mongo.getBooksNearLocation(lng, lat))
    }
    const res = await Promise.all(proms)
    console.log(res.length)
    console.timeEnd('mongo')
    mongo.disconnect()
}

async function runPostgres() {
    console.time('postgres')
    let proms = []
    for (let c of cities) {
        proms.push(postgres.query1(c))
    }
    for (let b of books) {
        proms.push(postgres.query2(b))
    }
    for (let a of authors) {
        proms.push(postgres.query3(a))
    }
    for (let { lng, lat } of coordinates) {
        proms.push(postgres.query4(lat, lng))
    }
    const res = await Promise.all(proms)
    console.log(res.length)
    console.timeEnd('postgres')
}

async function runner() {
    await runMongo()
    await runPostgres()
}

runner()