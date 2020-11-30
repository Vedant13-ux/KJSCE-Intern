const express = require('express');
const router = express.Router();
const db = require('../models');

// Getting Posts
router.get('/posts/getAll', (req, res, next) => {
    db.Post.find().populate('author').populate('comments').limit(10).exec()
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
    console.log("bruh aya")
    db.Post.findById(req.params.id)
        .then(async (post) => {
            if (!post) {
                return next({
                    status: 404,
                    message: 'Post Not Found'
                })
            }
            try {
                console.log("post mila", req.body)
                let user = await db.User.findById(req.body.id);
                if (post.likedBy.findIndex((u) => u == req.body.id) == -1) {
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


router.put('/posts/like/:id', (req, res, next) => {
    console.log("aya yaha par")
    db.Post.findById(req.params.id)
        .then(async (post) => {
            if (!post) {
                return next({
                    status: 404,
                    message: 'Post Not Found'
                })
            }
            try {
                console.log("sahi hona chahiya", req.body.id)
                let user = await db.User.findById(req.body.id);
                console.log(user)
                let to_remove = post.likedBy.findIndex((u) => {
                    return u == req.body.id;
                });
                console.log(to_remove)
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

// COmments
router.get('/posts/comments/:id', (req, res, next) => {
    db.Post.findById(req.params.id).populate('comments').exec()
        .then((post) => {
            if (!post) {
                return next({
                    status: 404,
                    message: 'Post Not Found'
                })
            }
            res.send(post.comments);

        }).catch((err) => {
            next(err);
        });
});

router.post('/posts/comments/:id', (req, res, next) => {
    db.Post.findById(req.params.id)
        .then(async (post) => {
            if (!post) {
                return next({
                    status: 404,
                    message: 'Post Not Found'
                })
            }
            try {
                console.log("post mila", req.body);
                let user = await db.User.findById(req.body.id);
                commentBody = {
                    author: user,
                    text: req.body.text
                }
                db.Comment.create(commentBody)
                    .then(async (comment) => {
                        await post.comments.push(comment);
                        await post.save();
                        res.status(200).send(comment);
                        return;
                    }).catch((err) => {
                        return next(err);
                    });
            } catch (err) { next(err) }

        })
        .catch(err => next(err));
});

router.put('/posts/comments/edit/:id', (req, res, next) => {
    db.Comment.findByIdAndUpdate(req.params.id, req.body)
        .then((comment) => {
            if (!comment) {
                next({
                    status: 404,
                    message: 'Comment Not Found'
                })
            }
            res.send(comment);
        })
        .catch((err) => {
            next(err)
        });
});
router.delete('/posts/comments/delete/:postId/:cmntId', (req, res, next) => {
    db.Post.findById(req.params.id).populate('comments')
        .then((post) => {
            if (!post) {
                return next({
                    status: 404,
                    message: 'Post Not Found'
                })
            }
            db.Comment.findByIdAndRemove(req.params.cmntId)
                .then(async (comment) => {
                    if (!comment) {
                        return next({
                            status: 404,
                            message: 'Comment Not Found'
                        })
                    }
                    const toRemove = post.comments.findIndex(cmnt => cmnt == req.params.cmntId);
                    if (toRemove != -1) {
                        await post.comments.splice(toRemove, 1);
                        await post.save();
                        return res.send(posts.comments);
                    }

                }).catch((err) => {
                    next(err);
                });

        }).catch((err) => {
            next(err);
        });
})


module.exports = router;
