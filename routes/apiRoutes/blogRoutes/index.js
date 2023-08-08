const router = require('express').Router();
const {Blog} = require('../../../models');

router.post('/', async (req, res) => {
    try {
        const newBlogData = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            authorId: req.session.author.id, 
        });
        console.log(req.session)
        res.json(newBlogData);
    } catch (err) {
        res.status(500).json(err);
    }

});

// router.get('/', async (req, res) => {
//     try {
//         const blogData = await Blog.findAll({
//             where: {blogData: true},
//         });
//         res.status(200).json(blogData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         const blogData = await Blog.destroy({
//             where: {
//                 id: req.params.id,
//                 author_id: req.session.author_id,
//             },
//         });
//         if (!blogData) {
//             res.status(404).json({message: 'No blog found with this id!'});
//             return;
//         }
//         res.status(200).json(blogData);
//     }catch (err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router;