const express = require('express');
const postgres = require('../postgres/postgres')
const mongo = require('../mongo/mongo')
const cors = require('cors')

// mongo.connect()

const router = new express.Router();
const mongoRouter = new express.Router();
const postgresRouter = new express.Router();

mongoRouter.get('/query1', mongoQ1)
mongoRouter.get('/query2', mongoQ2)
mongoRouter.get('/query3', mongoQ3)
mongoRouter.get('/query4', mongoQ4)

postgresRouter.post('/query2', postgresQ2)
postgresRouter.get('/query2', postgresQ2)
postgresRouter.get('/query3', postgresQ2)
postgresRouter.get('/query4', postgresQ2)

router.use(cors())
router.use('/mongo', mongoRouter)
router.use('/postgres', postgresRouter)

module.exports = router;

function mongoQ1(req, res) {
    // Check input & errors
    mongo.getBooksMetionCity(req.query.city)
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).end('error')
        })
}

function mongoQ2(req, res) {
    res.json({ x: "D" })
}

function mongoQ3(req, res) {
    res.json({ x: "D" })
}

function mongoQ4(req, res) {
    res.json({ x: "D" })
}

async function postgresQ2(req, res) {
    try {
        let result = await postgres.query2(req.body.title)
        res.json(result.rows)
    } catch (e) {
        res.status(500).end(e)
    }
}
//etc..