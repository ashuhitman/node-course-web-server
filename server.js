const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log + '\n', (err) => {
     if(err) {
       console.log('unable to append to server.log');
     }
  });
   next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamit', (text) => {
    return text.toUpperCase()
});
app.get('/',(req, res) =>{
   res.render('home.hbs',{
     pageTitle: 'Home Page',
     greeting: 'Welcome Vistor !',
     currentYear: new Date().getFullYear()
   });
});

app.get('/about',(req, res) =>{
   res.render('about.hbs',{
     pageTitle: 'About aa Page',
   });
});

app.listen(3000);
