ZUI.TASKBAR = (function(){
return {
	init:function(){
		var _str	= '<div id="taskbar_main" class="clearfix">'
					+'<div id="task_content">'
					+'<div id="task_con">'
					+'<ul id="task_con_list" class="clearfix">'
					+'</ul>'
					+'</div>'
					+'</div>'
					+'<div id="task_prev"></div>'
					+'<div id="task_next"></div>'
					+'</div>'
		$('#taskbar').append(_str);
		ZUI.TASKBAR.startmenu();
		ZUI.TASKBAR.time();
	},
	//开始菜单
	startmenu:function(){
		ZUI.AJAX.base('ac=getStartMenu', function(json){
			var conf = {
				'name' : json.rname,
				'sing' : json.sing,
				'stat' : json.status,
				'head' : json.head
			}
			$('#taskbar').append(startmenuTemp(conf));
			ZUI.MOUSE.taskbar();
		});			  
	},
	//时间
	time:function(){
		$('#taskbar').append(showTimeTemp());
		window.setInterval(function(){
			var d = new Date();
			if(d.getHours()		< 10){Hours = '0'+d.getHours();} else {Hours = d.getHours();}
			if(d.getMinutes()	< 10){Minutes = '0'+d.getMinutes();} else {Minutes = d.getMinutes();}
			if(d.getSeconds()	< 10){Seconds = '0'+d.getSeconds();} else {Seconds = d.getSeconds();}
			$('#taskbar_show_time').html( d.getFullYear()+'-'+(d.getMonth() + 1)+'-'+d.getDate()+' '+Hours+':'+Minutes+':'+Seconds);
		}, 1000);
	},
	//添加菜单
	add:function(rel, icon, name){
		var _str	=$('<li class="taskbtn" rel="'+rel+'" >'
					+'<div class="icon" ><img src="'+icon+'" width="20" height="20" /></div>'
					+'<span class="name">'+name+'</span>'
					+'</li>');
		$('#task_con_list').append(_str);
		
		ZUI.TASKBAR.choice(_str);
		ZUI.TASKBAR.resize();
		ZUI.TASKBAR.mouse();
	},
	//选择
	choice:function(obj){
		obj.addClass('now').siblings('li').removeClass('now');
	},
	//关闭
	close:function(obj){
		  obj.remove();
		  ZUI.TASKBAR.resize();
	},
	mouse:function(){
		var _o = $('#task_con_list');
		//下一个按钮
		$('#task_next').off('click').on('click',function(){
			var _l = _o.position().left;	
			if(($('#task_con').width() - _l ) % 120 != 0){
				_l -= 120 - $('#task_con').width() % 120;
			}else{
				_l -= 120;
			}
			_o.stop(false, true).animate({'left': _l+'px'},100,function(){
				if(_o.width() + _l <= $('#task_con').width()){$('#task_next').hide(); }
				if( _l <= 0 ){ $('#task_prev').show(); }
			});
		})
		.on('mouseover',function(){
			$(this).addClass('hover');
		}).on('mouseout',function(){
			$(this).removeClass('hover');
		});
		//上一个按钮
		$('#task_prev').off('click').on('click',function(){
			
			var _l = _o.position().left;

			if(_l%120 != 0){ _l -= _l%120; }else{ _l += 120; }
			
			_o.stop(false, true).animate({'left':_l+'px'},100,function(){
				if(_o.width() + _l > $('#task_con').width()){$('#task_next').show(); }
				if( _l >= 0 ){ $('#task_prev').hide(); }
			});

		})
		.on('mouseover',function(){
			$(this).addClass('hover');
		}).on('mouseout',function(){
			$(this).removeClass('hover');
		});

		$('#task_con_list>li.taskbtn').on('mouseover', function(){
			$(this).addClass('focus');
		}).on('mouseout', function(){
			$(this).removeClass('focus');
		}).off('click').on('click', function(){
			//隐藏掉所有的右键
			$('.popup_menu').remove();
			var obj = $('#'+$(this).attr('rel') );	
			
			if( $(this).hasClass('now') ){
				obj.hide();
				$(this).removeClass('now');
			}else{
				ZUI.VIEW.choice(obj);
			}
			return false;

		}).on('contextmenu',function(e){
			ZUI.MOUSE.contextmenu('taskbar', $(this), e);
		});
	},
	resize:function(){
		var _w = $('#task_con');
		var _o = $('#task_con_list');
		if(_o.length != 0 ){
			var _l = _o.position().left;
			var _n = $('>li', _o).length;
			_o.css({'width':120*_n+'px'});
		}
		if(_o.width() > _w.width()){
			$('#task_prev, #task_next').show();
			if( _l >= 0 ){
				_o.css('left',0);
				$('#task_prev').hide();	
			}
			if ( _w.width() - _o.width() >= _l ){
				_o.css('left', _w.width() - _o.width() );
				$('#task_next').hide();
			}
		}else{
			$('#task_prev, #task_next').hide();
			_o.css('left',0);
		}
	}
}
})();
