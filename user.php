<?php
	/* 包含全局配置文件 */
	include('include/init.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<link rel="stylesheet" href="style/reset.css" />
	<link rel="stylesheet" href="style/user.css" />
	<script type="text/javascript" src="javascript/jquery.js"></script>
	<title>用户中心</title>
</head>
<body>
<!--禁用js-->
<noscript>
	<div id="noscript"><img class="show" src="style/images/noscript.gif" width="500" height="150" alt="需要开启Javascript才能正常访问本站" /></div>
</noscript>
<!--禁用IE6-->
<!--[if lte IE 6]>
<div id="isie6"><img class="show" src="style/images/isie6.gif" width="500" height="150" alt="您的浏览器是IE6，请尽快升级。" /></div>
<![endif]-->
<!--进度-->
<div id="loading"></div>
<!--登录主体-->
<div id="userdesk">	
	<div id="input" class="login">
		<p id="topbar"><span rel="login" class="click">登录</span><span rel="register">注册</span><span rel="getpassword">忘记密码</span></p>
		<div class="has_input username">
			<input name="username" tabIndex="1" type="text" id="username">
			<span class="input_tips">用户名</span>
		</div>
		<div class="has_input relname">
			<input name="relname"tabIndex="2" type="text" id="relname">
			<span class="input_tips">姓名</span>
		</div>
		<div class="has_input email">
			<input name="email" tabIndex="3" type="email" id="email">
			<span class="input_tips">邮箱</span>
			<span id="getpassword" class="input_btn"></span>
		</div>
		<div class="has_input password">
			<input name="password" tabIndex="4" type="password" id="password">
			<span class="input_tips">密码</span>
			<span id="login" class="input_btn"></span>
		</div>
		<div class="has_input repassword">
			<input name="repassword" tabIndex="5" type="password" id="repassword">
			<span class="input_tips">重复密码</span>
			<span id="register" class="input_btn"></span>
			<span id="newpassword" class="input_btn"></span>
		</div>
		<div id="user_msg"><span id="text"></span></div>
	</div>
</div>
<script type="text/javascript" src="javascript/userlogin.js"></script>
<script type="text/javascript">
$(function(){
		$('#loading').fadeOut(1000);
		$(document).keydown(function(e){
			if(e.keyCode == 13){
				$('.input_btn:visible').each(function(){ $(this).click() });
			}
		})
	})
</script>
</body>
</html>
