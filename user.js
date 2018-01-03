const casual = require('casual');
const random = require('lodash/random');
const times = require('lodash/times');

class User {
	constructor({ id = null, firstName, lastName, bio } = {}) {
		this.id = id;
		this.firstName = firstName
		this.lastName = lastName;
		this.bio = bio;
	}

	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}

	randomize() {
		this.firstName = casual.first_name;
		this.lastName = casual.last_name;
		this.bio = generateBio();
		return this;
	}
}

module.exports = User;

function generateRandomAge() {
	return random(18,50);
}

function generateBio() {
	return casual.sentences(12)
}