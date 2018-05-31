const User = require('../user');
const tableName = require('./tableName');
const execute = require('./execute');

const save = function(user) {
	const values = User.dbInsertionString(user);
	return execute(`INSERT INTO ${tableName} VALUES (${values})`)
		.then((result) => result);
}

const get = function(userId) {
	return execute(`SELECT * FROM ${tableName} WHERE id=${userId}`)
		.then(rows => createSingleUser(rows[0]));
}

const getAll = function() {
	return execute(`SELECT * FROM ${tableName}`)
		.then(rows => createManyUsers(rows));
}

const del = function(userId) {
	return execute(`DELETE FROM ${tableName} WHERE id=${userId}`);
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