<?php
	
function request_by_curl($remote_server, $post_string){
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
$token = $_GET['token'];
$info = (json_decode($_GET['msg']));
$fid = $info->data->fid;
echo $fid.'<br>';
$dologid = $info->dologid;
echo $dologid.'<br>';
echo $token;
$files = json_decode(request_by_curl('http://api.weipan.cn/?m=file&a=get_file_info',"token={$token}&fid={$fid}&dologid={$dologid}"));

echo $files->data->s3_url;
?>
