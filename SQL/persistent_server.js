var mysql = require('mysql');
var utils = require('./utilities').utils;

/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  host: 'localhost',
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();

exports.getFromDB = function (req, res, filters, callback) {
  console.log('inside getFromDB');
  // var query = 'SELECT * FROM messages where roomname="lobby"';
  console.log('filters.roomname: ', filters.roomname);
  var query =
    'SELECT * ' +
    'FROM messages ' +
    'WHERE roomname="' + filters.roomname + '" ' +
    'ORDER BY createdAt DESC';
  dbConnection.query(query,
    function (err, rows) {
      if (err) {
        utils.internalServerError(res);
      }
      callback(rows);
    }
  );
};

exports.insertToDB = function(req, res, chat) {
  var userQuery =
    'INSERT INTO users (username) values (' + mysql.escape(chat.username) + ')';

  var roomQuery =
    'INSERT INTO rooms (roomname) values (' + mysql.escape(chat.roomname) + ')';  ;

  var messageQuery =
    'INSERT INTO messages (text, username, roomname, createdAt) values (' +
      mysql.escape(chat.text) + ', ' + mysql.escape(chat.username) + ', ' +
      mysql.escape(chat.roomname) + ', NOW())';

  dbConnection.query(userQuery, function(err, rows){
    if(err){
      console.log(err);
    }else{
      console.log('userQuery success');
    }
  });

  dbConnection.query(roomQuery, function(err, rows){
    if(err){
      console.log(err);
    }else{
      console.log('roomQuery success');
    }
  });

  dbConnection.query(messageQuery, function(err, rows){
    if(err){
      console.log(err);
    }else{
      console.log('messageQuery success');
    }
  });


};
// dbConnection.query('INSERT INTO messages (message, username, roomname, createdAt)' +
//     'values ("hello world", "keith", "lobby", NOW())', function(err, rows, fields){
//   if(err){
//     console.log(err);
//   }else{
//     console.dir(rows);
//     console.dir(fields);
//   }
// });
//
// dbConnection.query('SELECT message, username FROM messages where roomname="lobby"', function(err, rows, fields){
//   if(err){

//   }else{
//     console.dir(rows);
//     console.log(typeof rows[0]);
//     // console.dir(fields);
//   }
// });

// create a user
//  insert a message for user in room: 'lobby' (will need to create this room)
//  insert a message for user in room: '4chan' (will need to create this room)

// dbConnection.query('INSERT INTO users (username) values ("marco"), ("jeff")', function(err, rows, fields){
//   if(err){
//     console.log(err);
//   }else{
//     console.dir(rows);
//     console.dir(fields);
//   }
// });

// dbConnection.query('INSERT INTO rooms (roomname) values ("lobby"), ("4chan")', function(err, rows, fields){
//   if(err){
//     console.log(err);
//   }else{
//     console.dir(rows);
//     console.dir(fields);
//   }
// });

//

// dbConnection.end();

// query a row

/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */

