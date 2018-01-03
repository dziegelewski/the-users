const express = require('express');
const router = express.Router();
const usersDb = require('./users-db');

router.use('/',
	async function (req, res, next) {
	res.users = await usersDb.getAll();
	next();
})

router.use('/user/:id',
	async function(req, res, next) {
	const userId = req.params.id;
	res.user = await usersDb.get(userId);
	next();
})

router.get('/', (req, res) => {
	res.render('index.html.twig', {
		users: res.users
	});
})

router.get('/user/:id', (req, res) => {
	res.render('user.html.twig', {
		user: res.user
	})
})

router.get('/new', (req, res) => {
	res.render('new.html.twig');
})

router.post('/success', 
	async function(req, res) {
	if (!req.body) return res.sendStatus(400);
	await usersDb.save(req.body);
	res.render('success.html.twig', {	action: 'added' })
})

module.exports = router;