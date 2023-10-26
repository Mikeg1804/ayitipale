const router = require('express').Router();
const authorRoutes = require('./authorRoutes');
const blogRoutes = require('./blogRoutes');
const commentRoutes = require('./commentRoutes');
const likeRoutes = require('./likeRoutes');


router.use('/authors', authorRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);
router.use('/like', likeRoutes);

module.exports = router;