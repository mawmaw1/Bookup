const express = require('express');
const postgres = require('../postgres/postgres')
const mongo = require('../mongo/mongo')

mongo.connect()

const router = new express.Router();
const mongoRouter = new express.Router();
const postgresRouter = new express.Router();

mongoRouter.get('/query1', mongoQ1)
mongoRouter.get('/query2', mongoQ2)
mongoRouter.get('/query3', mongoQ3)
mongoRouter.get('/query4', mongoQ4)

postgresRouter.get('/query1', postgresQ1)
postgresRouter.get('/query2', postgresQ1)
postgresRouter.get('/query3', postgresQ1)
postgresRouter.get('/query4', postgresQ1)

router.use('/mongo', mongoRouter)
router.use('/postgres', postgresRouter)

module.exports = router;

function mongoQ1 (req, res) {
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

function mongoQ2 (req, res) {
    res.json({x: "D"})
}

function mongoQ3 (req, res) {
    res.json({x: "D"})
}

function mongoQ4 (req, res) {
    res.json({x: "D"})
}

function postgresQ1 (req, res) {
    res.end(postgres.query1)
}
//etc..