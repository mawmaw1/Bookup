/**
 * Created by Kristian Nielsen on 02-05-2018.
 */
// for static serving of dist directory (local testing)
const express = require('express');
const path = require('path');
const app = express();

const [,, folder] = process.argv;

const port = 8080;

app.use('/', express.static(path.join(__dirname, folder)));

app.listen(port);