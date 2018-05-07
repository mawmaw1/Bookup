/**
 * Created by Kristian Nielsen on 07-05-2018.
 */
const express = require('express');
const router = new express.Router();


// Home page route.
router.get('/{id}', (req, res) => {

    res.send('Wiki home page');

});

// About page route.
router.get('/about', (req, res) => {

    res.send('About this wiki');

});


module.exports = router;