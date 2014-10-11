ZUI.APP = (function(){
return{
	get:function(){
		ZUI.AJAX.base("ac=getAppJson&sort="+ZUI.USER.sort, function(json){
			//图标表格
			var _app_grid = ZUI.APP.grid(ZUI.USER.dtsort);
			if(json.statusCode == ZUI.statusCode.ok){
				var _app_list = '';
				$.each(json.sc,function(i,app){
					_app_list += appbtnTemp({
						'type'		: app.type,
						'style'		: ZUI.USER.appsize,
						'sortid'	: i,
						'appid'		: app.id,
						'top'		: _app_grid[i].startY,
						'left'		: _app_grid[i].startX,
						'imgsrc'	: app.icon,
						'name'		: app.name
					})
				});
				$('#desktop').append(_app_list);
				//鼠标事件
				ZUI.MOUSE.appbtn();
			}
		});
	},
	grid:function(dtsort){
		var width = $("#desktop").width(),
			height =$("#desktop").height(),
			app_grid=[],
			_top=5,
			_left=5;
		var _size = ZUI.USER.appsize == 1 ? 100 : 90 ;
		for(var i=0; i<1000; i++){
			app_grid.push({
				startY	: _top,
				endY	: _top+_size,
				startX	: _left,
				endX	: _left+_size
			});			
			//如果是横向
			if (dtsort == 1){ _left += _size ; if(_left+_size > width){ _top += _size; _left = 5; }
			//如果是纵向
			} else { _top += _size; if(_top+_size > height){ _top = 5; _left += _size ; } }
		}
		return app_grid;
	},
	//接受两个参数
	// x 横坐标
	// Y 纵坐标
	// 作用 判断当前横纵坐标在那个格子里
	getgrid:function(x,y){
		//根据用户设置进行表格绘制
		var grid = ZUI.APP.grid(ZUI.USER.dtsort);
		var grid_len = grid.length;
		var app_len = $('#desktop .apptn').length;
		var flags = 0 ;
		for (var i=0; i < grid_len; i++){
			if( x >= grid[i].startX && x <= grid[i].endX ){	flags ++; }
			if( y >= grid[i].startY && y <= grid[i].endY ){	flags ++; }
			if( flags === 2 ){ return i; }else{ flags = 0; }
		}
		//不返回数据
		return null;
	},
	resize:function(){
		//根据用户dtsort 进行排序
		var _app_grid = ZUI.APP.grid(ZUI.USER.dtsort);
		//图标定位
		$('.appbtn').each(function(i){
			$(this).animate({top:_app_grid[i].startY,left:_app_grid[i].startX},500);
			$(this).attr('sortid',i);
		});
		//排序后绑定事件
		ZUI.MOUSE.appbtn();
	},
	//打开应用
	open:function(obj){
			var appid = $(obj).attr('appid');			
			//打开应用
			if( $(obj).attr('type') == 'app'){
				
				ZUI.AJAX.base('ac=getAppContent&appid='+appid, function(json){
					
				ZUI.VIEW.add({
						'id'		: 'w_'+json.type+'_'+json.id,
						'title'		: json.name,
						'icon'		: json.icon,
						'width'		: json.width,
						'height'	: json.height,
						'content'	: '<iframe class="view_iframe" scrolling="auto" width="100%" height="100%" frameborder="0" src="'+json.content+'" ></iframe>'
					});
				})
			}else{
				ZUI.VIEW.add({
					id : 'w_'+obj.attr('type')+appid,
					title: obj.find('span.name').text(),
					icon : obj.find('.icon>img').attr('src')
				})
			};
		
	}
}
})();
