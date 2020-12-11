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
	dept: String,
	role: String,
	year: String,
	rollNo: {
		type: String,
		required: true
	},
	photo: {
		type: String,
		default: 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg'
	},
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
	],
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post'
		}
	],
	liked: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post'
		}
	],
	commented: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post'
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