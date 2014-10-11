ZUI.DIALOG = (function(){
return {
	init:function(conf){
			var conf = $.extend({}, ZUI.DIALOG.defaults, conf);
			ZUI.DIALOG.show(conf);
	},
	show:function(conf){
		 var that = $( dialogTemp(conf) );
		 $('body').append( $(that) ).append('<div class="dialog_mask" rel="'+conf.id+'" style="zindex:' + (conf.zindex-1) +'"></div>');
		 var h = that.height(), 
			w = that.width();
		 conf.top = _tonum(conf.top, (ZUI.CONF.h - h) );
		 conf.left= _tonum(conf.left, (ZUI.CONF.w - w) );
		 var 	scl = conf.left /(ZUI.CONF.w - w),
				sct = conf.top/(ZUI.CONF.h - h)
		 $(that).css({
			'width':w+'px',
		 	'height':h+'px',
		 	'top':conf.top+'px',
		 	'left':conf.left+'px'}).fadeIn(conf.duration).attr('sc', scl+'_'+sct);
		 ZUI.DIALOG.mouse(conf);		 
	},
	remove:function(obj){
		var rel = obj.attr('id');
		obj.fadeOut(300,function(){
			obj.remove();
			$('div.dialog_mask[rel="'+rel+'"]').remove();
		})
	},
	mouse:function(conf){
		var that, arr;
		$('div.dialog').on('mouseover',function(){
			that = $(this);
			arr = that.attr('sc').split('_');		
		}).on('mousedown', 'div.drag', function(e){
			var mask,
				nt,
				nl,
				t=e.clientY,
				l = e.clientX,
				ot = that.position().top,
				ol= that.position().left,
				w = ZUI.CONF.w - that.width(),
				h = ZUI.CONF.h - that.height();
			mask = ZUI.MASK.desk();
			mask.show();
			$(document).on('mousemove',function(e){
				clsSelect();
				nt = e.clientY - t + ot;
				nl = e.clientX - l + ol;
				nt = nt < 0 ? 0 : nt > h ? h : nt ;
				nl = nl < 0 ? 0 : nl > w ? w : nl ; 
				that.css({top:nt+'px', left:nl+'px'});
			}).on('mouseup',function(){
				mask.hide();
				if(nl != null && nt != null) that.attr('sc', nl/w+'_'+nt/h);
				$(document).off('mousemove').off('mouseup');
			})
		}).on('mouseover', 'span.dialog_close', function(){
			$(this).addClass('hover');
			$(this).on('mousedown',function(){
				return false;
			}).on('click', function(){
				ZUI.DIALOG.remove($(that));
			}).on('mouseout', function(){
				$(this).removeClass('hover');	
			})
		}).on('mouseover', 'span.dialog_btn', function(){
			$(this).addClass('hover');
			$(this).on('click', function(){
				var rel = $(this).attr('rel');
				ZUI.DIALOG.remove(that);
				if ((typeof conf[rel]) === 'function' ) conf[rel]();
				return false;
			}).on('mouseout', function(){
				$(this).removeClass('hover').off('click');
			})
		})
	},
	resize:function(){
		$('div.dialog').each(function(){
			var arr = $(this).attr('sc').split('_');
			var scl = arr[0], sct = arr[1];
			$(this).animate({top:parseInt((ZUI.CONF.h - $(this).height()) * sct)+'px', left:parseInt((ZUI.CONF.w - $(this).width()) * scl)+'px'},300)
		})
	},
	dialog:function(conf){
		ZUI.DIALOG.init(conf);   
	},
	defaults:{
			id			: 'd_'+Date.parse(new Date()),	//ID
			type		: 'alert',						//类型
			title		: '消息',						//标题
			msg			: '',							//内容
			msgtype		: null,							//图标  注意 警告 提示 停止
			top			: '38.2%',						//位置
			left		: '50%',
			minwidth	: 96,
			minheight	: 32,
			padding		: '20px 50px',
			esc			: true,							//esc关闭，暂未实现。
			duration	: 300,							//透明动画速度
			zindex		: 1987,							//对话框高度Z轴
			drag		: true,							//是否可以拖动
			time		: null,							//自动关闭时间
			close		: true,							//是否可以关闭
			okValue		: '确定',
			cancelValue : '取消',
			ok			: null,							//点击确认按钮回调函数
			cancel		: null							//点击取消按钮回调函数
	}
}
})();
