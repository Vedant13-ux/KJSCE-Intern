const express = require('express');
const router = express.Router();
const db = require('../models');
const skillJSON = require('../data binder/skills.json');

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

router.get('/search/title/:query', async (req, res, next) => {
    try {
        var regex = new RegExp(escapeRegex(req.params.query), 'gi');
        let internships = await db.InternshipDetails.find({ title: regex }).populate('faculty').exec();
        res.status(200).send(internships);
    } catch (err) {
        next(err);
    }

});


router.post('/search/filter', async (req, res, next) => {
    console.log(req.body);
    try {
        var query = new RegExp(escapeRegex(req.body.query), 'gi');
        var type = req.body.type;
        var { min, max, skills, type } = req.body;
        skills = skills.map(skill => {
                return new RegExp(escapeRegex(skill), 'gi');
            });

            // let searchtobe=

        try {
            if (type.length == 1) {
                let internships = await db.InternshipDetails.find({ title: query, skillsRequired: { $all: skills },type: type[0],duration: { $gt: min },duration:{$lt: max} }).populate('faculty').exec(); 
                return res.status(200).send(internships);
            } else {
                let internships = db.InternshipDetails.find({ title: query, skillsRequired: { $all: skills }, duration: { $gt: min },duration:{$lt: max} }).populate('faculty').exec();
                return res.status(200).send(internships);
            }
            

        } catch (err) {
            console.log(err);
            return next(err);
        }
    } catch (err) {
        console.log(err);
        next(err);
    }

});



router.get('/search/skills', async (req, res, next) => {
    var skills = req.query.skills.split(',');
    skills = skills.map(skill => {
        return new RegExp(escapeRegex(skill), 'gi');
    })
    console.log(skills);
    try {
        var suggested = await db.InternshipDetails.find({ skillsRequired: { $all: skills } }).populate('faculty', 'fname lname photo _id').exec();
        res.send(suggested);

    } catch (error) {
        next(err)
    }

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
    req.body.duration = parseInt(req.body.duration);
    req.body.numberOpenings = parseInt(req.body.numberOpenings);
    db.InternshipDetails.create(req.body)
        .then((internship) => {
            res.status(200).send(internship);
        }).catch((err) => {
            next(err);
        });
});
// Skill Suggestions
router.get('/skillSuggestion/:skill', (req, res, next) => {
    let query = req.params.skill.toLowerCase().split('');
    if (query.length > 5) {
        query.splice(5);
    }
    top = skillJSON;
    query.forEach(char => {
        top = top[char];
    });
    var top10 = top["top"];
    var skillObj = {};
    var skillArray = [];
    top10.forEach(skill => {
        skillObj["text"] = skill;
        // skillObj["value"] = skill;
        skillArray.push(skillObj);
        skillObj = {};
    });
    res.send(skillArray);
});
// Get Internship Details
router.get('/details/:id', (req, res, next) => {
    db.InternshipDetails.findById(req.params.id).populate('faculty')
        .exec((err, internship) => {
            if (!internship) {
                return res.status(404).send({});
            }
            if (err) {
                return next(err);
            }
            return res.status(200).send(internship)
        })
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