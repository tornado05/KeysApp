var express = require('express');
var bodyParser = require("body-parser");
var indexPage = require('./indexPage.js');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send(indexPage.getPage());
});

app.post('/', function (req, res) {
  res.send(indexPage.getPage(req.body));
});

app.listen(/*port*/3000, /*callback*/function () {
  console.log('Example app listening on port 3000!');
});

/*
 var express = function () {
	 return {
		 
	 };
 }
	HTTP 1.0
	GET
	POST
	
	callback
	function a(b) {
		/----
		---
		
		b();
	}
*/