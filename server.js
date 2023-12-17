
const express = require('express');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const session = require('express-session');
const routes = require('./routes');
const helpers = require('./utils');
const path = require('path');

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

Handlebars.registerHelper('eq', function(a, b, options) {
  // If used as a subexpression, return a boolean value
  if (!options) {
      return a === b;
  }
  
  // Ensure we have both fn and inverse
  if (typeof options.fn !== 'function' || typeof options.inverse !== 'function') {
      throw new Error('eq helper must be used as a block helper with both true and inverse blocks.');
  }
  
  return a === b ? options.fn(this) : options.inverse(this);
});


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


