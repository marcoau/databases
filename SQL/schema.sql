CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  username varchar(50) NOT NULL,
  PRIMARY KEY (username)
);

CREATE TABLE rooms (
  roomname varchar(50) NOT NULL,
  PRIMARY KEY (roomname)
);

CREATE TABLE messages (
  messageId int AUTO_INCREMENT PRIMARY KEY,
  message varchar(140) NOT NULL,
  createdAt datetime NOT NULL,
  username varchar(50) NOT NULL,
  roomname varchar(50) NOT NULL,
  FOREIGN KEY (roomname)
    REFERENCES rooms(roomname),
  FOREIGN KEY (username)
    REFERENCES users(username)
 /* Describe your table here.*/
);

/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
