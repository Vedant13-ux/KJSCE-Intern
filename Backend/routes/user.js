const express = require('express');
const router = express.Router();
const db = require('../models');
const cloudinary = require('cloudinary');
const multer = require('multer');
cloudinary.config({
    cloud_name: 'ved13',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../public');
    },

    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter }).single('file');


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
// Get user by id
router.get('/user/:id', (req, res, next) => {
    db.User.findOne({ email: req.params.id + '@somaiya.edu' }).populate('applications').populate('posts').populate('certificates').populate('experiences').populate('projects').populate({ path: 'members', populate: { path: 'member', select: 'fname lname _id email photo' } }).populate({ path: 'commented', select: '_id image author', populate: { path: 'author', select: 'email fname lname photo' } }).populate({ path: 'liked', select: '_id image author', populate: { path: 'author', select: 'email fname lname photo' } }).exec()
        .then((user) => {
            res.status(200).send(user);
        }).catch((err) => {
            next(err);
        });
});
// User Suggestions
router.get('/profile/search', (req, res, next) => {
    let regex = new RegExp(escapeRegex(req.query.name), 'gi')
    db.User.find({ fname: regex }, '_id lname fname photo')
        .then((users) => {
            users.forEach(user => {
                // Object.assign(user, { "text": `${user['fname']} ${user['lname']}` });
                // user['fname'] = user['text']
            });
            res.send(users);
            // res.status(200).send(users)
        }).catch((err) => {
            next({
                status: 404,
                message: 'User Not Found'
            })
        });
});

// Profile Picture Upload
router.put('/profile/update/photo', (req, res, next) => {
    console.log(req.body);
    for (var entry of req.body.entries()) {
        console.log(entry);
    }
    // db.User.findById(req.body.id)
    //     .then((user) => {
    //         cloudinary.v2.uploader.upload(req.body.data, async function (err, result) {
    //             if (err) {
    //                 return next({
    //                     status: 500,
    //                     message: 'Image Could not be Uploaded. Please try again.'
    //                 });
    //             }
    //             user.photoId = result.public_id;
    //             user.photo = result.secure_url;
    //             await user.save();
    //             res.send('Image Uploaded');
    //         });
    //     })
    //     .catch(err => next(err))
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    });
});


router.put('/profile/update/skills', (req, res, next) => {
    db.User.findByIdAndUpdate(req.body.id, { skills: req.body.skills })
        .then(async (user) => {
            res.send('Updated!');
        }).catch((err) => {
            next(err);
        });
});


router.put('/profile/update/basicinfo', (req, res, next) => {
    db.User.findByIdAndUpdate(req.body.id, req.body.user)
        .then(async (user) => {
            res.send('Updated!');
        }).catch((err) => {
            next(err);
        });
});


router.put('/profile/update/certificates', (req, res, next) => {
    db.User.findById(req.body.id)
        .then(async user => {
            if (!user) {
                return next({ status: 404, message: "User Not Found" });
            }
            try {
                let certificate = await db.Certificate.create(req.body.certificate)
                await user.certificates.push(certificate);
                await user.save();
                res.send(certificate);
            } catch (error) {
                next(error);
            }
        }).catch((err) => {
            next(err);
        });
});

router.put('/profile/edit/certificates', (req, res, next) => {
    db.User.findById(req.body.userId)
        .then(async user => {
            if (!user) {
                return next({ status: 404, message: "User Not Found" });
            }
            try {
                let certificate = await db.Certificate.create(req.body.certificate)
                await user.certificates.push(certificate);
                await user.save();
                res.send(certificate);
            } catch (error) {
                next(error);
            }
        }).catch((err) => {
            next(err);
        });
});


router.put('/profile/update/resume', (req, res, next) => {
    db.User.findById(req.body.id)
        .then(async (user) => {
            try {
                let resumeFile = {
                    files: req.body.file,
                    author: user
                };
                let resume = db.File.create(resumeFile);
                user.resume = resume;
                await user.save();
            } catch (err) {
                next(err);
            }
        })
        .catch(err => {
            next(err);
        })
});

router.put('/profile/update/experiences', (req, res, next) => {
    db.User.findById(req.body.id)
        .then(async user => {
            if (!user) {
                return next({ status: 404, message: "User Not Found" });
            }
            try {
                let experience = await db.Experience.create(req.body.experience)
                await user.experiences.push(experience);
                await user.save();
                res.send(experience);
            } catch (error) {
                next(error);
            }
        }).catch((err) => {
            next(err);
        });
});

router.put('/profile/update/projects', (req, res, next) => {
    db.User.findById(req.body.id)
        .then(async user => {
            if (!user) {
                return next({ status: 404, message: "User Not Found" });
            }
            try {
                let project = await db.Project.create(req.body.project)
                await user.projects.push(project);
                await user.save();
                res.send(project);
            } catch (error) {
                next(error);
            }
        }).catch((err) => {
            next(err);
        });
});

// COuncil
router.get('/council/findMembers/:name', (req, res, next) => {
    const nameArr = req.params.name.split(' ');
    const fname = RegExp(escapeRegex(nameArr[0]), 'gi');
    if (nameArr.length === 1) {
        db.User.find({ fname: fname, role: 'Student' }, 'fname lname photo email _id')
            .then((users) => {
                res.send(users);
            }).catch((err) => {
                next(err);
            });
    } else {
        const lname = RegExp(escapeRegex(nameArr[1]), 'gi');
        db.User.find({ fname: fname, lname: lname, role: 'Student' }, 'fname lname photo email _id')
            .then((users) => {
                res.send(users);
            }).catch((err) => {
                next(err);
            });
    }
});

router.put('/council/addMember/:id', (req, res, next) => {
    console.log(req.body)
    db.User.findById(req.params.id)
        .then(async (user) => {
            if (!user) {
                return next({
                    status: 404,
                    message: "User Not Found"
                })
            }
            try {
                let member = await db.CouncilMember.create(req.body);
                await user.members.push(member);
                await user.save();
                member = await member.populate({ path: 'member', select: 'fname lname email _id photo' });
                res.send(member);
            } catch (err) {
                next(err);
            }
        }).catch((err) => {

        });
})

router.delete('/council/deleteMember/:userId/:memberId', (req, res, next) => {
    db.User.findById(req.params.userId)
        .then(async (user) => {
            if (!user) {
                return next({
                    status: 404,
                    message: "User Not Found"
                })
            }
            try {
                let member = db.CouncilMember.find(req.params.memberId);
                if (member) {
                    await member.remove();
                    let to_remove = user.members.findIndex((m) => JSON.stringify(m) == JSON.stringify(member._id));
                    await user.members.splice(to_remove, 1);
                    await user.save();
                    res.send('Member Added');
                } else {
                    return next({
                        status: 404,
                        message: "Member Not Found"
                    })
                }
            } catch (err) {
                next(err);
            }
        }).catch((err) => {

        });
})
module.exports = router;
