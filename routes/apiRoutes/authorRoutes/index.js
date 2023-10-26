const router = require('express').Router();
const bcrypt = require('bcrypt');
const {Author} = require('../../../models');

router.post('/signup', async (req, res) => {
    try {
        const authorData = req.body;
        if(!authorData.email) {
            return res.status(400).json({message: 'Please enter an email address!'});
        }
        const hashedPassword = await bcrypt.hash(authorData.password, 10);
        authorData.password = hashedPassword;
        const newAuthor = await Author.create(authorData);
        req.session.save(() => {
            req.session.Author = newAuthor.id;
            req.session.logged_in = true;
            res.status(200).json(newAuthor);
        });

    } catch (err) {
        res.status(500).json({message: 'Please enter an email address!'});
    }
});

router.post('/login', async (req, res) => {
    try{
        const authorData = await Author.findOne({
            where: {
                authorname: req.body.authorname,
            }
        });
        if (!authorData) {
            return res.status(400).json({message: 'Incorrect username or password!'});
        } 
       
        const validPassword = await bcrypt.compare(
            req.body.password,
            authorData.password
            );
        if (!validPassword) {
            return res.status(400).json({message: 'Incorrect email or password!'});
        }
        req.session.save(() => {
            req.session.author = authorData.get({plain: true});
            req.session.loggedin = true;
            res.status(200).json(authorData);
        });    
    } catch (err) {
        res.status(500).json({message: 'incorrect username or password'});
    }
});



router.post('/logout', (req, res) => {
        req.session.destroy(() => {
            res.json({ success: true });
        });
      });
      




  // Admin user signup route
router.post('/admin/signup', async (req, res) => {
    try {
      const adminData = req.body;
      if (!adminData.email) {
        return res.status(400).json({ message: 'Please enter an email address!' });
      }
      
      const hashedPassword = await bcrypt.hash(adminData.password, 10);
      adminData.password = hashedPassword;
      adminData.isAdmin = true; // Set isAdmin flag for admin user
      
      const newAdmin = await Author.create(adminData);
      
      req.session.save(() => {
        req.session.author = newAdmin.id;
        req.session.loggedin = true;
        res.status(200).json(newAdmin);
      });
    } catch (err) {
      res.status(500).json({ message: 'An error occurred during admin signup.' });
    }
  });
  
  // Admin user login route
  router.post('/admin/login', async (req, res) => {
    try {
      const adminData = await Author.findOne({
        where: {
          authorname: req.body.authorname,
        }
      });
      
      if (!adminData || !adminData.isAdmin) {
        return res.status(400).json({ message: 'Incorrect username or password!' });
      }
      
      const validPassword = await bcrypt.compare(
        req.body.password,
        adminData.password
      );
      
      if (!validPassword) {
        return res.status(400).json({ message: 'Incorrect email or password!' });
      }
      
      req.session.save(() => {
        req.session.author = adminData.get({ plain: true });
        req.session.loggedin = true;
        res.redirect('/admin/dashboard'); // Redirect to admin dashboard upon successful login
      });
    } catch (err) {
      res.status(500).json({ message: 'An error occurred during admin login.' });
    }
  });
  
  // Admin dashboard route
  router.get('/admin/dashboard', (req, res) => {
    // Implement functionality to list all blogs and provide options to delete them
    // You might need to query the Blog model to retrieve the blog data
  });
      



module.exports = router;