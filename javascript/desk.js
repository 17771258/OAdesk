ZUI.DESK=(function(){
return{
	init:function(func){
		var _desk_str	="<div id='desktop'></div>"
						+"<div id='taskbar'></div>";
		$('#desk').append(_desk_str);
		//设置桌面大小
		ZUI.DESK.resize();
		//鼠标事件
		ZUI.MOUSE.desk();
		//执行回调函数
		if(typeof(func) == 'function'){ func(); }
	},
	resize:function(){
		$('#desktop, #view').width(ZUI.CONF.w).height( ZUI.CONF.h - ZUI.CONF.th);
		$('#taskbar').width(ZUI.CONF.w).height(ZUI.CONF.th);
	}
}
})();
