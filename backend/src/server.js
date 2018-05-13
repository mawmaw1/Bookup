const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');

const routes = require('./api/router')

module.exports = (ip, port) => {
    const app = express();

    app.use(morgan('dev'))
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json())
    app.use(routes)

    app.listen(port, ip, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Server (backend) running on ${ip}:${port}`);
    });
};