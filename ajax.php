<?php
/* 包含全局配置文件 */
include('include/init.php');
/* 禁止直接访问 
if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest'){
	header("Location: index.php"); exit();
}*/
/*
 * statusCode 值说明
 *	200 执行正确
 *	300 程序出错
 *	301 SESSION过期
 */
//用户登录返回的sessionID 就是用户表的ID
$sessionID = Session::get('sessionID');

$statusCode = "200";

if( $sessionID === NULL ){
	$statusCode = "301";
}

$arr = array();
$ac = isset($_REQUEST['ac']) ? $_REQUEST['ac'] : NULL;
switch ($ac) {
	//得到用户配置
	case 'getUserSetting'	:
		$sql =  "SELECT 
				a.wptype,
				a.wpmode,
				a.dtsort,
				a.appsize,
				a.wplink,
				b.sort 
				FROM setting AS a, appsort AS b 
				WHERE a.uid = b.uid AND b.uid = '".$sessionID."' AND b.aid = '0' ";
		$arr = $db->fetch_once_array($sql);
		break;
	
	//得到开始菜单信息
	case 'getStartMenu'		:
		$sql = "SELECT
				a.rname,
				a.status,
				b.sing,
				b.head FROM user AS a, userinfo as b
			   	WHERE b.uid=a.id AND b.uid='".$sessionID."'";
		$arr = $db->fetch_once_array($sql);
		break;
	
	//设置图标排序方式
	case 'setUserDtsort'	:
		if(isset($_REQUEST['dtsort'])){
			$sql = "UPDATE setting SET dtsort='".$_REQUEST['dtsort']."' WHERE uid=".$sessionID;
			if($db->iudquery($sql) > 0){
				$arr['dtsort'] = $_REQUEST['dtsort'];
			}else{
				$statusCode = '300';
			};
		}else{
			$statusCode = '300';
		};
		break;
	
	//设置用户APP尺寸
	case 'setUserAppSize'	:
		if(isset($_REQUEST['appsize'])){
			$sql = "UPDATE setting SET appsize='".$_REQUEST['appsize']."' WHERE uid=".$sessionID;
			if($db->iudquery($sql) > 0){
				$arr['appsize'] = $_REQUEST['appsize'];
			}else{
				$statusCode = '300';
			};
		}else{
			$statusCode = '300';
		};
		break;

	//得到应用数组
	case 'getAppJson'		:
		$sort = $_REQUEST['sort'];
		$sort = $sort{strlen($sort)-1} == ',' ? substr($sort,0,-1) : $sort;
		$sql = "SELECT * FROM app WHERE id in (".$sort.") ORDER BY INSTR('".$sort."',id)";
		$arr['sc'] = $db->fetch_array($sql);
		break;
	
	//更新图标序数组
	case 'setAppSort'		:
		$sort = isset($_REQUEST['sort']) ? $_REQUEST['sort'] : NULL;
		$aid  = isset($_REQUEST['aid']) ? $_REQUEST['aid'] : NULL;
		$sort = $sort{strlen($sort)-1} == ',' ? substr($sort,0,-1) : $sort;
		$sql = "UPDATE appsort SET sort='".$sort."' WHERE uid='".$sessionID."' AND aid='".$aid."' ";
		$num = $db->iudquery($sql);
		$arr['sort'] = $sort;
		break;
	
	//获取app内容
	case 'getAppContent'	:
		$appid = $_REQUEST['appid'];
		$sql = "SELECT * FROM app WHERE id='".$appid."'";
		$arr = $db->fetch_once_array($sql);
		break;
	
	//设置锁屏密码
	case 'setLockscreenPassword' :
		$pwd = $_REQUEST['pwd'];
		$sql = "UPDATE setting SET password='".$pwd."' WHERE uid='".$sessionID."'";
		$num = $db->iudquery($sql);
		break;

	//获取锁屏密码
	case 'getLockscreenPassword' :
		$sql = "SELECT password FROM setting WHERE uid='".$sessionID."'";
		$arr = $db->fetch_once_array($sql);
		break;
	

	//用户登陆
	case 'login':
		$username = $_REQUEST['username'];
		$password = $_REQUEST['password'];
		$sql = "SELECT id,pass FROM user WHERE name='".$username."' LIMIT 0,1";
		$array = $db->fetch_once_array($sql);
		if ( $array['pass'] == $password ){
			$t = time();
			$sql2 = "UPDATE user SET logintime=". $t ." WHERE id=".$array['id'];
			$num = $db->iudquery($sql2);
			if($num != 0){
				Session::set('sessionID', $array['id']);
			}			
			$arr['code'] = 0;
		}else{
			$arr['code'] = 1;
		}
		break;
	case 'register' :
		$username = $_REQUEST['username'];
		$relname = $_REQUEST['relname'];
		$password = $_REQUEST['password'];
		$email = $_REQUEST['email'];
		$t = time();
		$sql = "SELECT id FROM user WHERE name='".$username."' LIMIT 0,1";
		$array = $db->fetch_once_array($sql);
		if($array['id']){
			//用户名已存在
			$arr['code'] = 2;
		}else{
			$sql2 = "INSERT INTO user 
					(name,pass,rname,email,addtime)
			   		VALUES
					('".$username."','".$password."','".$relname."','".$email."','".$t."') ";
			$db->query($sql2);
			$num = $db->get_insert_id();
			$sql3 = "INSERT INTO setting (uid) VALUES ('".$num."')";
			$sql4 = "INSERT INTO appsort (uid,sort) VALUES ('".$num."','1,2,3,4,5,6,7,8,9,10,11,12,13,14,15')";
			$sql5 = "INSERT INTO userinfo (uid) VALUES ('".$num."')";
			$db->query($sql3);
			$db->query($sql4);
			$db->query($sql5);
			//注册成功
			$arr['code'] = 6;
		}
		break;
		
	default :
		//AJAX执行失败返回参数
		$statusCode = '300';
}
$arr['statusCode'] = $statusCode;
echo json_encode($arr);
?>
