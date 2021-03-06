var express = require('express');
var bodyParser = require("body-parser");
var indexPage = require('./views/indexPage.js');
var keysModule = require('./models/keysModule.js');
// var ObladiOblada = require('./indexPage.js');
// ObladiOblada.getPage({
//	customer_name: "cu"
//});
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send(indexPage.getPage(req.query));
});

app.get('/hello', function (req, res) {
  res.send("Hello");
});

app.get('/search', function (req, res) {
  //  req.body = { customer_name: "cu" }
  res.send(indexPage.getPage(req.query));
});

app.post('/record', function (req, res) {
    var isOk = keysModule.addRecord(req.body);
    if (isOk)  {
        res.redirect('/');
    } else {
        res.redirect('/?message=Post data failed');
    }    
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