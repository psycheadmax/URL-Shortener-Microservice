const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const randomId = () => Math.floor(Math.random()*1000)
const id = randomId()
let urlToLookup

function urlCorrector(url) {
  url = url.replace(/(http\:\/\/)|(https\:\/\/)/, '') // remove http://
  // const regex = /^(((http\:\/\/)|(https\:\/\/)){0,1}[a-zA-z0-9])([-a-zA-Z0-9.]*)\.([a-zA-Z]{2,})$/ // with looking for http
  const regex = /^([a-zA-z0-9])([-a-zA-Z0-9.]*)\.([a-zA-Z]{2,})$/
  if (regex.test(url)) {
    urlToLookup = url
    return urlToLookup
  } else {
    return false
  }
}

app.post('/api/shorturl', function(req, res) {
  urlToLookup = req.body.url
  if (urlCorrector(urlToLookup)) {
    dns.lookup(urlToLookup, (err) => {
      if (err) {
        res.json({'name': 'invalid url'})
      } else {
        res.json({
          "original_url": urlToLookup,
          "short_url": id
        })
      }
    })
  }
});

app.get('/api/shorturl/'+id, function(req, res) {
  res.redirect(301, 'http://' + urlToLookup)
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
