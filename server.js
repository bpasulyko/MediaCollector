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

app.get('/movie', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/tv', function (req, res) {
  res.sendFile(__dirname + '/index.html');
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
    res.end(JSON.stringify(results))
  });
});
