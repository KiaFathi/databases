DROP DATABASE IF EXISTS `chat`;

CREATE DATABASE chat;

USE chat;


DROP TABLE IF EXISTS `rooms`;

CREATE TABLE `rooms` (
  `id` integer not null auto_increment,
  `room_name` varchar(50),
  primary key (`id`)
);

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users`(
  `id` integer not null auto_increment,
  `user_name` varchar(50),
  primary key (`id`)
);

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` integer not null auto_increment,
  `message` varchar(50),
  `roomID` integer,
  `userID` integer, 
  primary key (`id`),
  foreign key (`userID`) references `users` (`id`),
  foreign key (`roomID`) references `rooms` (`id`)
); 
/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




-- /Users/kiafathi/Documents/Sprints/2014-06-databases/SQL/schema.sql