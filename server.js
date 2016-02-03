'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'), // "express-handlebars"
    bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var data = {};

app.get('/', function (req, res) {
    res.render('home', {"data":data});
});

app.post('/', function(req,res){
    console.log('posted');
    console.log(req.body);
    req.on('data', function(data){
        console.log(data);
    })
    //on post call
    //data = {"test":"test"};
});

app.listen(3000, function () {
    console.log('express-handlebars example server listening on: 3000');
});
