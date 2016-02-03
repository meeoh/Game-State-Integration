'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'); // "express-handlebars"

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var data = {};

app.get('/', function (req, res) {
    res.render('home', {"data":data});
});

app.post('/', function(req,res){
    console.log('posted');
    //on post call
    //data = {"test":"test"};
});

app.listen(3000, function () {
    console.log('express-handlebars example server listening on: 3000');
});
