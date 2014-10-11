ZUI.USER = (function(){
return {
	//得到用户配置
	get:function(func){
		//得到用户配置
		ZUI.AJAX.base('ac=getUserSetting', function(json){
			//成功判断
			if(json.statusCode == ZUI.statusCode.ok){
				ZUI.USER.wptype = parseInt(json.wptype);	//系统 用户 网络壁纸				
				ZUI.USER.wpmode = parseInt(json.wpmode);	//适应 平铺 拉伸				
				ZUI.USER.dtsort = parseInt(json.dtsort);	//横向或者纵向排序				
				ZUI.USER.appsize= parseInt(json.appsize);	//大 小图标				
				ZUI.USER.wplink = json.wplink;				//壁纸地址			
				ZUI.USER.sort   = json.sort;				//桌面图标
				//回调函数
				if(typeof(func) == 'function'){ func(); }
			}
		})
	},
	//设置用户配置
	set:function(func){
		ZUI.AJAX.base('ac=setUserOptions', function(){
			
			if(typeof(func) == 'function'){
				func();
			}
		})
	}
}
})();
