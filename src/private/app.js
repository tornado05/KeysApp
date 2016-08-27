var express = require('express');
var bodyParser = require("body-parser");
var keysModule = require('./models/keysModule.js');
var userModule = require('./models/userModule.js');
var appView = require('./views/appView.js');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

var id = 1;

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
	console.log(req.query);
	console.log(req.body);
	var objId = id;
	++id;
	res.send({id: objId, test: 'test'});
    //res.send(appView.addRecord(req.body)) ;
});

app.put('/record', function (req, res) {
	console.log(req.query);
	console.log(req.body);
	res.send({id: req.body.id, test: 'test2'});
    //res.send(appView.addRecord(req.body)) ;
});

app.get('/record', function (req, res) {
    res.send({test: 'test'}) ;
});

app.post('/authenticate', function (req, res) {
    res.send(appView.authenticate(req.body)) ;
});

app.get('/hello', function (req, res) {
	userModule.authorize(req, res, function () {
		return appView.hello(req.query);
	})
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});