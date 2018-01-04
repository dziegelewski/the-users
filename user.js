const casual = require('casual');
const random = require('lodash/random');
const times = require('lodash/times');

class User {
	constructor({ id = null, firstName, lastName, bio, age } = {}) {
		this.id = id;
		this.firstName = firstName
		this.lastName = lastName;
		this.bio = bio;
		this.age = age || 'unknown';
	}

	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}

	static createRandom() {
		return new User({
			firstName: casual.first_name,
			lastName: casual.last_name,
			bio: generateBio(),
			age: generateRandomAge(),
		})
	}
}

module.exports = User;

function generateRandomAge() {
	return random(18,50);
}

function generateBio() {
	return casual.sentences(12)
}