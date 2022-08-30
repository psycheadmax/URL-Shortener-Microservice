// import UrlModel, findOrCreate, create from "./mongoFunc.js";
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

// TODO body parsing middleware to handle POST req - OK
// TODO dns.lookup(host, cb) - OK
// TODO store in db
// TODO move mongo functions to another file - OK
// TODO rewrite w/o mongo

  // TODO plan
  // find if exists
  // create if not
  // num. should generate or not???

// TODO random id or unique id from db
// TODO display path

app.post('/api/shorturl', function(req, res) {
  const urlToLookup = req.body.url
  dns.lookup(urlToLookup, (err) => {
    if (err) {
      console.log(err)
      res.json({'name': 'invalid url'})
    }
  })
  require('./mongoFunc.js').findOrCreate(urlToLookup)
  // create(urlToLookup)
  res.json({'name': urlToLookup}) // the answer is: {"name":{"url":"vkfb.ru"}}
});

// TODO example answer is:
// {"original_url":"https://vk.com","short_url":226}

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
