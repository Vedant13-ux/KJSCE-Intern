const db = require('../models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer=require('nodemailer');

exports.signup = async function (req, res, next) {
    try {
        req.body.emailToken=crypto.randomBytes(64).toString('hex');
        let newUser = await db.User.create(req.body);
        let { id, fname, lname, email, rollNo } = newUser;
        let token = jwt.sign({
            id, fname, lname, email, rollNo
        }, process.env.SECRET_KEY);

        const mailOptions = {
            from: 'kjsceintern@gmail.com',
            to: req.body.email,
            subject: 'KJSCE Intern - Verification',
            text: `
            Hello, Thanks for regstering on our site. Please Click on the link bellow to verify your Account.
            http://${req.headers.host}/verify-email?token=${req.body.emailToken}`,
            html: `
                <h3>Hello, ${newUser.fname}</h3>
                <p> Thanks for regstering on our site. Please Click on the link bellow to verify your Account.</p>
                <a href="http://${req.headers.host}/verify-email?token=${req.body.emailToken}">Verify Your Account</a>
            `
        };
        console.log(mailOptions);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
             auth: {
               user: 'kjsceintern@gmail.com',
               pass: 'ftpberoupesefpbe'
             }
        });
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err.message);
            }
            console.log('Message Sent : %s', info.messageId);
            console.log('Preview URL : %s', info.getTestMessageURL(info));
        });
        return res.status(200).json({
            id, fname, lname, email, token, rollNo
        })
    } catch (err) {
        if (err.code === 11000) {
            err.message = 'Sorry, that username/email is already taken.'
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}

exports.signin = async function (req, res, next) {
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, fname, lname, email, rollNo } = user;
        let isMatch = await user.comparePassword(req.body.password);
        console.log(isMatch);
        if (isMatch) {
            let token = jwt.sign({
                id, fname, lname, email, rollNo
            }, process.env.SECRET_KEY);

            return res.status(200).json({
                id, fname, lname, email, token, rollNo
            })
        } else {
            next({
                status: 400,
                message: 'Invalid Email/Passowrd.'
            })
        }

    } catch (err) {
        return next({
            status: 400,
            message: 'Invalid Email/Passowrd.'
        });
    }

}
