ZUI.VIEW = (function(){
return {
	//添加
	add:function(config){
	var defaults = {
		'id'		: 'r_'+Date.parse(new Date()),	//窗口唯一ID
		'top'		: '38.2%',						//顶部距离
		'left'		: '50%',						//左边距离
		'width'		: '38.2%',						//宽度
		'height'	: '61.8%',						//高度
		'mwidth'	: 250,							//最小宽度
		'mheight'	: 140,							//最小高度
		'zindex'	: ZUI.CONF.zindex,				//窗口高度
		'images'	: null,							//窗口图标
		'title'		: '',							//标题文字
		'icon'		: '',							//标题图标
		'resize'	: true,							//可以缩放
		'darg'		: true,							//可以拖拽
		'close'		: true,							//可以关闭
		'large'		: false,						//是否最大化打开
		'theme'		: true,							//可以调整皮肤
		'small'		: true,							//可以最小化
		'content'	: '',							//加载内容
		'buttons'	: null
	}
		var conf = $.extend({}, defaults, config);
		if ( $('#'+conf.id).size() == 0 ){
			//转为数字类型
			conf.width	= _tonum(conf.width,  ZUI.CONF.w);
			conf.height	= _tonum(conf.height, ZUI.CONF.h);
			conf.top	= _tonum(conf.top,    ZUI.CONF.h-conf.height);
			conf.left	= _tonum(conf.left,   ZUI.CONF.w-conf.width);

			conf.top = conf.top < 0 ? 0 : conf.top;
			conf.left = conf.left < 0 ? 0 : conf.left;

			ZUI.TASKBAR.add(conf.id, conf.icon, conf.title);
			//判断是否重复
			if( $('div.view').length != 0 ){
				$('div.view').each(function(){
					if(conf.top == $(this).position().top) conf.top += 40;
					if(conf.left == $(this).position().left) conf.left += 20;
				})	
			}
			$('#desktop').append( windowTemp(conf) );

			if( $('#'+conf.id+' iframe.view_iframe').length != 0){
				$('#'+conf.id+' iframe.view_iframe').on('load', function(){	$('#'+conf.id+' div.view_load').fadeOut(1000); });
			}else{
				$('#'+conf.id+' div.view_load').fadeOut(1000);
			}
		}
		ZUI.VIEW.choice($('#'+conf.id));
		ZUI.CONF.zindex ++;
		ZUI.VIEW.mouse();
	},
	//选择
	choice:function(obj){
		if( parseInt(obj.css('z-index') ) < ZUI.CONF.zindex-1 ){
			obj.css('z-index', ZUI.CONF.zindex);
			ZUI.CONF.zindex ++;
		}
		obj.addClass('now').siblings('div.view').removeClass('now');
		obj.show();
		ZUI.TASKBAR.choice( $('li[rel="'+obj.attr("id")+'"]') );
	},
	close:function(obj){
		obj.each(function(){
			$(this).remove();
			ZUI.TASKBAR.close( $('li[rel="'+$(this).attr("id")+'"]') );
		});
	},
	hide:function(obj){
		obj.each(function(){
			$(this).hide();
			$('li[rel="'+$(this).attr("id")+'"]').removeClass('now');
		})
	},
	mouse:function(){
		var that, arr, H = $('#desktop').height(), W = $('#desktop').width();
		$('.view').on('mouseover', function(){
			//隐藏掉所有的右键菜单
			$('.popup_menu').remove();

			$(this).attr('focus','1');
			that = $(this);
			arr = $(that).attr('data').split('_');
		}).on('contextmenu',function(){
			//隐藏掉所有的右键菜单
			$('.popup_menu').remove();
			return false;
		}).on('mouseout', function(){
			$(this).removeAttr('focus');
		}).on('mousedown', function(){
			ZUI.VIEW.choice(that);
			return false;
		}).on('mouseover', 'div.viewHeader_btn span', function(){
			$(this).addClass('hover').on('click', function(){
				if( $(this).hasClass('close') ) {
					//关闭
					ZUI.VIEW.close(that);
				}else if( $(this).hasClass('large') ) {
					//最大
					$(that).css({top:0, left:0, width:'100%', height:'100%'}).attr('islarge',1);
					$(this).hide().next('span.reduc').show();
				}else if( $(this).hasClass('reduc') ) {
					//还原
					$(that).css({top:arr[0]+'px', left:arr[1]+'px', width:arr[2]+'px', height:arr[3]+'px'}).removeAttr('islarge');
					$(this).hide().prev('span.large').show();
				}else if( $(this).hasClass('small') ) {
					//最小
					ZUI.VIEW.hide(that);
				}else if( $(this).hasClass('theme') ) {
					//主题
				}else{ return false; }
				return false;
			}).on('mousedown', function(){ return false; });
		}).on('mouseout', 'div.viewHeader_btn span', function(){
			$(this).removeClass('hover');
		}).on('mousedown', 'div.darg', function(e){
			ZUI.VIEW.choice($(that));
			if( $(that).attr('islarge') == 1 ){ return false };
			var	now, x, y, t, l, w, h, nx, ny, nt, nl, nw, nh , mask;
			mask = ZUI.MASK.desk();
			mask.show();
			x = e.clientX; y = e.clientY;
			t = nt = parseInt(arr[0]);
			l = nl = parseInt(arr[1]);
			w = nw = parseInt(arr[2]);
			h = nh = parseInt(arr[3]);
			$(document).on('mousemove', function(e){
				nt = e.clientY - y + t < 5 ? 5 : e.clientY - y + t  > ZUI.CONF.h -65 ? ZUI.CONF.h -65  : e.clientY - y + t ;
				nl = e.clientX - x + l < -w/2 ? -w/2 : e.clientX - x + l > ZUI.CONF.w - w/2 ? ZUI.CONF.w - w/2 : e.clientX - x + l ;  
				that.css({'top':nt+'px', 'left':nl+'px'});
			}).on('mouseup', function(){
				that.attr('data', nt+'_'+nl+'_'+nw+'_'+nh);
				$(document).off('mousemove').off('mouseup');
				mask.hide();
			})
			return false;
		}).on('mousedown', 'div.viewResize span', function(e){
			var	now, x, y, t, l, w, h, nx, ny, nt, nl, nw, nh , mask;
			mask = ZUI.MASK.desk();
			mask.show();
			x = e.clientX; y = e.clientY;
			t = nt = parseInt(arr[0]);
			l = nl = parseInt(arr[1]);
			w = nw = parseInt(arr[2]);
			h = nh = parseInt(arr[3]);
			now = $(this);
			$(document).on('mousemove', function(e){
				nx = e.clientX; ny = e.clientY;
				if($(now).hasClass('viewResize_br')){ nw = nx - x + w; nh = ny - y + h;}
				if($(now).hasClass('viewResize_r')){  nw = nx - x + w;}
				if($(now).hasClass('viewResize_b')){  nh = ny - y + h;}
				if($(now).hasClass('viewResize_t')){  nt = ny - y + t; nh = y - ny + h;}
				if($(now).hasClass('viewResize_tr')){ nt = ny - y + t; nh = y - ny + h; nw = nx - x + w;}
				if($(now).hasClass('viewResize_tl')){ nt = ny - y + t; nl = nx - x + l; nh = y - ny + h; nw = x - nx + w;}
				if($(now).hasClass('viewResize_l')){  nl = nx - x + l; nw = x - nx + w;}
				if($(now).hasClass('viewResize_bl')){ nl = nx - x + l; nh = ny - y  + h; nw = x - nx + w;}
				that.css({'top': nt+'px', 'left': nl+'px', 'width': nw+'px', 'height': nh+'px'})
			}).on('mouseup', function(){
				that.attr('data', nt+'_'+nl+'_'+nw+'_'+nh);
				$(document).off('mousemove').off('mouseup');
				mask.hide();
			})
		}).on('mousedown', 'a.btn_refresh', function(){
			var _iframe = $('iframe.view_iframe', that);
			var _src = _iframe.attr('src');
			that.find('div.view_load').show();
			_iframe.attr('src', _src);
			return false;
		})
	}
}
})();
