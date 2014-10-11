<?php
/*
 *	站点配置文件
 */
include('Session.class.php');
header("Content-type: text/html; charset=utf-8");
define("ROOT_PATH", str_replace('include/init.php', '', str_replace('\\', '/', __FILE__)));
require(ROOT_PATH. 'include/config.php');
require(ROOT_PATH. 'include/DB.class.php');

$db = new Db(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_CHARSET);
?>
