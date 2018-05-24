/**
 * Created by Kristian Nielsen on 02-05-2018.
 */
// for static serving of dist directory (local testing)
const express = require('express');
const path = require('path');
const app = express();


const port = process.argv[2] || 8080;
const ip = process.argv[3] || '0.0.0.0';

app.get('/', (req, res) => {
    res.redirect('/app')
});

app.use('/app', express.static(path.join(__dirname, 'dist')));
app.use('/coverage', express.static(path.join(__dirname, 'tests/coverage/lcov-report')));

app.listen(port, ip, function(){
    console.log(`'dist' served on ${ip}:${port}`)
});