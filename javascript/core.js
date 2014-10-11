var ZUI = {};				//系统对象
var TEMP = {};				//系统临时对象
var AjaxUrl = 'ajax.php'; 	//全局ajax地址

//系统全局变量
ZUI.CONF = {
	w:$(window).width(),	//页面宽度
	h:$(window).height(),	//页面高度
	th: 35,			//任务栏高度
	zindex	 : 2			//初始化view的zindex
}
//用户全局变量
ZUI.USER = {
	wptype	:1,		//系统 用户 网络壁纸
	wpmode	:1,		//适应 平铺 拉伸
	dtsort	:1,		//横向或者纵向排序
	appsize	:1,		//大 小图标
	wplink	:'',	//壁纸地址
	sort	:''		//桌面图标排序
}
//AJAX状态判断
ZUI.statusCode={
	ok:200,			//成功
	error:300,		//程序错误
	timeout:301		//SESSION过期
}

ZUI.CORE = (function(){
return {
	//系统初始化
	init : function(){
		// 开启IE CSS背景图片缓存
		try { document.execCommand('BackgroundImageCache', false, true); } catch (e) {};
		
		//得到用户设置
		ZUI.USER.get(function(){
			//设置背景
			ZUI.WALLPAPER.set(true);
			//初始化桌面
			ZUI.DESK.init(function(){
				//初始化图标
				ZUI.APP.get();
			});

			//初始化任务栏
			ZUI.TASKBAR.init();
				
			//初始化鼠标事件
			ZUI.MOUSE.init();

			//绑定窗口缩放事件
			ZUI.RESIZE.init();
		});
		
	}
}
})();
$(function(){
	ZUI.CORE.init();
})
