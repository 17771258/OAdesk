<?php
	include('include/Session.class.php');
	if(Session::is_set('sessionID') ){
		if(isset($_GET['ac'])){
			if($_GET['ac'] == 'loginout'){
				Session::set('sessionID', null);
			}	
		}
	};
	if(!Session::is_set('sessionID')){
		header('Location: user.php');
		exit();
	};

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title></title>
	<link rel="stylesheet" href="style/reset.css" />
	<link rel="stylesheet" href="style/view/black/style.css?<?php echo time()?>" />
	<link rel="stylesheet" href="style/dialog/style.css?<?php echo time()?>" />
	<link rel="stylesheet" href="style/style.css?<?php echo time()?>" />
	<script type="text/javascript" src="javascript/jquery.js"></script>
	<script type="text/javascript" src="javascript/core.js"></script>
	<script type="text/javascript" src="javascript/base.js"></script>
	<script type="text/javascript" src="javascript/app.js"></script>
	<script type="text/javascript" src="javascript/mask.js"></script>
	<script type="text/javascript" src="javascript/user.js"></script>
	<script type="text/javascript" src="javascript/view.js"></script>
	<script type="text/javascript" src="javascript/ajax.js"></script>
	<script type="text/javascript" src="javascript/desk.js"></script>
	<script type="text/javascript" src="javascript/mouse.js"></script>
	<script type="text/javascript" src="javascript/resize.js"></script>
	<script type="text/javascript" src="javascript/dialog.js"></script>
	<script type="text/javascript" src="javascript/taskbar.js"></script>
	<script type="text/javascript" src="javascript/template.js"></script>
	<script type="text/javascript" src="javascript/wallpaper.js"></script>
	<script type="text/javascript" src="javascript/fullscreen.js"></script>
	<script type="text/javascript" src="javascript/lockscreen.js"></script>
</head>
<body id="index_body">
<div id="desk"></div>
<div id="wallpaper"></div>
</body>
</html>
