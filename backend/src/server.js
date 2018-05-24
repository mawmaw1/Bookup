const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const path = require('path')

const routes = require('./api/router')

module.exports = (ip, port) => {
    const app = express()

    app.use(morgan('dev'))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(routes)

    app.use('/coverage', express.static(path.join(__dirname, '../tests/coverage/lcov-report')))

    app.listen(port, ip, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Server (backend) running on ${ip}:${port}`);
    });
};