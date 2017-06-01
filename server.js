const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use( (req, res, next) => {
   var now = new Date().toString();
   var log = `${now}: ${req.method} ${req.url}`
   console.log(log);
   fs.appendFile('server.log', log + '\n');

   // fs.appendFile('server.log', log + '\n', () => {
   //    if (err) {
   //       console.log('Unable to append to server.log.');
   //    }
   // });
      // body
   // })
   next();
});


// app.use( (req, res, next) => {
//    res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase();
});
//app.get es el handler para un http get request. tiene dos parámetros:
// 1) url o path, root de la app.
// 2) la función que se ejecutara.
app.get('/', (request, response) => {
   // response.send('<h1>Hello express!</h1>');
   // response.send({
   //    name: 'Rodrigo',
   //    likes: [
   //    'music',
   //    'food'
   //    ]
   // });
   response.render('home.hbs', {
      pageTitle: 'Home Page',
      welcomeMessage: 'Welcome to my website'
   });
});

app.get('/about', (req, res) => {
   // res.send('About Page');
   res.render('about.hbs', {
      pageTitle: 'About Page'
   });
});

app.get('/projects', (req, res) => {
   res.render('projects.hbs', {
      pageTitle: 'Projects'
   });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
   res.send({
      errorMessage: 'Unable to handle request'
   });
});

//1) port
// 2) function
app.listen(port, () => {
   console.log(`Server is up on port ${port}`);
});