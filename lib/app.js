var express = require('express');
var bodyParser = require('body-parser');

var app = module.exports = express();

app.use(bodyParser.urlencoded({
	extended: false
}));

app.get('/', require('./routes/home'));
app.post('/event', require('./routes/event'));

app.use(function(err, req, res, next){
	console.error(err);
	res.send(err.message || err);
});