const express = require('express');
const bodyParser= require('body-parser');
const omdbApi = require('omdb-client');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var db;
MongoClient.connect('mongodb://bpasulyko:bpasulyko@ds025583.mlab.com:25583/collection', function(err, database) {
  if (err) return console.log(err);
  db = database;
  app.listen(3000, function() {
    console.log('listening on 3000')
  });
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/movies', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/tvshows', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/games', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/search', function (req, res) {
  omdbApi.search(req.body, function(err, data) {
  	res.end(JSON.stringify(data));
  });
});

app.post('/getItem', function (req, res) {
  omdbApi.get(req.body, function(err, data) {
  	res.end(JSON.stringify(data));
  });
});

app.post('/saveItem', function(req, res) {
  db.collection(req.body.type).save(req.body.itemData, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.end(JSON.stringify(result));
  });
});

app.post('/loadItems', function (req, res) {
  db.collection(req.body.collection).find().toArray(function(err, results) {
    console.log(results)
    res.end(JSON.stringify(results))
  });
});
