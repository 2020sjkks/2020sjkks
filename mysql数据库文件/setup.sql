/*
 Navicat MySQL Data Transfer

 Source Server         : 数据库 课设
 Source Server Type    : MySQL
 Source Server Version : 50730
 Source Host           : brucemarkdown.top:3306
 Source Schema         : meituan

 Target Server Type    : MySQL
 Target Server Version : 50730
 File Encoding         : 65001

 Date: 23/08/2020 18:10:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for good
-- ----------------------------
DROP TABLE IF EXISTS `good`;
CREATE TABLE `good` (
  `gid` int(11) NOT NULL AUTO_INCREMENT,
  `gname` varchar(20) DEFAULT NULL,
  `gdetail` varchar(100) DEFAULT NULL,
  `gphoto` varchar(50) DEFAULT NULL,
  `gprice` decimal(10,2) DEFAULT NULL,
  `gonsale` int(255) NOT NULL,
  PRIMARY KEY (`gid`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `oid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `accepted` int(11) NOT NULL,
  `totalprice` decimal(10,2) DEFAULT NULL,
  `otime` datetime DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `courier` int(11) DEFAULT NULL,
  `courier_phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`oid`),
  KEY `uid` (`uid`),
  KEY `courier` (`courier`),
  CONSTRAINT `courier` FOREIGN KEY (`courier`) REFERENCES `user` (`uid`) ON UPDATE CASCADE,
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for order_detail
-- ----------------------------
DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE `order_detail` (
  `oid` int(11) NOT NULL,
  `gid` int(11) NOT NULL,
  `score` int(11) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `quantity` int(255) DEFAULT NULL,
  PRIMARY KEY (`oid`,`gid`) USING BTREE,
  KEY `gid` (`gid`),
  CONSTRAINT `gid` FOREIGN KEY (`gid`) REFERENCES `good` (`gid`) ON DELETE CASCADE,
  CONSTRAINT `oid` FOREIGN KEY (`oid`) REFERENCES `order` (`oid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(20) DEFAULT NULL,
  `uphoto` varchar(255) DEFAULT NULL,
  `uaddress` varchar(50) DEFAULT NULL,
  `upassword` varchar(50) DEFAULT NULL,
  `uphone` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;

-- ----------------------------
-- View structure for sales_by_day
-- ----------------------------
DROP VIEW IF EXISTS `sales_by_day`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `sales_by_day` AS select date_format(`order`.`otime`,'%Y%m%d') AS `days`,sum(`order`.`totalprice`) AS `sales` from `order` group by `days`;

-- ----------------------------
-- View structure for user_good
-- ----------------------------
DROP VIEW IF EXISTS `user_good`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `user_good` AS select `good`.`gid` AS `gid`,`good`.`gname` AS `gname`,round(avg(`order_detail`.`score`),1) AS `avg_score`,sum(`order_detail`.`quantity`) AS `sales_volume` from (`good` join `order_detail`) where ((`good`.`gid` = `order_detail`.`gid`) and (`good`.`gonsale` = 1)) group by `good`.`gid` order by `avg_score` desc;

-- ----------------------------
-- Triggers structure for table good
-- ----------------------------
DROP TRIGGER IF EXISTS `checkprice_insert`;
delimiter ;;
CREATE TRIGGER `checkprice_insert` BEFORE INSERT ON `good` FOR EACH ROW BEGIN
        IF NEW.gprice >=0 THEN
						SET @s = 'correct price!';
        ELSE 
						SET @s = 'negaive price!';
						SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = @s;
        END IF;
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table good
-- ----------------------------
DROP TRIGGER IF EXISTS `checkprice_update`;
delimiter ;;
CREATE TRIGGER `checkprice_update` BEFORE UPDATE ON `good` FOR EACH ROW BEGIN
        IF NEW.gprice >=0 THEN
						SET @s = 'correct price!';
        ELSE 
						SET @s = 'negaive price!';
						SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = @s;
        END IF;
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table user
-- ----------------------------
DROP TRIGGER IF EXISTS `checkphone`;
delimiter ;;
CREATE TRIGGER `checkphone` BEFORE UPDATE ON `user` FOR EACH ROW BEGIN
	IF ISNULL(NEW.uphone) and ISNULL(OLD.uphone) THEN
					SET  @s = 'null phone!';
	ELSE
		IF  NEW.uphone=OLD.uphone THEN
				SET  @s = 'right phone!';
		ELSE
        IF   NEW.uphone REGEXP '[1][35678][0-9]{9}'THEN
						SET  @s = 'right phone!';
        ELSE
						SET @s = 'wrong phone!';
						SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = @s;
        END IF;
		END IF;
		END IF;
   END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
