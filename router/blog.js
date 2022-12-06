const router = require('express').Router();
const Blog = require('../model/Blog');
const Users = require('../model/Users')
const verify = require('./token_verify');


// ALL BlogPost Seen
router.get('/', (req, res) => {

    Blog.find().sort({ Date: -1 }).populate('User').then(blog => {
        if (!blog) {
            return res.status(404).send('data is not SHOW')
        }
        res.json(blog)
    })
});

// all blog Search
// router.get('/search', async (req, res) => {   

//    const searchBlog = await Blog.findOne({
//         tpoic: req.body.topic
//     });
//    console.log(req.body.topic)
//     if (!searchBlog) 
//         return res.status(400).json("Topic not found");
//     else{
//         res.json({searchBlog})
//     }
// });


// Only My Blogs View

router.get('/myblogs/:userid', verify, (req, res) => {

    if (req.user.toString() !== req.params.userid) {
        return res.status(401).json({
            message: "not authenticate"
        })
    }

    Users.findById(req.params.userid, (err, user) => {

        if (err || !user) {
            return res.status(422).json({
                error: err,
                message: "user not found"
            })
        }
        Blog.find({ User: req.params.userid }).sort({ Date: -1 }).populate('User').then(blog => {

            if (!blog) {
                return res.status(422).json({
                    error: err,
                    message: " Blogs not found"
                })
            }

            res.json(blog)

        });

    });

})


// Adding BlogPost
router.post('/add/:userid', verify, (req, res) => {

    if (req.user.toString() !== req.params.userid.toString()) {
        return res.status(401).json({
            message: "not authenticate"
        })
    }
    Users.findById(req.params.userid, (err, user) => {
        if (err || !user) {
            return res.status(501).json({
                error: err,
                message: " user not found "
            })
        }

        if (req.body.quistion === req.body.topic &&
            req.body.quistion === req.body.answer &&
            req.body.topic === req.body.answer) {
            return res.status(501).json({
                message: "Same data not valid"
            })
        }
        const data = new Blog({
            quistion: req.body.quistion,
            topic: req.body.topic,
            answer: req.body.answer,
            User: user,
           
        })

        data.save().then(data => {
            res.json({
                message: "Blog Added Successfull",
                data: data
            })
        }).catch(err => {
            res.status(501).json({
                error: err,
                message: "cant data save db"
            })

        })

    })


});


// Update BlogPost

router.put('/update/:userid/:blogid', verify, (req, res) => {

    if (req.user.toString() !== req.params.userid) {
        return res.status(401).json({
            message: "not authenticate"
        })
    }

    Users.findById(req.params.userid, (err, user) => {
        if (err || !user) {
            return res.status(501).json({
                error: err,
                message: " user not found "
            })
        }

        Blog.findById(req.params.blogid, (err, blog) => {

            if (err || !blog) {
                return res.status(404).json({
                    error: err,
                    message: " blog not found "
                })
            }


            if (blog.User.toString() !== user._id.toString()) {

                return res.status(401).json({
                    message: "permison denied"
                })

            }

            if (req.body.quistion == req.body.topic &&
                req.body.quistion == req.body.answer &&
                req.body.topic == req.body.answer) {
                return res.status(501).json({
                    message: "Same data not valid"
                })
            }


            if (req.body.quistion) {

                blog.quistion = req.body.quistion;
            }

            if (req.body.topic) {
                blog.topic = req.body.topic;
            }
            if (req.body.answer) {
                blog.answer = req.body.answer;

            }

            blog.save().then(blogs => {

                res.json({
                    message: "Blog Update Successfull",
                    blogs: blogs
                })
            }).catch(err => {
                res.status(501).json({
                    error: err,
                    message: "cant data update db"
                })
            })
            // } else {
            //     return res.status(501).json({
            //         message: "please defferant type of blogs"
            //     })
            // }

        })
    })
});

// Delete BlogPost
router.delete('/delete/:userid/:blogid', verify, (req, res) => {

    if (req.user.toString() !== req.params.userid) {
        return res.status(422).json({
            message: "not authenticate"
        })
    }


    Users.findById(req.params.userid, (err, user) => {
        if (err || !user) {
            return res.status(501).json({
                error: err,
                message: " user not found "
            })

        }
        Blog.findById(req.params.blogid, (err, blog) => {

            if (err || !blog) {
                return res.status(404).json({
                    error: err,
                    message: " blog not found "
                })
            }

            if (blog.User.toString() !== user._id.toString()) {

                return res.status(401).json({
                    message: "permison denied"
                })

            }

            Blog.findByIdAndDelete(req.params.blogid, (err, blog) => {
                if (err) return res.status(504).json({
                    error: err,
                    message: "mongoose problem"
                })

                res.json({
                    message: "Blog Delete Successfull",
                    blog: blog
                });

            })

        })
    })
})

module.exports = router;