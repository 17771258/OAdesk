ZUI.RESIZE=(function(){
return{
	init:function(){
		$(window).on('resize',function(){
			ZUI.RESIZE.resize(200);
		})	   
	},
	resize:function(time){
		$.doTimeout('resize', time, function(){
			ZUI.CONF.w = $(window).width();
			ZUI.CONF.h = $(window).height();

			//重置背景
			ZUI.WALLPAPER.resize();

			//重置桌面
			ZUI.DESK.resize();

			//重置图标排序
			ZUI.APP.resize();

			//弹出框
			ZUI.DIALOG.resize();

			//任务栏
			ZUI.TASKBAR.resize();
		})
	}
}
})();
