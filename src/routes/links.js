const express = require('express');
const router = express.Router();

const pool = require('../database.js');

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async(req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        descripcion: description
    };

    await pool.query('Insert into links set ?', [newLink]);

    res.send('Recibido...');
});

router.get('/', async(req, res) => {

    const links = await pool.query('Select * from links;');

    res.render('links/list', { links }); /*Renderiza la vista y envia la data de BBDD */

});


module.exports = router;