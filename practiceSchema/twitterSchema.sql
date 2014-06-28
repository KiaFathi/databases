



-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'User_Info'
-- 
-- ---

DROP TABLE IF EXISTS `User_Info`;
    
CREATE TABLE `User_Info` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user_name` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Messages_Info'
-- Table where my messages will be stored
-- ---

DROP TABLE IF EXISTS `Messages_Info`;
    
CREATE TABLE `Messages_Info` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `msg_text` VARCHAR(255) NULL DEFAULT NULL,
  `Time` TIME(50) NULL DEFAULT NULL,
  `user_id` INTEGER(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
KEY (`user_id`)
) COMMENT 'Table where my messages will be stored';

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Messages_Info` ADD FOREIGN KEY (user_id) REFERENCES `User_Info` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `User_Info` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Messages_Info` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `User_Info` (`id`,`user_name`) VALUES
-- ('','');
-- INSERT INTO `Messages_Info` (`id`,`msg_text`,`Time`,`user_id`) VALUES
-- ('','','','');

