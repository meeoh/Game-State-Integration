'use strict';

var express = require('express'),
    exphbs = require('express-handlebars'), // "express-handlebars"
    bodyParser = require('body-parser'),
    TelegramBot = require('node-telegram-bot-api');

var token = '154596731:AAGCbbtw5FxMw29MnX-HoYhoKaKKPtJU-0w';

var bot = new TelegramBot(token, { polling: false });
var chatId = -119445285;


var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);
console.log('express-handlebars example server listening on: 3000');


app.use(express.static(__dirname + '/public'));


var shameelIds = ["76561198192749214", "76561198009694224"];
var nomarIds = ["76561198052716620"];
var omasIds = ["76561197998478010"];



app.use(bodyParser.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.get('/', function(req, res) {
    res.render('home');
});

var gameHandler = function(payload, player) {

    //round.win_team

    if (payload.provider.name == 'Counter-Strike: Global Offensive') {
        if (payload.map) {
            if (payload.map.round >= 0) {
                //console.log('setting csgo data ' + player);
                var roundPercentage = Math.floor(payload.map.round / 30 * 100);
                var data = { 'percentage': roundPercentage, 'win': false };

                if (payload.round.win_team.toUpperCase() == payload.player.team.toUpperCase()) {
                    data.win = true;
                }
                io.emit('data:' + player, data);
            }
        } else {
            var data = { 'done': 1 };
            io.emit('data:' + player, data);
        }
    } else if (payload.provider.name == 'Dota 2') {
        //find out how to calculate dota percentage
        if(payload.map){
            if(payload.map.game_time){
                //console.log('setting dota data');
                var gamePercentage = Math.floor(payload.map.game_time / 2400 * 100);
                var data = { 'percentage': gamePercentage };
                io.emit('data:' + player, data);
            }
        }
        else {
            var data = { 'done': 1 };
            io.emit('data:' + player, data);
        }

    } else {
        var data = { 'done': 1 };
        io.emit('data:' + player, data);
    }

}

app.post('/request/:name', function(req, res) {
    var name = req.params.name;
    if (name.toLowerCase() == "shameel") {
        bot.sendMessage(chatId, "@meeoh, requesting to come upstairs, dont start another");
    } else if (name.toLowerCase() == "nomar") {
        bot.sendMessage(chatId, "@nomar, requesting to come upstairs, dont start another");
    } else if (name.toLowerCase() == "omas") {
        bot.sendMessage(chatId, "@Paytheo, requesting to come upstairs, dont start another");
    } else if (name.toLowerCase() == "all") {
        bot.sendMessage(chatId, "/all, requesting to come upstairs, dont start another");
    }
});

app.post('/', function(req, res) {
    // console.log('posted');
    // console.log(req.body);
    var payload = req.body;
    if (payload.provider.steamid || payload.player.steamid) {
        var id = payload.provider.steamid || payload.player.steamid;
        if (shameelIds.indexOf(id) > -1) {
            //shameel id
            gameHandler(payload, 'shameel');
        } else if (nomarIds.indexOf(id) > -1) {
            //nomar id
            gameHandler(payload, 'nomar');
        } else if (omasIds.indexOf(id) > -1) {
            //omas id
            gameHandler(payload, 'omas');
        }
    }
});

io.on('connection', function(socket) {
    //console.log('socket connected');
});
