



-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Books'
-- List of all the books in a library
-- ---

DROP TABLE IF EXISTS `Books`;
    
CREATE TABLE `Books` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Title` VARCHAR(50) NULL DEFAULT NULL,
  `Author` VARCHAR(50) NULL DEFAULT NULL,
  `Genre` VARCHAR(50) NULL DEFAULT NULL,
  `Location` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) COMMENT 'List of all the books in a library';

-- ---
-- Table 'Locations'
-- List of places a book can be, like library patrons or the library
-- ---

DROP TABLE IF EXISTS `Locations`;
    
CREATE TABLE `Locations` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Name` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) COMMENT 'List of places a book can be, like library patrons or the li';

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Books` ADD FOREIGN KEY (Location) REFERENCES `Locations` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Books` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Locations` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Books` (`id`,`Title`,`Author`,`Genre`,`Location`) VALUES
-- ('','','','','');
-- INSERT INTO `Locations` (`id`,`Name`) VALUES
-- ('','');

