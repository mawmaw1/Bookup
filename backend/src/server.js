const express = require('express');
const morgan = require('morgan')

const routes = require('./api/router')

module.exports = (ip, port) => {
    const app = express();

    app.use(morgan('dev'))
    app.use(routes)

    app.listen(port, ip, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Server (backend) running on ${ip}:${port}`);
    });
};