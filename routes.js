const express = require('express');
const router = express.Router();
const usersDb = require('./users-db');
const User = require('./user');

router.use('/user/:id',
	async function(req, res, next) {
	const userId = req.params.id;
	res.user = await usersDb.get(userId);
	next();
})

router.get('/', getAllUsers, renderMainPage)

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
		const user = getPostedUser(req, res);
		await usersDb.save(user);
		res.render('success.html.twig', {	user })
	}
)

router.get('/delete/:id',
	deleteUser,
	getAllUsers,
	renderMainPage
)

function renderMainPage(req, res) {
	res.render('index.html.twig', {
		users: res.users
	});
}

async function getAllUsers(req, res, next)  {
	res.users = await usersDb.getAll();
	next();
}

async function deleteUser(req, res, next) {
	const userId = req.params.id;
	await usersDb.del(userId);
	next();
}

function getPostedUser(req, res) {
	console.log(getPostedUser)
	let user;
	if (req.query.random) {
		user = User.createRandom();
	} else {
 		if (!req.body) return res.sendStatus(400);
 		user = new User(req.body);
	}
	return user;
}

module.exports = router;