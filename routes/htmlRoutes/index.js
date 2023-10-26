const moment = require('moment-timezone');
moment.locale('ht'); // set Haitian Creole locale

function translateToKreyol(date) {
    const days = {
        'Sunday': 'Dimanch',
        'Monday': 'Lendi',
        'Tuesday': 'Madi',
        'Wednesday': 'Mèkredi',
        'Thursday': 'Jedi',
        'Friday': 'Vandredi',
        'Saturday': 'Samdi'
    };

    const months = {
        'January': 'Janvye',
        'February': 'Fevriye',
        'March': 'Mas',
        'April': 'Avril',
        'May': 'Me',
        'June': 'Jen',
        'July': 'Jiyè',
        'August': 'Out',
        'September': 'Septanm',
        'October': 'Oktòb',
        'November': 'Novanm',
        'December': 'Desanm'
    };

    let kreyolDate = days[date.format('dddd')] + ', ' + date.format('D') + ' ' + months[date.format('MMMM')] + ', ' + date.format('YYYY h:mm A');
    return kreyolDate;
}



const router = require('express').Router();
const {Blog, Author, Comment} = require('../../models');

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
    try {
        const blogsData = await Blog.findAll({
            include: [
                {
                    model: Author,
                    attributes: ['authorname'],
                }
                // ,
                // {
                //     model: Comment,
                //     attributes: ['content'],
                // },
            ],
            order: [['createdAt', 'DESC']], // Order by createdAt in descending order
        });


        const blogs = blogsData.map((blog) => {
            let plainBlog = blog.get({ plain: true });
            
            // Translate createdAt to Kreyol format
            const translatedDate = translateToKreyol(moment.tz(plainBlog.createdAt, 'GMT'));
            plainBlog.createdAtKreyol = "Ekri le " + translatedDate;
            
            return plainBlog;
        });
    

        res.render('home', {
            blogs,
            loggedInAuthor: req.session.author || null,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/Teknoloji', async (req, res) => {
    try {
        const blogsData = await Blog.findAll({
            where: { category: 'Teknoloji' },
            include: [
                {
                    model: Author,
                    attributes: ['authorname'],
                },
            ],
            order: [['createdAt', 'DESC']], // Order by createdAt in descending order
        });

        blogsData.forEach(blog => {
            let date = moment(blog.dataValues.createdAt).tz("America/Port-au-Prince");
            blog.dataValues.formattedDate = translateToKreyol(date);
        });
        

        // Check if there are any blogs in the 'Teknoloji' category
        const hasTeknolojiBlogs = blogsData && blogsData.length > 0;

        res.render('teknoloji', {
            blogs: blogsData,
            hasTeknolojiBlogs
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/Agrikilti', async (req, res) => {
    try {
        const blogsData = await Blog.findAll({
            where: { category: 'Agrikilti' },
            include: [
                {
                    model: Author,
                    attributes: ['authorname'],
                },
            ],
            order: [['createdAt', 'DESC']], // Order by createdAt in descending order
        });
        blogsData.forEach(blog => {
            let date = moment(blog.dataValues.createdAt).tz("America/Port-au-Prince");
            blog.dataValues.formattedDate = translateToKreyol(date);
        });
        
        console.error(blogsData);

        // Check if there are any blogs in the 'Teknoloji' category
        const hasTeknolojiBlogs = blogsData && blogsData.length > 0;

        res.render('agrikilti', {
            blogs: blogsData,
            hasTeknolojiBlogs
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/Komedi', async (req, res) => {
    try {
        const blogsData = await Blog.findAll({
            where: { category: 'Komedi' },
            include: [
                {
                    model: Author,
                    attributes: ['authorname'],
                },
            ],
            order: [['createdAt', 'DESC']], // Order by createdAt in descending order
        });
        blogsData.forEach(blog => {
            let date = moment(blog.dataValues.createdAt).tz("America/Port-au-Prince");
            blog.dataValues.formattedDate = translateToKreyol(date);
        });
        

        console.error(blogsData);

        // Check if there are any blogs in the 'Teknoloji' category
        const hasTeknolojiBlogs = blogsData && blogsData.length > 0;

        res.render('komedi', {
            blogs: blogsData,
            hasTeknolojiBlogs
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/kontantman', async (req, res) => {
    try {
        const blogsData = await Blog.findAll({
            where: { category: 'kontantman' },
            include: [
                {
                    model: Author,
                    attributes: ['authorname'],
                },
            ],
            order: [['createdAt', 'DESC']], // Order by createdAt in descending order
        });

        blogsData.forEach(blog => {
            let date = moment(blog.dataValues.createdAt).tz("America/Port-au-Prince");
            blog.dataValues.formattedDate = translateToKreyol(date);
        });
        
        console.error(blogsData);

        // Check if there are any blogs in the 'Teknoloji' category
        const hasTeknolojiBlogs = blogsData && blogsData.length > 0;

        res.render('kontantman', {
            blogs: blogsData,
            hasTeknolojiBlogs
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/Nati', async (req, res) => {
    try {
        const blogsData = await Blog.findAll({
            where: { category: 'Nati' },
            include: [
                {
                    model: Author,
                    attributes: ['authorname'],
                },
            ],
            order: [['createdAt', 'DESC']], // Order by createdAt in descending order
        });


  
    blogsData.forEach(blog => {
        let date = moment(blog.dataValues.createdAt).tz("America/Port-au-Prince");
        blog.dataValues.formattedDate = translateToKreyol(date);
    });
    

        const hasTeknolojiBlogs = blogsData && blogsData.length > 0;

        res.render('nati', {
            blogs: blogsData,
            hasTeknolojiBlogs
        });
       
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/lot', async (req, res) => {
    try {
        const blogsData = await Blog.findAll({
            where: { category: 'lot' },
            include: [
                {
                    model: Author,
                    attributes: ['authorname'],
                },
            ],
            order: [['createdAt', 'DESC']], // Order by createdAt in descending order
        });

        console.error(blogsData);

        // Check if there are any blogs in the 'Teknoloji' category
        const hasTeknolojiBlogs = blogsData && blogsData.length > 0;

        res.render('lot', {
            blogs: blogsData,
            hasTeknolojiBlogs
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});




  
router.get('/authors', async (req, res) => {

    
    try {

        // Redirect to the login page if not logged in
        res.redirect('/login'); // Replace with your actual login URL
  
      
    } catch (error) {
        console.log(error);
      res.status(500).json({error});
    }
});

router.get('/egzamp', (req, res) => {
    res.render('egzamp');
});

router.get('/authors/:authorId', async (req, res) => {

    
    try {
      const { authorId } = req.params;
      if (req.session.loggedin) {
      const authorData = await Author.findByPk(authorId, {
        include: [
          {
            model: Blog,
            attributes: ['id', 'title', 'content', 'category'],
          }
        ]
      });

      const author = authorData.get({plain: true});

      res.render('author_profile', {
        author,
        loggedInAuthor: req.session.author || null,  
           
      });
    } else {
        // Redirect to the login page if not logged in
        res.redirect('/login'); // Replace with your actual login URL
    }
      
    } catch (error) {
        console.log(error);
      res.status(500).json({error});
    }
});

module.exports = router;