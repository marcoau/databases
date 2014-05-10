var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var events = require('events');
var _ = require('underscore');
var utils = require('./utilities').utils;

var assetHandler = function(req, res){

  if(req.url === '/'){
    var url = '/index.html';
  }else{
    var url = req.url;
  }

  var homepath = path.normalize(__dirname + '/../client');
  var fullpath = homepath + url;
  console.log(fullpath);
  var ext = path.extname(url);
  var type = utils.extTypes[ext];
  fs.exists(fullpath, function(exists){
    if(exists){
      fs.readFile(fullpath, function(err, data){
        if(err){
          utils.notFound();// should be 500
        }else{
          res.writeHead('200', _.extend(utils.headers, {'Content-Type': type}));
          res.end(data);
        }
      });
    }else{
      utils.notFound();
    }
  });

};

exports.handler = assetHandler;
