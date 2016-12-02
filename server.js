var express = require('express');

var exphbs = require('express3-handlebars');

var fs = require('fs');
var bodyParser   = require('body-parser');
var passport = require('passport');
var LdapStrategy = require('passport-ldapauth');

var OPTS = {
  server: {
    url: 'ldap://localhost:389',
    bindDn: 'cn=root',
    bindCredentials: 'secret',
    searchBase: 'ou=passport-ldapauth',
    searchFilter: '(uid={{username}})'
  },
    usernameField: 'username',
    passwordField: 'password'
};

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

passport.use(new LdapStrategy(OPTS));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());

app.post('/login', passport.authenticate('ldapauth', {session: false}), function(req, res) {
  console.log('test');

  //access admin
  res.send({status: 'ok'});
});

app.get('/', function(req, res){
	res.render('index');
});


app.use(express.static('public'));

var port = Number(process.env.PORT || 5000);
app.listen(port);
