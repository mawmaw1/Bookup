const express = require('express');

module.exports = (ip, port) => {

    const app = express();

    app.get('/{id}', (req, res) => {

        console.log(req.params);
        res.send('Hello there');
        res.end();

    });

    app.listen(port, ip, (err) => {

        if (err) {

            console.error(err);

            return;

        }

        console.log(`Server running on ${ip}:${port}`);

    });

};