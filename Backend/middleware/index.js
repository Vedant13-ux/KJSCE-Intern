// require('dotenv').load();
const jwt = require('jsonwebtoken');
const db = require('../models');
exports.loginRequired = function (req, res, next) {
    console.log('Login Ma aaya')
    try {
        console.log(req.headers.authorization);
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (err) {
                return next(err)
            }
            if (decoded) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: 'Please Log in first'
                })
            }
        })
    } catch (err) {
        next({
            status: 401,
            message: 'Please Log in first'
        });
    }
}

exports.ensureCorrectUser = function (req, res, next) {
    console.log(req.params.secureId);
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            console.log(decoded);
            if (decoded && (decoded.id === req.params.sercureId)) {
                if (decoded.emailToken == '') {
                    return next();
                } else {
                    return next({
                        status: 401,
                        message: 'Please verify your email first or try to Signup Again'
                    })
                }
            } else {
                return next({
                    status: 401,
                    message: 'Unauthorized'
                })
            }
        })
    } catch (err) {
        next({
            status: 401,
            message: 'Unauthorized'
        });
    }
}


