const express = require('express');
const router = express.Router();

const pool = require('../database');


router.get('/add',(req,res) => {
	res.render('links/add');
});

router.post('/add',async (req,res) => {
	 
	//Podriamos enviar el objeto directo del req.body
	const {title,url,description} = req.body;
	let newLinks = {
		title,
		url,
		description
	};

	await pool.query('INSERT INTO links set ?',[newLinks]);
	req.flash('success','Link saved successfully');
	res.redirect('/links');

});

router.get('/',async (req,res) => {
	let links = await pool.query('SELECT * FROM links');
	res.render('links/list',{links});

});


router.get('/delete/:id', async (req,res) => {
	
	let id = req.params.id;
	await pool.query('DELETE FROM links where id = ?',[id]);
	req.flash('success','Link removed successfully');
	res.redirect('/links');
});

router.get('/edit/:id', async(req,res) => {
	let id = req.params.id;
	let link = await pool.query('Select * from links where id = ?',[id]);
	req.flash('success','Link edited successfully');
	res.render('links/edit',{ links :link[0] });

});

router.post('/edit/:id',async(req,res) => {
	let id = req.params.id;
	let {title,url,description} = req.body;
	let editLink = {
		title,
		url,
		description
	};

	await pool.query('UPDATE links set ? where id = ?',[editLink,id]);
	req.flash('success','Link updated successfully');
	res.redirect('/links');

});


module.exports = router;