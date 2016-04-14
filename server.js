var express = require('express');
var app = express();
var exphbs = require('express3-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res){

	res.render('index');
});

app.use(express.static('public'));

var port = Number(process.env.PORT || 5000);
app.listen(port);