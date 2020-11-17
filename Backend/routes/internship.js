const express = require('express');
const router = express.Router();
const db = require('../models');

// Search Internships

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

router.get('/search/all', async (req, res, next) => {
    try {
        let internships = await db.InternshipDetails.find().populate('faculty').exec();
        res.status(200).send(internships);
    } catch (err) {
        next(err);
    }

});


router.get('/search', (req, res, next) => {
    var regex = new RegExp(escapeRegex(req.body.query), 'gi');
    db.InternshipDetails.find({ skills: regex })
        .then((internships) => {
            res.status(200).send(internships);
        })
        .catch(err => next(err));
});

// router.get('/search/faculty', (req, res, next) => {
//     var regex = new RegExp(escapeRegex(req.query.faculty), 'gi');
//     db.InternshipDetails.find().populate('faculty',)
//         .then((internships) => {
//             res.status(200).send(internships);
//         })
//         .catch(err => next(err));
// });



// Create Internship
router.post('/details', (req, res, next) => {
    db.InternshipDetails.create(req.body)
        .then((internship) => {
            res.status(200).send(internship);
        }).catch((err) => {
            next(err);
        });
});
// Get Internship Details
router.get('/details/:id', (req, res, next) => {
    db.InternshipDetails.findById(req.params.id).populate('faculty')
        .then((internship) => {
            res.status(200).send(internship)
        })
        .catch(err => next(err));
});

router.put('/details/:id', async (req, res, next) => {
    try {
        let user = await db.User.findById(req.body.id);
        let internship = await db.InternshipDetails.findById(req.params.id);
        if (user._id.equals(internship.faculty) && internship) {
            await internship.update(req.body.data);
            await internship.save();
        } else {
            next({
                status: 403,
                message: 'Permission denied to perfrom the action.'
            })
        }

    } catch (error) {
        next(error);
    }

});

router.delete('/details/:id', async (req, res, next) => {
    try {
        let user = await db.User.findById(req.body.id);
        let internship = await db.InternshipDetails.findById(req.params.id);
        if (user._id.equals(internship.faculty) && internship) {
            user.internshipsOffered = user.internshipsOffered.filter((i) => internship._id !== i);
            await internship.remove();
            await user.save();
        } else {
            next({
                status: 403,
                message: 'Permission denied to perfrom the action.'
            })
        }

    } catch (error) {
        next(error);
    }

});

// Bookmarks
router.get('/bookmark/:id', (req, res, next) => {
    db.InternshipDetails.findById(req.params.id)
        .then(async (internship) => {
            if (!internship) {
                return next({
                    status: 404,
                    message: 'Internship Not Found'
                })
            }
            try {
                let user = await db.User.findById(req.body);
                await user.bookmarks.push(internship);
                await user.save();
            } catch (error) {
                next(error);
            }
        }).catch((err) => {
            next(err);
        });
});

router.delete('/bookmark/:id', (req, res, next) => {
    db.InternshipDetails.findById(req.params.id)
        .then(async (internship) => {
            if (!internship) {
                return next({
                    status: 404,
                    message: 'Internship Not Found'
                })
            }
            try {
                let user = await db.User.findById(req.body.id);
                user.bookmarks = user.bookmarks.filter((b) => internship._id !== i);
                await user.save();
            } catch (error) {
                next(error);
            }
        }).catch((err) => {
            next(err);
        });
});


// Apply in a Internship
router.put('/apply/:id', (req, res, next) => {
    db.InternshipDetails.findById(req.params.id)
        .then(async (internship) => {
            try {
                let user = db.User.findById(req.body);
                await user.applications.push(internship);
                await internship.applicants.push(user);
                await user.save();
                await internship.save();
            } catch (error) {
                next(err);
            }
        }).catch((err) => {

        });
});

module.exports = router;