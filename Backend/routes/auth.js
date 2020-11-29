const express = require('express');
const router = express.Router();
const { signup, signin } = require('../handlers/auth');
const db = require('../models');

router.post('/signup', signup);

router.post('/signin', signin);

router.get('/verify-email/:token', async (req, res, next) => {
    db.User.findOne({ emailToken: req.params.token })
        .then(async (user) => {
            user.emailToken = null;
            await user.save();
            return res.status(200).send(user);
        }).catch((err) => {
            next(err);
        });
});

module.exports = router;