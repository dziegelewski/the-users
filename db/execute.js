const tableName = require('./tableName');
const mysql = require('mysql');

const execute = function(query) {
	return provideTable()
	.then(() => executeQuery(query))
}

const executeQuery = function(query) {
		return new Promise((resolve, reject) => {
				con.query(query, (err, rows) => {
					if (err) reject(err);
					resolve(rows);
				})
		})
		.catch(err => new Error(err));
}

const con = mysql.createConnection(process.env.MYSQL_URI || {
		host: process.env.host || 'localhost',
		user: process.env.user || 'root',
		database: process.env.database || 'the_users',
		password: process.env.password,
})


const provideTable = function() {
	if (provideTable.done) {
		return Promise.resolve();
	}

	return executeQuery(`
			SELECT 1 FROM ${tableName} LIMIT 1
		`)
		.then(result => {
			if (!(result instanceof Array)) {
				return executeQuery(`
					CREATE TABLE ${tableName} (
				  \`id\` int(6) unsigned NOT NULL AUTO_INCREMENT,
				  \`firstName\` varchar(30) NOT NULL,
				  \`lastName\` varchar(30) NOT NULL,
				  \`bio\` text,
				  \`age\` int(4) DEFAULT NULL,
				  PRIMARY KEY (\`id\`)
				)`)
			}
		})
		.then(() => {
			provideTable.done = true; 
		})
}

module.exports = execute;