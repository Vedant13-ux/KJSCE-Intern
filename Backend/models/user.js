const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userScehma = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	emailToken: String,
	fname: {
		type: String,
		required: true
	},
	lname: {
		type: String,
		required: true
	},
	department: String,
	role: String,
	year: String,
	rollNo: {
		type: Number,
		unique: true,
		required: true
	},
	facultyId: {
		type: Number,
		unique: true,
	},
	photo: String,
	photoId: {
		type: String,
		default: '123z99'
	},
	created: {
		type: Date,
		default: Date.now()
	},
	bookmarks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'InternshipDetails'
		}
	],
	notifications: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Notification'
		}
	],
	conversations: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Conversation'
		}
	],
	interactions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	resume: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'File'
	},
	internshipsOffered: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'InternshipDetails'
		}
	],
	applications: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'InternshipDetails'
		}
	],
	skills: [
		{
			type: String
		}
	]

});

userScehma.methods.comparePassword = async function (password, next) {
	try {
		let isMatch = bcrypt.compare(password, this.password);
		return isMatch;

	} catch (err) {
		next(err);
	}
}

userScehma.pre('save', async function (next) {
	try {
		if (!this.isModified('password')) {
			return next();
		}
		let hash = await bcrypt.hash(this.password, 10);
		this.password = hash;
		return next();

	} catch (err) {
		next(err);
	}
});
const User = mongoose.model('User', userScehma);
module.exports = User;