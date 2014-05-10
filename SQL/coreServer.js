var http = require('http');
var url = require('url');
var fs = require('fs');
var events = require('events');
var _ = require('underscore');
var chatRequestHandler = require('./chatRequestHandler').handler;
var assetHandler = require('./assetHandler').handler;

var utils = require('./utilities').utils;

var port = 3000;
var ip = '127.0.0.1';

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
  'Content-Type': 'application/json'
}

var routes = {
  '/chats': chatRequestHandler,
};

var server = http.createServer(function(req, res){
  console.log('type of request: ' + req.method);
  res.writeHead(200, utils.headers);
  var path = url.parse(req.url).pathname;
  var route = routes[path];
  if(route){
    route(req, res);
  }else{
    console.log('here');
    assetHandler(req, res);
  }
});

server.listen(port);

server.on('connection', function (stream) {
  console.log('iChat connected!');
});
