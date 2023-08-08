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
      

module.exports = router;