const express = require('express');
const router = express.Router();

const pool = require('../database.js');

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', (req, res) => {
    res.send('Recibido...');
});

module.exports = router;