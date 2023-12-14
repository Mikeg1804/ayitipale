


// const router = require('express').Router();
// const { Comment, Blog } = require('../../../models');

// router.post('/', async (req, res) => {
//     try {
//      const newComment = await Comment.create({
//             content: req.body.content,
//             authorname: req.session.author.authorname,
//             blogsId: req.body.blogId,
//         });

//     await Blog.update(
//         {
//             $push: { comment: {
//                 content: req.body.content,
//                 authorname: req.session.author.authorname,
//                 blogsId: req.body.blogId,
//             }}
//         },
//         {
//             where: {
//                 id: req.body.blogId
//             }
//         }
//     );

//     console.log(newComment);

//         res.status(200).json(newComment);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error);
//     }
// });

// module.exports = router;




const router = require('express').Router();
const { Comment, BlogComment } = require('../../../models');



router.post('/', async (req, res) => {
    try {
      const newComment = await Comment.create({
        content: req.body.content,
        authorId: req.session.author.id,
        blogId: req.body.blogId,
      });
  
      // Create a record in BlogComment to associate the new comment with the blog
      await BlogComment.create({
        blogId: req.body.blogId,
        commentId: newComment.id,
      });
  
      console.log(newComment);
  
      res.status(200).json(newComment);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });
  

// // December meeting code with Lau.
// router.post('/', async (req, res) => {
//     try {
//      const newComment = await Comment.create({
//             content: req.body.content,
//             authorId: req.session.author.id,
//             blogsId: req.body.blogId,
//         });

//       await Blog.update(
//             {
//                 where: { id: req.body.blogId },
//                 $push: { commentArray: newComment.id }
//             }
//         );
//         const updatedBlog = await Blog.findOne({where: {id: req.body.blogId}});
//         await updatedBlog.pupulate('comments');

//         console.log(newComment);
//         console.log(updatedBlog);

//         res.status(200).json(newComment);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error);
//     }
// });

module.exports = router;




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
