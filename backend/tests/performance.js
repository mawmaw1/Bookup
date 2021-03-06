const result = require('dotenv').load();
if (result.error) {
    throw result.error
}

const Timer = require('./timer');
const colors = require('colors/safe');
const mongo = require('../dist/mongo/mongo');
const postgres = require('../dist/postgres/postgres');

const cities = ['London', 'Paris', 'Rome', 'New York City', 'Salt Lake City'];
const books = ['Moby Dick', 'The Warriors', 'The Mystery', 'The Magna Carta', 'The Mountains of California'];
const authors = ['Edgar Allan Poe', 'William F. Cody', 'F. J. Cross', 'Charles S. Brooks', 'George Newne'];
const coordinates = [
    { lng: -95.55, lat: 33.66 },
    { lng: 12.57, lat: 55.68 },
    { lng: -0.12, lat: 51.49 },
    { lng: 12.49, lat: 41.89 },
    { lng: -74, lat: 40.72 }
];

async function runQueries(db, fns){
    await db.connect();

    // const totalT = new Timer();
    const citiesT = new Timer();
    const booksT = new Timer();
    const authorsT = new Timer();
    const coordinatesT = new Timer();

    // totalT.start();

    const isObj = (o) => typeof o === 'object' && o !== null;
    const time = (timer, collection, fn) => {
        timer.start();
        return Promise.all(collection.map(e => isObj(e) ? fn(e.lng, e.lat) : fn(e))).then(() => {
            timer.stop();
        })
    };

    const singleQueryPromises = [
        () => time(citiesT, cities, db[fns[0]]),
        () => time(booksT, books, db[fns[1]]),
        () => time(authorsT, authors, db[fns[2]]),
        () => time(coordinatesT, coordinates, db[fns[3]])
    ];

    // process queries in sequence
    let queryNumber = 1;
    for(const singleQuery of singleQueryPromises){
        console.log(`starting query ${queryNumber}`);
        await singleQuery();
        console.log(`finished query ${queryNumber}`);
        queryNumber++;
    }

    // process queries in parallel
    // await Promise.all(singleQueryPromises.map(f => f()));

    // totalT.stop();
    db.disconnect();

    return {
        'total_time': [citiesT.elapsed, booksT.elapsed, authorsT.elapsed, coordinatesT.elapsed].reduce((acc, curr) => {return acc + curr}, 0),
        'query_one': citiesT.elapsed,
        'query_two': booksT.elapsed,
        'query_three': authorsT.elapsed,
        'query_four': coordinatesT.elapsed,
    }
}

async function runner() {

    const pgres = await runQueries(postgres, ['query1', 'query2', 'query3', 'query4']);
    const mongores = await runQueries(mongo, ['getBooksMetionCity', 'getCitiesFromBook', 'getCitiesAndBooksFromAuthor', 'getBooksNearLocation']);


    console.log('');
    console.log('  RESULTS  ');
    console.log('');

    const limitDecimals = (str) => {
        str = str.toString();
        //limit to 2 decimals
        const dotIndex = str.indexOf('.');
        if(dotIndex === -1) return str;
        return str.substring(0, dotIndex + 3);
    };

    const getPctDiff = (resA, resB) => {

        const diff = (Math.max(resA, resB) / Math.min(resA, resB) * 100) - 100;
        return  limitDecimals(diff);
    };

    const print = (label) => {
        const mongoWins = Number(mongores[label]) < Number(pgres[label]);

        const pctDiff = getPctDiff(mongores[label], pgres[label]);
        const pctDiffStr = ` (${pctDiff}% faster)`;

        console.log(label);
        console.log('mongo: ', mongoWins ? colors.green(mongores[label] + pctDiffStr)  : colors.red(mongores[label]));
        console.log('pg:    ', mongoWins ? colors.red(pgres[label]) : colors.green(pgres[label] + pctDiffStr));
        console.log('')
    };

    const labels = ['total_time', 'query_one', 'query_two', 'query_three', 'query_four'];

    labels.forEach(print);

}

runner();