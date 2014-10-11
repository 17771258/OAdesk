/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.1.28-rc-community : Database - view
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`view` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

USE `view`;

/*Table structure for table `app` */

DROP TABLE IF EXISTS `app`;

CREATE TABLE `app` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `uid` bigint(20) NOT NULL DEFAULT '0',
  `type` varchar(20) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `width` int(5) NOT NULL DEFAULT '0',
  `height` int(5) NOT NULL DEFAULT '0',
  `icon` varchar(100) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `desc` text CHARACTER SET utf8,
  `content` text CHARACTER SET utf8,
  `addtime` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `app` */

insert  into `app`(`id`,`name`,`uid`,`type`,`width`,`height`,`icon`,`desc`,`content`,`addtime`) values (1,'我的文档',0,'folder',0,0,'image/icon/folder.png','我的文档描述文字',NULL,0),(2,'系统工具',0,'folder',0,0,'image/icon/tool.png','系统工具文件夹',NULL,0),(3,'用户中心',0,'folder',0,0,'image/icon/contact.png','用户设置中心',NULL,0),(4,'生活应用',0,'folder',0,0,'image/icon/life.png','生活应用文件夹',NULL,0),(5,'音乐中心',0,'folder',0,0,'image/icon/music.png','音乐中心介绍文字',NULL,0),(6,'影视中心',0,'folder',0,0,'image/icon/video.png','影视中心介绍文字',NULL,0),(7,'游戏中心',0,'folder',0,0,'image/icon/game.png','游戏中心介绍文字',NULL,0),(8,'我的文件',0,'folder',0,0,'image/icon/full.png','我的文件介绍文字',NULL,0),(9,'工作日记',0,'folder',0,0,'image/icon/doc.png','工作日志介绍文字',NULL,0),(10,'soso地图',0,'app',1000,600,'image/icon/soso.png','腾讯SOSO地图','http://map.soso.com/?ADTAG=n.web.app.btn',0),(11,'美图秀秀',0,'app',892,603,'image/icon/meitu.png','美图秀秀网页版','http://xiuxiu.web.meitu.com/qq/web/',0),(12,'五笔打字',0,'app',760,480,'image/icon/wubi.png','五笔打字练习','http://app22531.qzoneapp.com/wubidazi.htm?app_id=400005995&app_lang=2052&app_nonce=293808107&app_openid=1C43719370C00337CE1EEF5112D5E5BF&app_openkey=B97D66C7048E0C70232ABD1E1C305D7E&app_ts=1355156556&sig=44d7df6183b2af6dad9bbe9774617aa3b4045fc4',0),(13,'捕鱼达人',0,'app',760,480,'image/icon/buyu.png','捕鱼达人网页版','http://qqfishflash.lkgame.com/fish/fishloader.swf?app_id=400012476&app_lang=2052&app_nonce=2026183706&app_openid=F3487819BBFA68D02F1D644836B65933&app_openkey=65B26517EA3049A6161B087D7E9137C8&app_ts=1355157034&sig=604e684226bc66c10599224c341fe4f853e23cf8',0),(14,'超级玛丽',0,'app',760,580,'image/icon/mali.png','超级玛丽网页版','http://app.61gequ.com/game/24.htm',0),(15,'酷狗音乐',0,'app',745,575,'image/icon/kugou.png','酷狗音乐盒','http://web.kugou.com/testwebqq.html?app_id=400008496&app_lang=2052&app_nonce=1961659198&app_openid=EAC6D7BB872E7FF612400798D1337394&app_openkey=4BF461B939FA8231BBCD8D529DC97B7B&app_ts=1357138244&sig=a4de9db0898bb0c0b2bcd2288ef1992cd09b2709',0);

/*Table structure for table `appsort` */

DROP TABLE IF EXISTS `appsort`;

