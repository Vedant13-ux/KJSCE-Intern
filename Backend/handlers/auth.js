const db = require('../models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
var mailOptionsImport = require('./mailOptions')

exports.signup = async function (req, res, next) {
  try {
    req.body.emailToken = crypto.randomBytes(64).toString('hex');
    const newUser = await db.User.create(req.body);
    var mailOptions = mailOptionsImport(req, process);
    // console.log(mailOptions);
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kjsceintern@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err.message);
      }
      console.log('Message Sent : %s', info.messageId);
      console.log('Preview URL : %s', info.getTestMessageURL(info));
    });
    return res.status(200).send('Signed Up Successfully')
  } catch (err) {
    if (err.code === 11000) {
      err.message = 'Sorry, that username/email is already taken.'
      // err.message = err.message;
    }
    return next({
      status: 400,
      message: err.message
    });
  }
}

exports.signin = async function (req, res, next) {
  console.log(req.body);
  try {
    let user = await db.User.findOne({
      email: req.body.email
    }).populate('events').populate('applications').populate('certificates').populate('experiences').populate('projects').populate('achievements').populate({ path: "internshipsOffered", populate: { path: 'applicants', select: 'fname lname email _id photo' } }).populate({ path: "internshipsOffered", populate: { path: 'recruited', select: 'fname lname email _id photo' } }).populate({ path: 'members', populate: { path: 'member', select: 'fname lname _id email photo' } }).populate({ path: 'commented', populate: { path: 'post', select: '_id image author', populate: { path: 'author', select: ' fname lname email' } } }).populate({ path: 'liked', populate: { path: 'post', select: '_id image author', populate: { path: 'author', select: 'email fname lname photo' } } }).exec()
    console.log(user);
    if (user.emailToken != '') {
      return next({
        status: 401,
        message: 'Please verify your email first or try to Signup Again'
      })
    }
    let isMatch = await user.comparePassword(req.body.password, next);
    console.log(isMatch);
    if (isMatch) {
      let token = jwt.sign({
        ...user._doc
      }, process.env.SECRET_KEY);

      return res.status(200).json({
        ...user._doc, token, password: ''
      })
    } else {
      next({
        status: 400,
        message: 'Invalid Email/Passowrd.'
      })
    }

  } catch (err) {
    return next(err);
  }

}
