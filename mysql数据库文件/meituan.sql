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

 Date: 23/08/2020 18:10:39
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
-- Records of good
-- ----------------------------
BEGIN;
INSERT INTO `good` VALUES (1, '蒜蓉青菜', '热锅热油大火爆炒，全程不盖锅盖，翻炒到青菜变色后下盐和鸡精，关火，上碟，完成。', '1', 15.00, 1);
INSERT INTO `good` VALUES (2, '干炒牛河', '牛肉切片，用水抓匀，让它吃吃水，再加生抽、白糖拌匀，最后加花生油腌制最少半小时', '2', 20.00, 1);
INSERT INTO `good` VALUES (3, '热干面', '热干面因为方便快捷美味，被很多武汉人用来过早，在武汉街头巷尾随处可见售卖。', '3', 20.00, 1);
INSERT INTO `good` VALUES (4, '白切鸡', '鸡的菜式有200余款之多，而最为人常食不厌的却属白斩鸡，原汁原味，皮爽肉滑，大筵小席皆宜，逢年过节必备', '4', 30.00, 1);
INSERT INTO `good` VALUES (5, '可口可乐', '可口可樂推出可樂溝咖啡口味汽水，可樂加入純正巴西咖啡，分別有朱古力味及焦糖味咖啡汽水兩種口味新登場！而且標榜無糖、零卡路里', '5', 3.00, 1);
INSERT INTO `good` VALUES (21, '咖喱鸡', '要返工又想食到美味自製晚餐都唔係好難。 只要早一日解凍雞扒醃好， 第二日放工幾個字一家人就有美味咖喱飯食啦。 仲一次過做埋兩夫妻外帶午餐盒添， ', '21', 20.00, 1);
INSERT INTO `good` VALUES (25, '绿豆糖水', '绿豆糖水是一道传统的名点，属于粤菜系。中国民间常作为夏季清凉饮料， 甜品店亦常有出售。可用治高血压和小儿夏天痱子密集、颈淋巴腺炎、单纯性甲状腺。', '25', 3.00, 1);
INSERT INTO `good` VALUES (26, '珍珠奶茶', '珍珠奶茶（英语译名：Bubble tea, Pearl milk tea），简称珍奶，是1980年代起源于台湾的茶类饮料，为台湾泡沫红茶。', '26', 3.00, 1);
INSERT INTO `good` VALUES (33, '梅菜扣肉', '梅菜扣肉，汉族传统名菜，属客家菜。制作材料有五花肉、梅菜、葱白、姜片等。通常是将五花肉上汤锅煮透，再下汤用小火焖烂，五花肉盛入碗里，上铺梅菜段，倒入原汤蒸透。 ', '33', 19.80, 0);
INSERT INTO `good` VALUES (34, '梅菜扣肉', '商品详情11111111', '34', 0.00, 1);
COMMIT;

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
-- Records of order
-- ----------------------------
BEGIN;
INSERT INTO `order` VALUES (1, 1, 3, 35.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (3, 1, 3, NULL, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (4, 1, 3, 0.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (5, 2, 3, 50.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (48, 2, 3, 75.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (49, 1, 3, 15.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (50, 1, 3, 90.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (51, 2, 3, 60.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (52, 2, 3, 45.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (53, 2, 3, 45.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (54, 2, 3, 40.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (55, 2, 3, 85.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (56, 2, 3, 50.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (57, 2, 3, 50.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (58, 2, 3, 80.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (59, 2, 3, 60.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (60, 2, 3, 70.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (61, 2, 3, 40.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (62, 2, 3, 90.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (63, 2, 3, 20.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (64, 2, 3, 40.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (65, 2, 3, 75.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (66, 2, 3, 60.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (67, 1, 3, 55.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (68, 1, 3, 35.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (69, 2, 3, 80.00, '2020-06-27 15:04:09', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (70, 2, 3, 60.00, '2020-06-27 15:49:42', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (71, 2, 3, 60.00, '2020-06-27 15:50:42', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (72, 2, 3, 45.00, '2020-06-27 15:52:42', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (73, 2, 3, 60.00, '2020-06-27 15:54:33', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (74, 2, 3, 60.00, '2020-06-27 15:55:49', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (75, 1, 3, 88.50, '2020-06-27 16:01:13', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (76, 2, 3, 60.00, '2020-06-27 16:02:48', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (77, 2, 3, 95.00, '2020-06-27 16:03:56', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (78, 2, 3, 65.00, '2020-06-27 16:06:37', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (79, 2, 3, 60.00, '2020-06-27 16:07:46', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (80, 2, 3, 30.00, '2020-06-27 16:14:06', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (81, 2, 3, 88.50, '2020-06-27 16:33:20', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (82, 2, 3, 35.00, '2020-06-27 16:35:25', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (83, 2, 3, 60.00, '2020-06-27 22:40:43', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (84, 2, 3, 20.00, '2020-06-27 22:41:06', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (85, 2, 3, 100.00, '2020-06-28 21:22:53', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (86, 2, 3, 65.00, '2020-06-29 15:19:47', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (87, 2, 3, 60.00, '2020-06-29 15:21:10', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (88, 1, 3, 40.00, '2020-06-29 15:28:55', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (89, 2, 3, 120.00, '2020-06-29 15:39:45', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (90, 2, 3, 145.00, '2020-06-29 15:44:39', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (91, 2, 3, 140.00, '2020-06-29 15:50:20', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (92, 2, 3, 60.00, '2020-06-29 15:51:39', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (93, 2, 3, 80.00, '2020-06-29 16:03:09', '五山东八', '15521329043', 2, '15521329043');
INSERT INTO `order` VALUES (94, 2, 3, 90.00, '2020-06-29 16:12:50', '五山东八', '15521329043', 2, '15521329043');
INSERT INTO `order` VALUES (95, 2, 3, 120.00, '2020-06-29 16:15:05', '五山东八', '15521329043', 2, '15521329043');
INSERT INTO `order` VALUES (96, 2, 3, 60.00, '2020-06-29 16:16:14', '五山东八', '15521329043', 2, '15521329043');
INSERT INTO `order` VALUES (97, 2, 3, 80.00, '2020-06-29 16:29:12', '五山东八', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (98, 1, 3, 35.00, '2020-06-29 16:33:32', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (99, 1, 3, 15.00, '2020-06-29 16:34:00', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (100, 1, 3, 3.00, '2020-06-30 15:47:15', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (101, 2, 3, 90.00, '2020-06-30 15:48:08', '五山东八', '123123123123', 2, '15521329043');
INSERT INTO `order` VALUES (102, 2, 3, 60.00, '2020-06-30 17:01:31', '五山东八', '123123123123', 2, '15521329043');
INSERT INTO `order` VALUES (103, 2, 3, 60.00, '2020-06-30 17:02:32', '五山东八', '123123123123', 2, '15521329043');
INSERT INTO `order` VALUES (104, 2, 3, 80.00, '2020-06-30 17:06:13', '五山东八', '123123123123', 2, '15521329043');
INSERT INTO `order` VALUES (105, 1, 3, 15.00, '2020-06-30 17:30:36', '五山东十', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (106, 2, 3, 140.00, '2020-06-30 20:04:50', '五山东八', '123123123123', 2, '15521329043');
INSERT INTO `order` VALUES (107, 2, 3, 60.00, '2020-06-30 22:00:46', '五山东八', '123123123123', 2, '15521329043');
INSERT INTO `order` VALUES (108, 2, 3, 55.00, '2020-07-01 15:42:53', '五山东八', '123123123123', 2, '15521329043');
INSERT INTO `order` VALUES (109, 2, 3, 110.00, '2020-07-01 21:17:26', '五山东八', '123123123123', 2, '15521329043');
INSERT INTO `order` VALUES (110, 2, 3, 126.00, '2020-07-02 09:58:17', '五山东八', '123123123123', 2, '15521329043');
INSERT INTO `order` VALUES (111, 3, 3, 18.00, '2020-07-02 15:38:04', 'C7', '13060826082', 2, '15521329043');
INSERT INTO `order` VALUES (112, 2, 3, 70.00, '2020-07-02 16:49:31', '五山东八', '123123123123', 2, '15521329043');
INSERT INTO `order` VALUES (113, 2, 3, 126.00, '2020-07-04 15:06:28', '五山东八', '123123123123', 2, '15521329043');
INSERT INTO `order` VALUES (114, 2, 3, 40.00, '2020-07-07 02:22:13', '五山东八', '123123123123', 2, '15521329043');
INSERT INTO `order` VALUES (115, 3, 3, 35.00, '2020-07-12 10:33:46', 'C7', '13060826082', 2, '123123123123');
INSERT INTO `order` VALUES (116, 2, 3, 39.00, '2020-08-14 20:36:39', '五山东八', '123123123123', 2, '123123123123');
INSERT INTO `order` VALUES (117, 2, 3, 60.00, '2020-08-14 20:36:45', '五山东八', '123123123123', 2, '123123123123');
INSERT INTO `order` VALUES (118, 2, 3, 35.00, '2020-08-14 20:54:50', '五山东八', '123123123123', 2, '123123123123');
INSERT INTO `order` VALUES (119, 1, 3, 70.00, '2020-08-14 21:00:55', '五山东十', '15220842033', 2, '123123123123');
INSERT INTO `order` VALUES (120, 1, 3, 6.00, '2020-08-14 21:01:04', '五山东十', '15220842033', 2, '123123123123');
INSERT INTO `order` VALUES (121, 2, 3, 65.00, '2020-08-14 21:10:17', '五山东八', '123123123123', 2, '123123123123');
INSERT INTO `order` VALUES (122, 1, 3, 15.00, '2020-08-14 21:10:40', '五山东十', '15220842033', 2, '123123123123');
INSERT INTO `order` VALUES (123, 2, 3, 30.00, '2020-08-14 22:11:53', '五山东八', '123123123123', 2, '123123123123');
INSERT INTO `order` VALUES (124, 2, 2, 15.00, '2020-08-14 22:13:03', '五山东八', '123123123123', 2, '123123123123');
INSERT INTO `order` VALUES (125, 2, 2, 60.00, '2020-08-14 22:13:09', '五山东八', '123123123123', 2, '123123123123');
INSERT INTO `order` VALUES (126, 2, 2, 40.00, '2020-08-14 22:13:18', '五山东八', '123123123123', 2, '123123123123');
INSERT INTO `order` VALUES (127, 2, 2, 40.00, '2020-08-14 22:13:46', '五山东八', '123123123123', 2, '123123123123');
INSERT INTO `order` VALUES (128, 2, 3, 86.00, '2020-08-15 18:05:44', '五山东八', '123123123123', 2, '15521329043');
INSERT INTO `order` VALUES (129, 2, 3, 40.00, '2020-08-15 18:13:37', '五山东八', '15220842033', 1, '152');
INSERT INTO `order` VALUES (130, 2, 3, 9.00, '2020-08-16 20:18:17', '五山东八', '123123123123', 2, '123123123123');
INSERT INTO `order` VALUES (131, 2, 3, 6.00, '2020-08-16 20:27:02', '五山东八', '123123123123', 3, '13060826082');
INSERT INTO `order` VALUES (132, 2, 3, 160.00, '2020-08-16 21:33:13', '五山东八', '123123123123', 2, '123123123123');
INSERT INTO `order` VALUES (133, 2, 2, 3.00, '2020-08-16 21:44:48', '五山东八', '123123123123', 69, 'None');
INSERT INTO `order` VALUES (134, 1, 3, 15.00, '2020-08-20 21:35:34', '五山东十', '15220842033', 1, '152');
INSERT INTO `order` VALUES (135, 1, 0, 60.00, '2020-08-20 23:00:36', '五山东十', '15220842033', NULL, NULL);
INSERT INTO `order` VALUES (136, 1, 3, 53.00, '2020-08-20 23:05:36', '五山东十', '15220842033', 1, '152');
INSERT INTO `order` VALUES (137, 1, 2, 35.00, '2020-08-21 11:18:20', '华南理工大学(大学城校区)', '15220842033', 2, '15521329043');
INSERT INTO `order` VALUES (139, 2, 2, 12.00, '2020-08-21 17:02:48', 'C4 222', '15521329043', 69, 'None');
INSERT INTO `order` VALUES (141, 3, 3, 55.00, '2020-08-21 20:32:30', 'C7', '13060826082', 2, '15521329043');
INSERT INTO `order` VALUES (142, 3, 3, 26.00, '2020-08-21 20:32:52', 'C7', '13060826082', 69, 'None');
INSERT INTO `order` VALUES (143, 65, 0, 50.00, '2020-08-21 23:33:04', '广州市政府', '13435034433', NULL, NULL);
INSERT INTO `order` VALUES (144, 1, 1, 53.00, '2020-08-22 02:04:18', '广州市政府', '15220842033', NULL, NULL);
INSERT INTO `order` VALUES (145, 67, 3, 45.00, '2020-08-22 02:04:57', 'c10', '15220842033', 67, '15220842033');
INSERT INTO `order` VALUES (146, 69, 3, 114.00, '2020-08-22 10:31:48', '番禺广场', '13800138000', 69, '13800138000');
INSERT INTO `order` VALUES (147, 70, 3, 20.00, '2020-08-22 10:57:56', '', '13800138000', 70, '13800138000');
INSERT INTO `order` VALUES (148, 69, 1, 30.00, '2020-08-22 11:13:49', '科尔海悦酒店', '134353034433', NULL, NULL);
INSERT INTO `order` VALUES (149, 2, 0, 6.00, '2020-08-22 17:23:04', '华南理工大学(大学城校区)', '15521329043', NULL, NULL);
INSERT INTO `order` VALUES (150, 68, 3, 20.00, '2020-08-22 17:43:55', '广州市番禺区人民政府(番禺大道北西)', '15522222222', 68, '15522222222');
INSERT INTO `order` VALUES (151, 1, 3, 35.00, '2020-08-23 11:15:11', '中山纪念堂', '15220842033', 1, '15220842033');
INSERT INTO `order` VALUES (152, 1, 3, 55.00, '2020-08-23 13:06:24', '广州市政府', '15220842033', 1, '15220842033');
COMMIT;

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
-- Records of order_detail
-- ----------------------------
BEGIN;
INSERT INTO `order_detail` VALUES (1, 1, 5, '很好很喜欢', 1);
INSERT INTO `order_detail` VALUES (1, 2, 4, '孩子们都爱吃', 1);
INSERT INTO `order_detail` VALUES (5, 1, 5, '颜色真好看', 2);
INSERT INTO `order_detail` VALUES (5, 2, 3, '有点咸', 1);
INSERT INTO `order_detail` VALUES (48, 1, 4, NULL, 1);
INSERT INTO `order_detail` VALUES (48, 2, 5, NULL, 2);
INSERT INTO `order_detail` VALUES (48, 3, 2, NULL, 1);
INSERT INTO `order_detail` VALUES (49, 1, 1, NULL, 1);
INSERT INTO `order_detail` VALUES (50, 2, 3, NULL, 1);
INSERT INTO `order_detail` VALUES (50, 3, 5, NULL, 2);
INSERT INTO `order_detail` VALUES (50, 4, 3, NULL, 1);
INSERT INTO `order_detail` VALUES (51, 2, 4, NULL, 2);
INSERT INTO `order_detail` VALUES (51, 3, 3, NULL, 1);
INSERT INTO `order_detail` VALUES (52, 1, 2, NULL, 3);
INSERT INTO `order_detail` VALUES (53, 1, 2, NULL, 3);
INSERT INTO `order_detail` VALUES (54, 2, 3, NULL, 2);
INSERT INTO `order_detail` VALUES (55, 1, 2, NULL, 3);
INSERT INTO `order_detail` VALUES (55, 3, 3, NULL, 2);
INSERT INTO `order_detail` VALUES (56, 1, 5, NULL, 2);
INSERT INTO `order_detail` VALUES (56, 2, 2, NULL, 1);
INSERT INTO `order_detail` VALUES (57, 1, 3, NULL, 2);
INSERT INTO `order_detail` VALUES (57, 2, 4, NULL, 1);
INSERT INTO `order_detail` VALUES (58, 2, 5, NULL, 3);
INSERT INTO `order_detail` VALUES (58, 3, 3, NULL, 1);
INSERT INTO `order_detail` VALUES (59, 4, 1, NULL, 2);
INSERT INTO `order_detail` VALUES (60, 1, 2, NULL, 2);
INSERT INTO `order_detail` VALUES (60, 2, 5, NULL, 2);
INSERT INTO `order_detail` VALUES (61, 2, 3, NULL, 2);
INSERT INTO `order_detail` VALUES (62, 4, 2, '', 3);
INSERT INTO `order_detail` VALUES (63, 2, 1, NULL, 1);
INSERT INTO `order_detail` VALUES (64, 3, 5, NULL, 2);
INSERT INTO `order_detail` VALUES (65, 1, 2, NULL, 1);
INSERT INTO `order_detail` VALUES (65, 2, 4, NULL, 1);
INSERT INTO `order_detail` VALUES (65, 3, 3, NULL, 2);
INSERT INTO `order_detail` VALUES (66, 4, 2, '', 2);
INSERT INTO `order_detail` VALUES (67, 1, 4, NULL, 1);
INSERT INTO `order_detail` VALUES (67, 2, 2, NULL, 1);
INSERT INTO `order_detail` VALUES (67, 3, 1, NULL, 1);
INSERT INTO `order_detail` VALUES (68, 1, 5, NULL, 1);
INSERT INTO `order_detail` VALUES (68, 2, 4, NULL, 1);
INSERT INTO `order_detail` VALUES (69, 3, 2, NULL, 1);
INSERT INTO `order_detail` VALUES (69, 4, 3, '', 2);
INSERT INTO `order_detail` VALUES (70, 4, 1, NULL, 2);
INSERT INTO `order_detail` VALUES (71, 2, 2, NULL, 3);
INSERT INTO `order_detail` VALUES (72, 1, NULL, NULL, 3);
INSERT INTO `order_detail` VALUES (73, 2, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (73, 3, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (74, 2, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (74, 3, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (75, 1, NULL, NULL, 3);
INSERT INTO `order_detail` VALUES (75, 3, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (75, 5, 2, NULL, 1);
INSERT INTO `order_detail` VALUES (76, 2, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (76, 3, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (77, 1, NULL, NULL, 3);
INSERT INTO `order_detail` VALUES (77, 2, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (77, 4, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (78, 1, NULL, NULL, 3);
INSERT INTO `order_detail` VALUES (78, 2, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (79, 2, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (79, 3, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (80, 1, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (81, 1, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (81, 2, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (81, 3, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (81, 4, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (81, 5, 4, NULL, 1);
INSERT INTO `order_detail` VALUES (82, 1, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (82, 2, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (83, 2, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (83, 3, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (84, 2, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (85, 3, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (85, 4, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (86, 1, NULL, NULL, 3);
INSERT INTO `order_detail` VALUES (86, 2, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (87, 2, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (87, 3, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (88, 2, NULL, '非常好！', 1);
INSERT INTO `order_detail` VALUES (88, 3, NULL, '不好恰', 1);
INSERT INTO `order_detail` VALUES (89, 2, NULL, NULL, 3);
INSERT INTO `order_detail` VALUES (89, 3, NULL, NULL, 3);
INSERT INTO `order_detail` VALUES (90, 1, NULL, NULL, 3);
INSERT INTO `order_detail` VALUES (90, 2, NULL, NULL, 3);
INSERT INTO `order_detail` VALUES (90, 3, 2, NULL, 2);
INSERT INTO `order_detail` VALUES (91, 2, NULL, NULL, 5);
INSERT INTO `order_detail` VALUES (91, 3, 3, NULL, 2);
INSERT INTO `order_detail` VALUES (92, 2, NULL, NULL, 3);
INSERT INTO `order_detail` VALUES (93, 2, NULL, NULL, 3);
INSERT INTO `order_detail` VALUES (93, 3, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (94, 3, NULL, NULL, 3);
INSERT INTO `order_detail` VALUES (94, 4, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (95, 3, NULL, NULL, 3);
INSERT INTO `order_detail` VALUES (95, 4, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (96, 4, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (97, 2, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (97, 3, NULL, NULL, 3);
INSERT INTO `order_detail` VALUES (98, 1, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (98, 2, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (99, 1, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (100, 5, 5, '可以', 1);
INSERT INTO `order_detail` VALUES (101, 2, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (101, 3, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (101, 4, 1, NULL, 1);
INSERT INTO `order_detail` VALUES (102, 2, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (102, 3, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (103, 2, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (103, 3, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (104, 2, NULL, NULL, 3);
INSERT INTO `order_detail` VALUES (104, 3, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (105, 1, 4, 'good', 1);
INSERT INTO `order_detail` VALUES (106, 1, NULL, NULL, 4);
INSERT INTO `order_detail` VALUES (106, 2, NULL, NULL, 3);
INSERT INTO `order_detail` VALUES (106, 3, 1, NULL, 1);
INSERT INTO `order_detail` VALUES (107, 2, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (107, 3, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (108, 1, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (108, 2, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (108, 3, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (109, 1, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (109, 2, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (109, 3, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (110, 3, NULL, NULL, 3);
INSERT INTO `order_detail` VALUES (110, 4, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (110, 5, 2, NULL, 2);
INSERT INTO `order_detail` VALUES (111, 1, 5, '非常好吃，下次还来这家', 1);
INSERT INTO `order_detail` VALUES (111, 5, 1, NULL, 1);
INSERT INTO `order_detail` VALUES (112, 4, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (112, 21, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (113, 4, NULL, NULL, 4);
INSERT INTO `order_detail` VALUES (113, 5, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (114, 21, 2, '一般般', 2);
INSERT INTO `order_detail` VALUES (115, 1, 5, NULL, 1);
INSERT INTO `order_detail` VALUES (115, 2, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (116, 4, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (116, 5, NULL, NULL, 3);
INSERT INTO `order_detail` VALUES (117, 4, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (118, 1, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (118, 2, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (119, 2, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (119, 3, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (119, 4, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (120, 5, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (121, 1, NULL, NULL, 3);
INSERT INTO `order_detail` VALUES (121, 2, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (122, 1, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (123, 1, 1, NULL, 2);
INSERT INTO `order_detail` VALUES (124, 1, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (125, 4, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (126, 21, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (127, 2, 5, '123', 2);
INSERT INTO `order_detail` VALUES (128, 4, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (128, 5, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (128, 21, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (129, 21, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (130, 26, 4, '漂亮！', 3);
INSERT INTO `order_detail` VALUES (131, 26, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (132, 2, 5, NULL, 4);
INSERT INTO `order_detail` VALUES (132, 3, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (132, 4, 5, '冲冲冲！！！', 2);
INSERT INTO `order_detail` VALUES (133, 26, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (134, 1, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (135, 21, NULL, NULL, 3);
INSERT INTO `order_detail` VALUES (136, 4, 5, '123455', 1);
INSERT INTO `order_detail` VALUES (136, 5, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (136, 21, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (137, 1, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (137, 2, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (139, 26, NULL, NULL, 4);
INSERT INTO `order_detail` VALUES (141, 1, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (141, 21, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (142, 21, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (142, 25, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (142, 26, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (143, 3, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (143, 4, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (144, 1, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (144, 2, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (144, 26, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (145, 1, 5, 'haochi!!!!', 3);
INSERT INTO `order_detail` VALUES (146, 1, 1, ' ', 1);
INSERT INTO `order_detail` VALUES (146, 2, 1, '事实上', 1);
INSERT INTO `order_detail` VALUES (146, 3, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (146, 4, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (146, 5, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (146, 21, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (146, 25, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (146, 26, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (147, 3, 5, 'null', 1);
INSERT INTO `order_detail` VALUES (148, 4, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (149, 25, NULL, NULL, 2);
INSERT INTO `order_detail` VALUES (150, 3, 4, '我可以！！', 1);
INSERT INTO `order_detail` VALUES (151, 1, 5, '非常好', 1);
INSERT INTO `order_detail` VALUES (151, 2, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (152, 1, 5, '非常好', 1);
INSERT INTO `order_detail` VALUES (152, 2, NULL, NULL, 1);
INSERT INTO `order_detail` VALUES (152, 3, NULL, NULL, 1);
COMMIT;

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
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, '陈楷', 'u1', '广州市政府', '123', '15220842033');
INSERT INTO `user` VALUES (2, '卢鸿威', 'u2', '华南理工大学(大学城校区)', '123', '15521329043');
INSERT INTO `user` VALUES (3, '毛嘉威', 'u3', 'C7', '8979', '13060826082');
INSERT INTO `user` VALUES (57, '二三', 'u57', NULL, '234', '13435034433');
INSERT INTO `user` VALUES (58, 'xmen', 'u58', NULL, '123', '15521390433');
INSERT INTO `user` VALUES (59, 'LI', NULL, NULL, '123', '1552139043');
INSERT INTO `user` VALUES (60, 'MAO', 'u60', '越秀区广州市政府(府前路北)', '123123', '13788888888');
INSERT INTO `user` VALUES (61, 'endgame', 'u61', NULL, '123', '15521329043');
INSERT INTO `user` VALUES (62, 'endgame2', 'u62', '广州市政府', '123', '13788888888');
INSERT INTO `user` VALUES (65, 'test1', 'u65', '广州市政府', '123', '13435034433');
INSERT INTO `user` VALUES (66, 'chunchun', 'u66', NULL, '123', NULL);
INSERT INTO `user` VALUES (67, 'lijian', 'u67', 'c10', '123', '15220842033');
INSERT INTO `user` VALUES (68, 'new', NULL, '广州市番禺区人民政府(番禺大道北西)', '123', '15522222222');
INSERT INTO `user` VALUES (69, 'chun', 'u69', '科尔海悦酒店', '000', '134353034433');
INSERT INTO `user` VALUES (70, 'guanliyuan', NULL, '', '123', '13800138000');
INSERT INTO `user` VALUES (71, 'baca', NULL, NULL, '123', NULL);
COMMIT;

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
