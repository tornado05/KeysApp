var express = require('express');
var bodyParser = require("body-parser");
var indexPage = require('./views/indexPage.js');
var keysModule = require('./models/keysModule.js');
var appView = require('./views/appView.js');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/workers', function (req, res) {
    res.send(keysModule.getAllWorkers());
});

app.get('/search', function (req, res) {
  res.send(appView.searchRecord(req.query));
});

app.get('/chart', function (req, res) {
  res.send(appView.getChartData());
});

app.post('/record', function (req, res) {
    res.send(appView.addRecord(req.body)) ;
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});