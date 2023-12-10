


const router = require('express').Router();
const { Comment, Blog } = require('../../../models');

router.post('/', async (req, res) => {
    try {
     const newComment = await Comment.create({
            content: req.body.content,
            authorname: req.session.author.authorname,
            blogsId: req.body.blogId,
        });

    await Blog.update(
        {
            $push: { comment: {
                content: req.body.content,
                authorname: req.session.author.authorname,
                blogsId: req.body.blogId,
            }}
        },
        {
            where: {
                id: req.body.blogId
            }
        }
    );

    console.log(newComment);

        res.status(200).json(newComment);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;




// const router = require('express').Router();
// const { Comment } = require('../../../models');

// router.post('/', async (req, res) => {
//     try {
//      const newComment = await Comment.create({
//             content: req.body.content,
//             authorname: req.session.author.authorname,
//             blogsId: req.body.blogId,
//         });

//     console.log(newComment);

//         res.status(200).json(newComment);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error);
//     }
// });

// module.exports = router;




// const router = require('express').Router();
// const { Comment } = require('../../../models');

// router.post('/comment', async (req, res) => {
//     try {
//         if (!req.session.loggedin || !req.session.author) {
//             return res.status(400).json({ message: 'You must be logged in to create a comment' });
//         }

//         const newComment = {
//             content: req.body.content,
//             authorId: req.session.author.id,
//             blogId: req.body.blog.id,
//         };

//         const dbCommentData = await Comment.create(newComment);

//         res.status(200).json(dbCommentData);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

// module.exports = router;
