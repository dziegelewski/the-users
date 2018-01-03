const User = require('./user');
const mysql = require('mysql');

const con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		database: 'the_users',
		password: require('./db-password'),
})

const table = 'users';

const executeQuery = function(query) {
		return new Promise((resolve, reject) => {
				con.query(query, (err, rows) => {
					if (err) reject(err);
					resolve(rows);
				})
		})
		.catch(err => console.log(err))
}

const save = function(user) {
	return executeQuery(`INSERT INTO ${table} VALUES (null, '${user.firstName}', '${user.lastName}', '${user.bio}')`);
}

const get = function(userId) {
	return executeQuery(`SELECT * FROM ${table} WHERE id=${userId}`)
		.then(rows => createSingleUser(rows[0]));
}

const getAll = function() {
	return executeQuery(`SELECT * FROM ${table}`)
		.then(rows => createManyUsers(rows));
}

const del = function(userId) {
	return executeQuery(`DELETE FROM ${table} WHERE id=${userId}`);
}

const createSingleUser = function(userData) {
	return new User(userData);
}

const createManyUsers = function(rows) {
	return rows.map(createSingleUser);
}

module.exports = {
	save,
	get,
	getAll,
	del,
}