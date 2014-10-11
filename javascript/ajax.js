ZUI.AJAX=(function(){
return {
	//基础AJAX
	base:function(datas, callback){
		var json;
		$.ajax({
			type:'POST',
			url:AjaxUrl,
			data:datas,
			dataType:"json",
			success:callback || ZUI.AJAX.done,
			error:ZUI.AJAX.error
		});
	},
	//表单AJAX
	form:function(){
		 
	},
	//带有文件上传AJAX
	iframe:function(){
		   
	},
	//完成AJAX
	done:function(json){
		//如果返回的json不含这这两个值 
		if(json.statusCode === undefined && json.message === undefined){
		 	alert ('AJAX执行失败,未知错误。');
		} else if (json.statusCode == ZUI.statusCode.error){
			alert ('AJAX输出错误,AJAXERROR。');
		} else if (json.statusCode == ZUI.statusCode.timeout){
			alert ('AJAX超时,可能是session过期。');
		} else {
			alert ('AJAX请求成功');
			return json;
		}
	},
	//AJAX出错
	error:function(){
		  
	}
}
})();
