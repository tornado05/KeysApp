var express = require('express');
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(/*port*/3000, /*callback*/function () {
  console.log('Example app listening on port 3000!');
});