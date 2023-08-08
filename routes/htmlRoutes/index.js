const router = require('express').Router();
const {Blog, Author} = require('../../models');

router.get('/signup', async (req, res) => {
    try{
        const authorData = await Author.findAll();
        const authors = authorData.map(author => author.get({plain: true}));
        res.render('signup', {
            authors,
            visitCount: req.session.visitCount || 0,
            loggedInAuthor: req.session.loggedIn || null,
        });
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
  
    try{
        const authorData = await Author.findAll();
        const authors = authorData.map(author => author.get({plain: true}));
        res.render('login', {
            authors,
            visitCount: req.session.visitCount || 0,
            loggedInAuthor: req.session.loggedIn || null,
        });
    } catch(err){
        res.status(500).json({message: "incorrect username or password"});
    }
 }); 

router.get('/', async (req, res) => {
    try{
        const blogsData = await Blog.findAll(
            {
                include: [
                {model: Author,
                attributes: ['authorname'],
                }
            ]
            }
        );
        const blogs = blogsData.map((blog) => blog.get({plain: true}));
        res.render('home', {
                    blogs,
                    loggedInAuthor: req.session.author || null,
                })
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});


router.get('/authors/:authorId', async (req, res) => {
//  console.log(req.session.author.id)
    
    try {
      const { authorId } = req.params;
      // console.log(req.params);
      const authorData = await Author.findByPk(authorId, {
        include: [
          {
            model: Blog,
            attributes: ['id', 'title', 'content',],
          }
        ]
      });

      const author = authorData.get({plain: true});

      res.render('author_profile', {
        author,
        loggedInAuthor: req.session.author || null,  
           
      });
      
    } catch (error) {
        console.log(error);
      res.status(500).json({error});
    }
});
  


module.exports = router;