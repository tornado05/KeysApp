var express = require('express');
var bodyParser = require("body-parser");
var indexPage = require('./views/indexPage.js');
// var ObladiOblada = require('./indexPage.js');
// ObladiOblada.getPage({
//	customer_name: "cu"
//});
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send(indexPage.getPage());
});

app.get('/hello', function (req, res) {
  res.send("Hello");
});

app.get('/search', function (req, res) {
   console.log(req.query);
  //  req.body = { customer_name: "cu" }
  res.send(indexPage.getPage(req.query));
});

app.post('/record', function (req, res) {
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