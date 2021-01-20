const express = require('express');
const router = express.Router();
const db = require('../models');

// Getting Posts
router.get('/posts/getAll', (req, res, next) => {
    db.Post.find().populate('author').populate({ path: 'comments', populate: { path: 'author' } }).sort({ created: 1 }).limit(10).exec()

        .then(posts => {
            res.status(200).send(posts);
        })
        .catch(err => next(err));
});

router.get('/posts/getTrendingHashtags', (req, res, next) => {
    // db.Post.find().populate('author').populate({ path: 'comments', populate: { path: 'author' } }).sort({ created: 1 }).limit(10).exec()

    //     .then(posts => {
    //         res.status(200).send(posts);
    //     })
    //     .catch(err => next(err));
});

router.get('/posts/getAllWithHashtag/:id', (req, res, next) => {
    db.Hashtag.find({name:req.params.id}).populate({path:'posts',populate:'author'}).populate({path:'posts',populate:{ path: 'comments', populate: { path: 'author' } }}).sort({ created: 1 }).exec()
        .then(data => {
            res.status(200).send(data.posts);
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
    db.Post.findById(req.params.id).populate("author").populate({ path: 'comments', populate: { path: 'author' } })
        .then((post) => {
            if (!post) {
                return next({
                    status: 404,
                    message: "Post Not Found"
                })
            }
            res.status(200).send(post);
        })
        .catch(err => next(err))
});

router.post('/posts/create', (req, res, next) => {
    db.User.findById(req.body.author)
        .then((user) => {
            if (!user) {
                return next({
                    status: 404,
                    message: 'User Not Found'
                })
            }
            db.Post.create(req.body)
                .then(async (newPost) => {
                    await user.posts.push(newPost);
                    await user.save();
                    res.status(200).send(newPost);
                })
                .catch(err => next(err))
        }).catch((err) => {

        });

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
                let user = await db.User.findById(req.body.id);
                if (post.likedBy.findIndex((u) => u == req.body.id) == -1 && user) {
                    await post.likedBy.push(user);
                    let activity = {
                        post: post._id,
                    }
                    await user.liked.push(activity);
                    var created = new Date();
                    await post.save()
                    await user.save();
                    return res.status(200).send(created);
                }
                return next({
                    status: 403,
                    message: 'You have already liked this post'
                });
            } catch (err) { next(err) }

        })
});


router.put('/posts/like/:id', (req, res, next) => {
    db.Post.findById(req.params.id)
        .then(async (post) => {
            if (!post) {
                return next({
                    status: 404,
                    message: 'Post Not Found'
                })
            }
            try {
                let user = await db.User.findById(req.body.id);
                let to_remove = post.likedBy.findIndex((u) => {
                    return u == req.body.id;
                });
                if (to_remove !== -1 && user) {
                    await post.likedBy.splice(to_remove, 1);
                    user.liked = await user.liked.filter(p => p.post != req.params.id);
                    await user.save();
                    await post.save();
                    return res.status(200).send('Unliked Post');
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
            res.status(200).send(post.comments);

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
                let user = await db.User.findById(req.body.id);
                if (user) {
                    commentBody = {
                        author: user,
                        text: req.body.text
                    }
                    db.Comment.create(commentBody)
                        .then(async (comment) => {
                            await post.comments.push(comment);
                            await post.save();
                            let activity = {
                                post: post._id,
                            }
                            await user.commented.push(activity);
                            await user.save();
                            res.status(200).send(comment);
                            return;
                        }).catch((err) => {
                            return next(err);
                        });
                } else {
                    return next({
                        status: 404,
                        message: 'User Not Found'
                    })
                }
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
                    if (toRemove != -1 && user) {
                        await post.comments.splice(toRemove, 1);
                        await post.save();
                        user.commented = user.commented.filter(p => JSON.stringify(p._id) == JSON.stringify(post._id));
                        await user.save();
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



