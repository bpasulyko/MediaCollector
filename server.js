const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

var db;

app.listen(3000, function() {
  console.log('listening on 3000')
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
