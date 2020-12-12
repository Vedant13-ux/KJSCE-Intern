const express = require('express');
const router = express.Router();
const db = require('../models');
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'ved13',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

// Get user by id
router.get('/user/:id', (req, res, next) => {
    db.User.findById(req.params.id).populate('applications', 'posts')
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

router.get('/profile/:id', (req, res, next) => {
    db.User.findById(req.params.id).populate('internshipsOffered').populate('applications').populate('resume').populate('bookmarks').populate('posts')
        .exec((err, user) => {
            if (err) {
                return next(err);
            }
            return res.status(200).send(user)
        });
})
// const formData = new FormData();
// const imagefile = document.querySelector('#file');
// formData.append("image", imagefile.files[0]);
// axios.post('upload_file', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
// })

// router.put('/profile/update/photo', (req, res, next) => {
//     db.User.findById(req.body.id)
//         .then(async (user) => {
//             cloudinary.v2.uploader.upload(req.body.file, function (err, result) {
//                 if (err) {
//                     return next({
//                         status: 500,
//                         message: 'Image Could not be Uploaded. Please try again.'
//                     });
//                 }
//                 user.photoId = result.public_id;
//                 user.photo = result.secure_url;
//                 await user.save();
//             });
//         })
//         .catch(err => next(err))
// });

// Update Name
router.put('/profile/update/name', (req, res, next) => {
    db.User.findById(req.body.name)
        .then((user) => {
            user.name = req.query.newName;
            user.save();
            res.status(200).send(user);
        }).catch((err) => {
            next(err);
        });
});

router.put('/profile/update/skills', (req, res, next) => {
    db.User.findById(req.body.id)
        .then(async (user) => {
            try {
                await user.skills.push(req.body.skill);
                await user.save();
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


module.exports = router;
