const express = require('express');
const bodyParser= require('body-parser');
const omdbApi = require('omdb-client');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var db;

app.listen(3000, function() {
  console.log('listening on 3000')
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/search', function (req, res) {
  omdbApi.search(req.body, function(err, data) {
  	res.end(JSON.stringify(data));
  });
});

app.post('/getMovie', function (req, res) {
  omdbApi.get(req.body, function(err, data) {
  	res.end(JSON.stringify(data));
  });
});
