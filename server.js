'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'), // "express-handlebars"
    bodyParser = require('body-parser'),
    TelegramBot = require('node-telegram-bot-api');

    var token = '154596731:AAGCbbtw5FxMw29MnX-HoYhoKaKKPtJU-0w';

    var bot = new TelegramBot(token, {polling:false});
    var chatId = -119445285;


var app = express();

app.use(express.static(__dirname + '/public'));


var shameelIds = ["76561198192749214", "76561198009694224"];
var nomarIds = ["76561198052716620"];
var omasIds = ["76561197998478010"];

app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var data = {
    shameel: {},
    nomar: {},
    omas: {}
};

app.get('/', function (req, res) {
    res.render('home', {"data":data});
});

app.post('/request/:name', function(req,res){
    var name = req.params.name;
    if(name.toLowerCase() == "shameel"){
        bot.sendMessage(chatId, "@meeoh, requesting to come upstairs, dont start another");
    }
});

app.post('/', function(req,res){
    console.log('posted');
    //console.log(req.body);
    var payload = req.body;
    var id = payload.provider.steamid;
    if(shameelIds.indexOf(id) > -1){
        //shameel id
        //add game type, think its payload.map.mode
 //       console.log(payload);
        if(payload.map){
            if(payload.map.round){                
                console.log('setting data');
                data.shameel.percentComplete = Math.floor(payload.map.round/30*100);

            }
        }
    }
    else if (nomarIds.indexOf(id) > -1){
        //nomar id
    }
    else if (omasIds.indexOf(id) > -1){
        //omas id
    }
    
    //on post call
    //data = {"test":"test"};
});

app.listen(3000, function () {
    console.log('express-handlebars example server listening on: 3000');
});
