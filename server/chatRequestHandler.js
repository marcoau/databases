var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
var events = require('events');
var _ = require('underscore');
var utils = require('./utilities').utils;

var chatRequestHandler = function(req, res){


  
  var getAction = function(req, res){
    var filters = querystring.parse(url.parse(req.url).query);
    fs.readFile('./storage/chatsStorage.txt', function(err, data){
      if(err){
        console.log(err);
      }else{
        var chats = JSON.parse(data.toString());
        console.log(chats);
        var filteredChats = _.filter(chats, function(chat){
          //max number of chats: 50
          return chat.roomname === filters.roomname && chat.chatID > chats.length - 50;
        });
        res.end(JSON.stringify(filteredChats.reverse()));
      }
    });
  };

  var postAction = function(req, res){
    completeData(req, res, function(chat){
      fs.readFile('./storage/chatsStorage.txt', function(err, data){
        if(err){
          console.log(err);
        }else{
          // console.log(data);
          var chats = JSON.parse(data.toString());
          console.log(typeof chat);
          console.log('chat: ' + chat);
          var newChat = JSON.parse(chat);
          newChat['timeSent'] = new Date();
          newChat['chatID'] = chats.length + 1;
          console.log('newChat: ' + newChat);
          chats.push(newChat);
          saveChats(chats);
          // res.end(JSON.stringify(filteredChats));
        }
      });
    });
  };

  var options = function(req, res){
    res.end('OK!');
  };

  var completeData = function(req, res, callback){
    var data = '';
    req.on('data', function(chunk){
      data += chunk;
    });
    req.on('end', function(){
      callback(data);
    });
  };

  var saveChats = function(chats){
    fs.writeFile('storage/chatsStorage.txt', JSON.stringify(chats), function(err){
      if(err){
        utils.send404();
      }else{
        console.log('save chats success');
        res.writeHead(201, utils.headers);
        res.end('save chats success');        
      }
    });
  };

  var actions = {
    'GET': getAction,
    'POST': postAction,
    'OPTIONS': options
  };
  var action = actions[req.method];

  if(action){
    res.writeHead(200, utils.headers);
    action(req, res);
  }else{
    utils.notFound(res);
  }
};

exports.handler = chatRequestHandler;
