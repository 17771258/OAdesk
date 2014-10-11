<?php
	$account = '17771258@qq.com';
	$appkey = '3984975717';
	$app_secret = 'ebb80376461704041af1b5e243221a8f';
	$password='bd@yeah.net_';
	$time = time();
	$signature = hash_hmac('sha256', "account={$account}&appkey={$appkey}&password={$password}&time={$time}", $app_secret, false);
?>
<?php
function request_by_curl($remote_server, $post_string)
{
    $ch = curl_init();//初始化curl  
	curl_setopt($ch,CURLOPT_URL, $remote_server);//提交到指定网页  
	curl_setopt($ch, CURLOPT_HEADER, 0);//设置header  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//要求结果为字符串且输出到屏幕上  
	curl_setopt($ch, CURLOPT_POST, 1);//post提交方式  
	curl_setopt($ch, CURLOPT_POSTFIELDS, $post_string);  
	$data = curl_exec($ch);//运行curl  
	curl_close($ch);
    return $data;
}

$url =  "http://api.weipan.cn/?m=auth&a=get_token";
$param = "account={$account}&password={$password}&appkey={$appkey}&time={$time}&signature={$signature}&app_type=sinat";
$tokenarr = json_decode(request_by_curl($url, $param ));
//17771258@qq.com用户token
$token = $tokenarr->data->token;
$dolog = json_decode(request_by_curl('http://api.weipan.cn/?a=keep',"token={$token}"));
$dologid = $dolog->dologid;

//echo request_by_curl('http://api.weipan.cn/?m=file&a=get_quota',"token={$token}" );
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title></title>
</head>
<body>
<form action="http://api.weipan.cn/?m=file&a=upload_share_file" method="post" enctype="Multipart/form-data" >
<input type="hidden" name="token" value="<?php echo $token; ?>" />
<input type="hidden" name="dir_id" value="0" />
<input type="hidden" name="cover" value="no" />
<input type="file" name="file" />
<input type="hidden" name="dologid" value="{$dolog}" />
<input type="hidden" name="callback" value="http://www.css98.com/api/vdiskcallback.php?token=<?php echo $token?>" />
<input type="submit" value="提交" />
</form>
<!--
{
	"err_code":0,
	"err_msg":"success",
	"data":{
		"fid":928878655,
		"name":"demo.txt",
		"uid":"69680315",
		"dir_id":0,
		"do_dir":"",
		"ctime":1379518655,
		"ltime":1379518655,
		"size":1385,
		"type":"text\/plain",
		"md5":"63da2d6cda80654c4a35db7e34107ca4",
		"sha1":"6b3269c054741236b5788ee8306c343de76860c5"
	},
	"dologid":1057339139,
	"dologdir":[]
}
-->
</body>
</html>
