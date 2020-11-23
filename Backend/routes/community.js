const express = require('express');
const router = express.Router();
const db = require('../models');

// Getting Posts
router.get('/posts/getAll', (req, res, next) => {
    db.Post.find().limit(10).sort({ created: -1 }).exec()
        .then(posts => {
            res.status(200).send(posts);
        })
        .catch(err => next(err));
});
router.get('/posts/getNext', (req, res, next) => {
    let curId = req.query.curId;
    db.Post.find({ _id: { $gt: curId } }).sort({ created: -1 }).limit(1).exec()
        .then(posts => {
            res.status(200).send(posts);
        })
        .catch(err => next(err))

});
router.get('/posts/:id', (req, res, next) => {
    db.Post.findById(req.params.id)
        .then((post) => {
            if (!post) {
                return next({
                    status: 404,
                    message: "Post Not Found"
                })
            }
            req.status(200).send(post);
        })
        .catch(err => next(err))
});

router.post('/posts/create', (req, res, next) => {
    db.Post.create(req.body)
        .then((newPost) => {
            res.status(200).send(newPost);
        })
        .catch(err => next(err))
});

router.put('/posts/edit/:id', (req, res, next) => {
    db.Post.findByIdAndUpdate(req.params.id, req.body)
        .then((edited) => {
            if (!edited) {
                return next({
                    status: 404,
                    message: 'Post Not Found'
                })
            }
            res.status(200).send(edited);
        })
});

router.post('/posts/like/:id', (req, res, next) => {
    db.Post.findById(req.params.id)
        .then(async (post) => {
            if (!post) {
                return next({
                    status: 404,
                    message: 'Post Not Found'
                })
            }
            try {
                let user = await db.User.findById(req.body);
                if (post.likedBy.findIndex((u) => u == user._id) == -1) {
                    await post.likedBy.push(user);
                    return await post.save();
                }
                return next({
                    status: 403,
                    message: 'You have already liked this post'
                });
            } catch (err) { next(err) }

        })
});


router.delete('/posts/like/:id', (req, res, next) => {
    db.Post.findById(req.params.id)
        .then(async (post) => {
            if (!post) {
                return next({
                    status: 404,
                    message: 'Post Not Found'
                })
            }
            try {
                let user = await db.User.findById(req.body);
                let to_remove = post.likedBy.findIndex((u) => {
                    return u == user._id;
                });
                if (to_remove !== -1) {
                    await post.likedBy.splice(to_remove, 1)
                    return await post.save();
                }
                return next({
                    status: 403,
                    message: 'You do not like this post.'
                });
            } catch (err) { next(err) }

        })
});


module.exports = router;
