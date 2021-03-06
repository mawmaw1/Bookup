const express = require('express');
const postgres = require('../postgres/postgres')
const mongo = require('../mongo/mongo')
const cors = require('cors')

mongo.connect()
postgres.connect()

const router = new express.Router();
const mongoRouter = new express.Router();
const postgresRouter = new express.Router();

mongoRouter.post('/query1', mongoQ1)
mongoRouter.post('/query2', mongoQ2)
mongoRouter.post('/query3', mongoQ3)
mongoRouter.post('/query4', mongoQ4)

postgresRouter.post('/query1', postgresQ1)
postgresRouter.post('/query2', postgresQ2)
postgresRouter.post('/query3', postgresQ3)
postgresRouter.post('/query4', postgresQ4)

router.use(cors()) // burde nok fjernes og laves med proxy i stedet
router.use('/mongo', mongoRouter)
router.use('/postgres', postgresRouter)

module.exports = router;

async function mongoQ1(req, res) {
    if (!req.body.city) {
        return res.status(400).end('invalid')
    }

    try {
        const data = await mongo.getBooksMetionCity(req.body.city)
        res.json(data)
    } catch (e) {
        console.log(e)
        res.status(500).end('error')
    }
}

async function mongoQ2(req, res) {
    if (!req.body.title) {
        return res.status(400).end('invalid')
    }

    try {
        const data = await mongo.getCitiesFromBook(req.body.title)
        res.json(data)
    } catch (e) {
        console.log(e)
        res.status(500).end('error')
    }
}

async function mongoQ3(req, res) {
    if (!req.body.author) {
        return res.status(400).end('invalid')
    }

    try {
        const data = await mongo.getCitiesAndBooksFromAuthor(req.body.author)
        res.json(data)
    } catch (e) {
        console.log(e)
        res.status(500).end('error')
    }
}

async function mongoQ4(req, res) {
    if (!req.body.lng && !req.body.lat) {
        return res.status(400).end('invalid')
    }

    try {
        console.log('mongo q4, lat, long:', req.body.lat, req.body.lng);
        const data = await mongo.getBooksNearLocation(req.body.lng, req.body.lat)
        console.log('returning elements (amount):', data.length);
        res.json(data)
    } catch (e) {
        console.log(e)
        res.status(500).end('error')
    }
}

async function postgresQ1(req, res) {
    try {
        let result = await postgres.query1(req.body.city)
        res.json(result.rows)
    } catch (e) {
        res.status(500).end(e)
    }
}

async function postgresQ2(req, res) {
    try {
        let result = await postgres.query2(req.body.title)
        res.json(result.rows)
    } catch (e) {
        res.status(500).end(e)
    }
}

async function postgresQ3(req, res) {
    try {
        let result = await postgres.query3(req.body.author)
        res.json(result.rows)
    } catch (e) {
        res.status(500).end(e)
    }
}

async function postgresQ4(req, res) {
    try {

        let result = await postgres.query4(req.body.lat, req.body.lng)
        res.json(result.rows)
    } catch (e) {
        console.log(e)
        res.status(500).end(e)
    }
}
//etc..
