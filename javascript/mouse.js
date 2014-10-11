ZUI.MOUSE=(function(){
return{
	//鼠标初始化
	init : function(){
		//屏蔽鼠标右键
		$('body').on('contextmenu', function(){
			return false;
		}).on('click',function(){
			$('.popup_menu').remove();
		});
		//禁止文字选中
		document.body.onselectstart = document.body.ondrag = function(){
			return false;
		}
	},
	desk : function(){
		$('#desktop').off('click').on('click',function(){
			ZUI.MOUSE.clickset();
		//右键菜单
		}).on('contextmenu', function(e){	
			ZUI.MOUSE.contextmenu('desk', $(this), e);
		})	 
	},
	//应用图标事件
	appbtn:function(){
		//鼠标移入事件
		$('.appbtn').on('mouseover', function(){
			$(this).addClass('hover');
			var that = $(this);
			$(this).off('mousedown').on('mousedown', function(e){
					ZUI.MOUSE.clickset();
					// x y 开始拖拽前的图标位置
					// dx dy 开始拖拽鼠标位置
					// cx cy 拖拽中的鼠标位置
					// mask 遮罩对象
					// oldobj 执行拖拽的对象
					// obj 克隆出来的新对象 半透明
					var oldobj, x, y, cx, cy, _l, _t, dx, dy, mask, obj, newobj;
					oldobj  = $(this);
					newobj = oldobj.clone().removeClass('hover click');
					obj = oldobj.clone();
					dx = cx = e.clientX;
					dy = cy = e.clientY;
					x = dx - oldobj.offset().left;
					y = dy - oldobj.offset().top;
					//鼠标移动
					$(document).on('mousemove', function(e){
						$('body').append(obj);
						cx = e.clientX;	cy = e.clientY;
						_l = cx - x; _t = cy - y;
						if(dx != cx || dy != cy){ obj.css({ 'left': _l, 'top': _t, 'opacity':'0.4'}).show(); }
					}).on('mouseup',function(e){
						$(document).off('mousemove').off('mouseup');
						obj.remove();
						//判断鼠标有没有移动,判断为点击事件
						if(dx == cx && dy == cy){
							//如果是右键	
							if(e.button == 2 ){
								ZUI.MOUSE.contextmenu(that.attr('type'),that,e);
							} else {
								//打开应用
								ZUI.APP.open(that);
							}
							return false;
						}
						//鼠标发生了移动
						var gridID = ZUI.APP.getgrid(cx, cy);
						if(gridID != null ){
							var oldgrid = oldobj.attr('sortid');
							if(gridID < oldgrid ){
								$('.appbtn[sortid='+gridID+']').before(newobj);
							}else if(gridID > oldgrid){
								gridID = gridID > $('#desktop div.appbtn:last').attr('sortid') ? $('#desktop div.appbtn:last').attr('sortid') : gridID ; 
								$('.appbtn[sortid='+gridID+']').after(newobj);
							}else{
								return false;
							}
							oldobj.remove();
							ZUI.APP.resize();
							var sort_arr = '';
							$('.appbtn').each(function(){sort_arr += $(this).attr('appid')+','; });
							//更新系统桌面排序数据 aid=0;
							ZUI.AJAX.base('ac=setAppSort&aid=0&sort='+sort_arr, function(json){	ZUI.USER.sort = json.sort; });
						}
					});
		//鼠标移出事件
		return false;
		}).on('mouseout', function(){
			$(this).removeClass('hover');
		});
	});
	},
	//右键菜单
	/*
	 *	type 右键类型
	 *	obj 当前发生事件的对象
	 *	evt 发生时间时，鼠标的位置
	 */
	contextmenu:function(type,obj,evt){
	ZUI.MOUSE.clickset();
	var  e = evt;
	switch (type){
		//桌面
		case 'desk':
			var dtsortx = '',dtsorty='',appsizeb='',appsizes='';
			if(ZUI.USER.dtsort == 1){ dtsortx = ' now'; }else{ dtsorty = ' now'; }
			if(ZUI.USER.appsize == 1){appsizeb = ' now'; }else{appsizes = ' now';}
			_str	="<div class='popup_menu'><ul>"
					+"<li type='showdesk'><span>显示桌面</span></li>"
					+"<li class='line' type='closeallapp'><span>关闭所有</span></li>"
					+"<li><span>添加</span><b class='icon hassubmenu'></b>"
					+	"<div class='popup_menu_sub'>"
					+		"<ul>"
					+			"<li type='addnewfolder'><b class='icon addnewfolder'></b><span>文件夹</span></li>"
					+			"<li type='addnewfile'><b class='icon addnewfile'></b><span>文档</span></li>"
					+			"<li type='addnewapp'><b class='icon addnewapp'></b><span>系统应用</span></li>"
					+			"<li type='addmyapp'><b class='icon'></b><span>私人应用</span></li>"
					+		"</ul>"
					+	"</div>"
					+"</li>"
					+"<li type='setthemes'><b class='icon themes'></b><span>主题设置</span></li>"
					+"<li class='line'><span>图标设置</span><b class='icon hassubmenu'></b>"
					+	"<div class='popup_menu_sub'>"
					+		"<ul>"
					+			"<li type='appsizeb'><b class='icon"+appsizeb+"'></b><span>大图标</span></li>"
					+			"<li type='appsizes'><b class='icon"+appsizes+"'></b><span>小图标</span></li>"
					+			"<li type='dtsortx'><b class='icon"+dtsortx+"'></b><span>横向排列</span></li>"
					+			"<li type='dtsorty'><b class='icon"+dtsorty+"'></b><span>纵向排列</span></li>"
					+		"</ul>"
					+	"</div>"
					+"</li>"
					+"<li type='reload'><span>重载页面</span></li>"
					+"<li type='loginout'><span>注销登录</span></li>"
					+"<li type='lockscreen'><b class='icon lockscreen'></b><span>锁屏</span></li>"
					+"</ul></div>";
			break;
		//文件夹 文件
		case 'folder':
		case 'fill':
			obj.addClass('click').siblings('div.appbtn').removeClass('click');
			_str	="<div class='popup_menu'><ul>"
					+	"<li type='open'><span>打开</span></li>"
					+	"<li type='rename' class='line'><span>重命名</span></li>"
					+	"<li type='shear'><span>剪切</span></li>"
					+	"<li type='copy'><span>复制</span></li>"
					+	"<li type='paste' class='line'><span>粘贴</span></li>"
					+	"<li type='delete'><b class='icon delete'></b><span>删除</span></li>"
					+	"<li type='attribute'><span>属性</span></li>"
					+"</ul></div>";
			break;
		//任务栏
		case 'taskbar':
			_str	="<div class='popup_menu'><ul>"
					+"<li type='choice'><span>显示当前</span></li>"
					+"<li type='tclose'><span>关闭窗口</span></li>"
					+"</ul></div>";
			break;
		//其它
		default:
			_str	="";
		}
		$('#desk').append(_str);
		//定位
		var t= e.clientY, l= e.clientX, tt=-2, ll=123;
		if( l>=ZUI.CONF.w -252){ ll = -123; };
		if( l>=ZUI.CONF.w - $('.popup_menu').width()) { l = l - $('.popup_menu').width() };
		if( t>=ZUI.CONF.h - $('.popup_menu').height()){ t = t - $('.popup_menu').height()};
		$('.popup_menu').css({top:t,left:l}).show();
		$('.popup_menu_sub').css({top:tt,left:ll});

		//右键菜单事件绑定
		$('.popup_menu').on('mouseover', 'li', function(){
			$(this).addClass('hover');
		}).on('click', 'li',function(){
			ZUI.MOUSE.dopopupaction($(this),obj);
			return false;
		}).on('mouseout','li',function(){
			$(this).removeClass('hover');			
		}).on('contextmenu',function(){
			return false;
		});
	},
	/*
	 *	obj = 当前点击的菜单li
	 *	that = 发生右键的对象
	 *
	 */
	dopopupaction:function(obj,that){
		ZUI.MOUSE.clickset();
		switch (obj.attr('type')){
			case 'showdesk'		:	//显示桌面
				ZUI.VIEW.hide( $('div.view') );
				break;
			case 'closeallapp'	:	//关闭所有
				ZUI.VIEW.close($('div.view'));
				break;
			case 'addnewfolder'	:	//加文件夹
				break;
			case 'addnewfile'	:	//新建文件

				break;
			case 'setthemes'	:	//设置主题
				if(window.fullScreenApi.supportsFullScreen){
            		window.fullScreenApi.requestFullScreen( document.getElementById('index_body') );
        		}else{
            		alert('就你这浏览器，基本就告别全屏功能了');
        		}				
				break;
			case 'appsizeb'		:	//设置为大图标
				if(ZUI.USER.appsize == 2){
					ZUI.AJAX.base('ac=setUserAppSize&appsize=1',function(json){
						ZUI.USER.appsize = json.appsize;
						$('.appbtn').removeClass('appbtn_2').addClass('appbtn_1');
						ZUI.APP.resize(ZUI.USER.dtsort);
					})
				}
				break;
			case 'appsizes'		:	//设置为小图标
				if(ZUI.USER.appsize == 1){
					ZUI.AJAX.base('ac=setUserAppSize&appsize=2',function(json){
						ZUI.USER.appsize = json.appsize;
						$('.appbtn').removeClass('appbtn_1').addClass('appbtn_2');
						ZUI.APP.resize(ZUI.USER.dtsort);
					})
				}
				break;
			case 'dtsortx'		:	//图标设置 X
				if( ZUI.USER.dtsort == 2 ){
					ZUI.AJAX.base('ac=setUserDtsort&dtsort=1', function(json){
						ZUI.USER.dtsort = json.dtsort;
						ZUI.APP.resize(ZUI.USER.dtsort);
					})
				}
				break;
			case 'dtsorty'		:	//图标设置 Y
				if( ZUI.USER.dtsort == 1 ){
					ZUI.AJAX.base('ac=setUserDtsort&dtsort=2', function(json){
						ZUI.USER.dtsort = json.dtsort;
						ZUI.APP.resize(ZUI.USER.dtsort);
					})
				}
				break;
			case 'reload'		:	//重新加载
				_alert('即将重新加载桌面,未保存内容将丢失！', function(){
					$('#desk div').html('');
					$('#wallpaper').html('');
					ZUI.CORE.init();
				})
				break;
			case 'loginout'		:	//退出登录
				window.location.href="index.php?ac=loginout";
				break;
			case 'lockscreen'	:	//锁定屏幕
				ZUI.LOCKSCREEN.lock();
				break;
			case 'open'			:	//打    开
				ZUI.APP.open(that);
				break;
			case 'rename'		:	//重 命 名
				break;
			case 'delete'		:	//删    除
				break;
			case 'attribute'	:	//文件属性
				break;
			case 'shear'		:	//剪    切
				break;
			case 'copy'			:	//复    制
				break;
			case 'paste'		:	//粘    贴
				break;
			case 'choice'		:	//选择窗口
				ZUI.VIEW.choice($('#'+that.attr('rel')));
				break;
			case 'tclose'		:	//关闭窗口
				ZUI.VIEW.close($('#'+that.attr('rel')));
				break;			
			default	:
		}
		return false;
	},	
	taskbar: function(){
		$('#start_menu_btn').on('mouseover', function(){
			$(this).addClass('hover');
		}).on('mouseout', function(){
			$(this).removeClass('hover');
		}).on('click', function(){
			if( $('#start_menu').is(':hidden') ){
				$('.popup_menu').remove();
				$('.click').removeClass('click');
				$(this).addClass('click');
				$('#start_menu').show();
			}else{
				ZUI.MOUSE.clickset();
			}
		});

		$('#start_menu_list').on('mouseover', 'li', function(){
			$(this).addClass('hover');
		}).on('mouseout', 'li', function(){
			$(this).removeClass('hover');
		});

		$('#user_sign').on('mouseover', function(){
			$(this).find('span.editor').show();
		}).on('mouseout', function(){
			$(this).find('span.editor').hide();
		})
	},
	
	clickset:function(){
		//移除右键菜单
		if($('.popup_menu').length > 0){ $('.popup_menu').remove(); }
		//隐藏开始菜单
		if(!$('#start_menu').is(':hidden')){ $('#start_menu').hide(); }
		//移除不需要的click
		if($('.click').length > 0 ){ $('.click').removeClass('click'); }
	},
	
	reload:function(){
		ZUI.MOUSE.desk();
		ZUI.MOUSE.appbtn();
		ZUI.MOUSE.taskbar();
		ZUI.VIEW.mouse();
		ZUI.TASKBAR.mouse();
	}

}
})();