CREATE TABLE `appsort` (
  `uid` bigint(20) NOT NULL DEFAULT '0',
  `aid` bigint(20) NOT NULL DEFAULT '0',
  `sort` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `appsort` */

insert  into `appsort`(`uid`,`aid`,`sort`) values (1,0,'1,8,2,3,7,5,6,4,9,10,11,13,12,15,14'),(2,0,'1,2,3,4,5,6,7,8,9'),(3,0,'2,3,4,5,6'),(4,0,'1,2,3,4,5'),(5,0,'5,3,6,7,2'),(6,0,'1,3,8,2,6'),(7,0,'2,9,4,5,8'),(8,0,'1,6,9,7,5'),(9,0,'5,6,3,7,9'),(47,0,'1,2,3,4,5,6,7,8,9,10,11,12,13,14,15');

/*Table structure for table `setting` */

DROP TABLE IF EXISTS `setting`;

CREATE TABLE `setting` (
  `uid` bigint(20) NOT NULL DEFAULT '0',
  `wptype` tinyint(1) NOT NULL DEFAULT '1',
  `wpmode` tinyint(1) NOT NULL DEFAULT '1',
  `wplink` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'image/wallpaper/wallpaper01.jpg',
  `appsize` tinyint(1) NOT NULL DEFAULT '1',
  `dtsort` tinyint(1) NOT NULL DEFAULT '1',
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `setting` */

insert  into `setting`(`uid`,`wptype`,`wpmode`,`wplink`,`appsize`,`dtsort`,`password`) values (1,1,1,'image/wallpaper/wallpaper01.jpg',1,1,'1234'),(4,1,2,'image/wallpaper/wallpaper03.jpg',1,1,''),(5,2,3,'image/wallpaper/wallpaper04.jpg',1,1,''),(6,3,1,'http://www.biidee.com',1,1,''),(7,1,2,'image/wallpaper/wallpaper05.jpg',1,1,''),(8,2,3,'image/wallpaper/wallpaper06.jpg',1,1,''),(9,3,1,'http://www.qq.com',1,1,''),(2,2,1,'image/wallpaper/wallpaper02.jpg',1,1,''),(3,3,2,'http://www.baidu.com',1,1,'1234'),(47,1,1,'image/wallpaper/wallpaper01.jpg',1,1,'1234');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `pass` varchar(64) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `rname` varchar(60) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `email` varchar(100) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `addtime` int(11) NOT NULL DEFAULT '0',
  `logintime` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `user` */

insert  into `user`(`id`,`name`,`pass`,`rname`,`email`,`addtime`,`logintime`,`status`) values (1,'admin','admin','管理员','admin@admin.com',0,1361723631,255),(2,'user1','user1','频道管理','user1@user.com',0,0,254),(3,'user2','user2','栏目管理','user2@user.com',0,0,253),(4,'user3','user3','文章作者','user3@user.com',0,0,252),(5,'user4','user4','投稿者','user4@user.com',0,0,251),(6,'user5','user5','订阅者','user5@user.com',0,0,250),(7,'user6','user6','用户','user6@user.com',0,0,249),(8,'user7','user7','访客','user7@user.com',0,0,248),(9,'user8','user8','黑名单','user8@user.com',0,0,247),(47,'乌云龙','wuyunlong','乌云龙','17771258@qq.com',1357395092,1357395967,0);

/*Table structure for table `userinfo` */

DROP TABLE IF EXISTS `userinfo`;

CREATE TABLE `userinfo` (
  `uid` bigint(20) NOT NULL DEFAULT '0',
  `sing` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '填写个人签名',
  `tel` varchar(40) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `qq` varchar(40) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `email` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `head` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT 'image/head/default.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `userinfo` */

insert  into `userinfo`(`uid`,`sing`,`tel`,`qq`,`email`,`head`) values (1,'这里是我的个性签名，希望大家能喜欢我。','15811116722','17771258','17771258@qq.com','image/head/default.jpg'),(47,'填写个人签名','','','','image/head/default.jpg');

/*Table structure for table `userssssssssssss` */

DROP TABLE IF EXISTS `userssssssssssss`;

CREATE TABLE `userssssssssssss` (
  `id` tinyint(1) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `userssssssssssss` */

insert  into `userssssssssssss`(`id`) values (255);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
