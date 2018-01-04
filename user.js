const casual = require('casual');
const random = require('lodash/random');
const times = require('lodash/times');

class User {
	constructor({ id = null, firstName, lastName, bio, age } = {}) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.bio = bio;
		this.age = age;
	}

	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}

	static getProperties() {
		return {
			minAge: 10,
			maxAge: 99,
			defaultAge: 30,
		}
	}

	static dbInsertionString(user) {
		return `null, '${user.firstName}', '${user.lastName}', '${user.bio}', '${user.age}'`;
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
	return random(User.getProperties().minAge, User.getProperties().maxAge);
}

function generateBio() {
	return casual.sentences(12)
}