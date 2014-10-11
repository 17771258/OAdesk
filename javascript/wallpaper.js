//用户桌面设置
ZUI.WALLPAPER = (function(){
return {
	//设置背景
	set:function(isreload){
		var isreload = typeof(isreload) == 'underfined' ? true : isreload;
		//重载壁纸
		if(isreload){
			//如果壁纸已经存在
			//目的:优化用户登陆
			if($('#warp_wallpaper').length != 0){ $('#warp_wallpaper').remove(); }
			var _wallpaper_str = '';
			switch(ZUI.USER.wptype){
				case 1 :
				case 2 :
					switch(ZUI.USER.wpmode){
						case 1:
							_wallpaper_str	="<iframe class='iframe_mask' frameborder='no' border='0' scrolling='no'></iframe>"
											+"<img id='wallpaper_img' src='"+ZUI.USER.wplink+"' width='"+ZUI.CONF.w
											+"'height='"+ZUI.CONF.h
											+"'/>";
							break;
						case 2:
							_wallpaper_str	="<div id='wallpaper_bac' style='width:"
											+ZUI.CONF.w+"px;height:"
											+ZUI.CONF.h+"px;"
											+"background:url("+ZUI.USER.wplink+") no-repeat center center;"
											+"'></div>";
							break;
						case 3:
							_wallpaper_str	="<div id='wallpaper_bac' style='"+
											+"width:"+ZUI.CONF.w+"px;height:"+ZUI.CONF.h+"px;"
											+"background:url("+ZUI.USER.wplink+") 0 0;"
											+"'></div>";
							break;
						default:
							_wallpaper_str = '';
					}
					break;
				default:
					_wallpaper_str	="<iframe class='iframe_mask' frameborder='no' border='0' scrolling='no'></iframe>"
									+"<iframe id='iframe_cont' frameborder='no' border='0' scrolling='no' src='"+ZUI.USER.wplink+" '></iframe>";
			}
			$('#wallpaper').append(_wallpaper_str);
		}
		//调整壁纸
		ZUI.WALLPAPER.resize();
	},
	resize : function(){
		$('#wallpaper_img, #wallpaper_bac, #wallpaper iframe').animate({'height':ZUI.CONF.h,'width':ZUI.CONF.w},200);		 
	}
}
})();
