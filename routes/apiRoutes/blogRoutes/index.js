const router = require('express').Router();
const {Blog} = require('../../../models');

router.post('/', async (req, res) => {
    try {
        const newBlogData = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            authorId: req.session.author.id, 
        });
  
        res.json(newBlogData);
    } catch (err) {
        res.status(500).json(err);
    }

});


router.get('/teknoloji', async (req, res) => {
    try {
        const categoryToFind = req.params.category.toLowerCase(); // Convert category to lowercase
        
        const whereClause = {
            authorId: req.session.author.id,
            category: categoryToFind, // Filter by the requested category
        };
        
        const newBlogData = await Blog.findAll({
            where: whereClause,
        });

        res.json(newBlogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/komedi', async (req, res) => {
    try {
        const categoryToFind = req.params.category.toLowerCase(); // Convert category to lowercase
        
        const whereClause = {
            authorId: req.session.author.id,
            category: categoryToFind, // Filter by the requested category
        };
        
        const newBlogData = await Blog.findAll({
            where: whereClause,
        });

        res.json(newBlogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/kontantman', async (req, res) => {
    try {
        const categoryToFind = req.params.category.toLowerCase(); // Convert category to lowercase
        
        const whereClause = {
            authorId: req.session.author.id,
            category: categoryToFind, // Filter by the requested category
        };
        
        const newBlogData = await Blog.findAll({
            where: whereClause,
        });

        res.json(newBlogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/agrikilti', async (req, res) => {
    try {
        const categoryToFind = req.params.category.toLowerCase(); // Convert category to lowercase
        
        const whereClause = {
            authorId: req.session.author.id,
            category: categoryToFind, // Filter by the requested category
        };
        
        const newBlogData = await Blog.findAll({
            where: whereClause,
        });

        res.json(newBlogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/nati', async (req, res) => {
    try {
        const categoryToFind = req.params.category.toLowerCase(); // Convert category to lowercase
        
        const whereClause = {
            authorId: req.session.author.id,
            category: categoryToFind, // Filter by the requested category
        };
        
        const newBlogData = await Blog.findAll({
            where: whereClause,
        });

        res.json(newBlogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/lot', async (req, res) => {
    try {
        const categoryToFind = req.params.category.toLowerCase(); // Convert category to lowercase
        
        const whereClause = {
            authorId: req.session.author.id,
            category: categoryToFind, // Filter by the requested category
        };
        
        const newBlogData = await Blog.findAll({
            where: whereClause,
        });

        res.json(newBlogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const [numRowsUpdated, blogData] = await Blog.update({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
        }, {
            where: {
                id: req.params.id,
                authorId: req.session.author.id,
            },
        });

        if (numRowsUpdated === 0) {
            res.status(404).json({ message: 'No blog found with this id or you do not have permission to update this blog.' });
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                // author_id: req.session.author_id,
            },
        });
        if (!blogData) {
            res.status(404).json({message: 'No blog found with this id!'});
            return;
        }
        res.status(200).json(blogData);
    }catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;