// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./routes');
const helpers = require('./utils');
const path = require('path');
// remember to look up what this does. It was missing in this app, but included in the gang social media app.
require('dotenv').config();

const hbs =exphbs.create({
  helpers
});

const sequelize = require('./config/connection');


// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const sessionConfig = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: false,
};
  

app.get('/example', (req, res) => {
  // Assuming the session object is stored in req.session
  console.log(req.session);
  res.send('Check the console to see the session object!');
});

app.use(express.static(__dirname + '/public'));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session(sessionConfig));

app.use(routes);

// Starts the server to begin listening
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
