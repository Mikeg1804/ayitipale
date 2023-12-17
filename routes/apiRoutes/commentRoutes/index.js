
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
  


module.exports = router;




