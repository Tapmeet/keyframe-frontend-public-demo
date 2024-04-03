
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs')

app.get('/', function(request, response) {
  console.log('Home page visited!');
  const filePath = path.join(__dirname, './../public_html/build', 'index.html');
  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, 'Home Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "Home page description");
    data = data.replace(/\$OG_IMAGE/g, 'https://codeat21.com/wp-content/uploads/2021/03/CodeAT21-Logo.png');
    return response.send(data);
  });
});

app.get('/about', function(request, response) {
  console.log('About page visited!');
  const filePath = path.join(__dirname, './../public_html/build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'About Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "About page description");
    data = data.replace(/\$OG_IMAGE/g, 'https://codeat21.com/wp-content/uploads/2021/03/CodeAT21-Logo.png');
    return response.send(data);
  });
});

app.get('/shopping/:id', function(request, response) {
    //request.params.id --- get /shopping/:id
  console.log('Shopping page visited!');
  const filePath = path.join(__dirname, './../public_html/build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Shopping Page'+request.params.id);
    data = data.replace(/\$OG_DESCRIPTION/g, "Shopping page description");
    data = data.replace(/\$OG_IMAGE/g, 'https://codeat21.com/wp-content/uploads/2021/03/CodeAT21-Logo.png');
    return response.send(data);
  });
});

app.get('/contact', function(request, response) {
  console.log('Contact page visited!');
  const filePath = path.join(__dirname, './../public_html/build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Contact Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "Contact page description");
    data = data.replace(/\$OG_IMAGE/g, 'https://codeat21.com/wp-content/uploads/2021/03/CodeAT21-Logo.png');
    return response.send(data);
  });
});

app.use(express.static(path.join(__dirname, '../public_html/build')));
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, '../public_html/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
