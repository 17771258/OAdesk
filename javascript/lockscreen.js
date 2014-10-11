//锁屏
ZUI.LOCKSCREEN = (function(){
return {
	lock:function(){
		TEMP.lockscreen = $('#desk').html();
		var lockscreen_Btn = '';
		for(var i=1; i<=16 ; i++){ lockscreen_Btn += '<div class="item" rel="'+i+'"><div class="btn_item"></div></div>'; };
		var _str	='<div id="lockscreen">'
					+'<div id="lockscreenPanel" class="clearfix">'
					+'<p id="lockscreen_Msg">请输入密码！</p>'
					+lockscreen_Btn+'</div>'
					+'<div id="lockscreen_Bg"></div>'
					+'</div>';
		$('#desk').before(_str);
		$('#desk').html('');
		ZUI.AJAX.base('ac=getLockscreenPassword',function(json){
				TEMP.rpassword = json.password;
				if(TEMP.rpassword == ''){
					$('#lockscreen_Msg').text('首次使用，请您设置密码！');
				}else{
					$('#lockscreen_Msg').text('锁屏成功,输入密码解锁。');
				}
				TEMP.onePassword = '';
				TEMP.twoPassword = '';
			
			ZUI.LOCKSCREEN.mouse();

		});
		TEMP.password = '';
	},
	unlock:function(){
		$('#lockscreen').remove();
		$('#desk').append(TEMP.lockscreen);
		TEMP.lockscreen = '';
		ZUI.MOUSE.reload();
		ZUI.RESIZE.resize(200);
	},
	mouse:function(){
		$('#lockscreenPanel').on('mousedown', 'div.btn_item', function(){

			$(this).hide();			
			$(this).parent('div.item').addClass('now');
			TEMP.password += $(this).parent('div.item').attr('rel');

			$(document).on('mousedown',function(){
				$('div.btn_item').on('mouseover', function(){
					$(this).hide();			
					$(this).parent('div.item').addClass('now');
					TEMP.password += $(this).parent('div.item').attr('rel');
				});
			}).on('mouseup',function(){
				
				$('div.item.now').each(function(){
					var $this = $(this);
					$this.fadeOut(300,function(){
						$this.removeClass('now');
						$this.fadeIn(300,function(){ $('div.btn_item', $this).show();	})
					});
				});

				$('div.btn_item').off('mouseover');
				$(document).off('mousedown').off('mouseup');
					
					//防止出现错误
					if(TEMP.password == '' ){return false;}
					
					//解锁
					if(TEMP.rpassword != ''){	
							if (TEMP.password == TEMP.rpassword ){
								ZUI.LOCKSCREEN.unlock();
							}else{
								$('#lockscreen_Msg').text('您的密码输入有误，请重试！').addClass('error');
								TEMP.password = '';
							}							
							return false;
					};
					
					//第二次设置密码
					if( TEMP.onePassword != '' && TEMP.twoPassword == ''){
							TEMP.twoPassword = TEMP.password;
							if( TEMP.twoPassword == TEMP.onePassword ){
									ZUI.AJAX.base('ac=setLockscreenPassword&pwd='+TEMP.twoPassword,function(json){
											if(json.statusCode == '200'){													
													$('#lockscreen_Msg').text('锁屏成功，输入密码解锁。').removeClass('error');
													TEMP.rpassword = TEMP.onePassword;
											};
									});
							}else{
									$('#lockscreen_Msg').text('两次密码不一致，请重试。').addClass('error');
									TEMP.onePassword ='';
									TEMP.twoPassword ='';
							};
							TEMP.password = '';
							return false;
					};

					//第一次设置密码
					if(TEMP.onePassword == '' ){
						TEMP.onePassword = TEMP.password;						
						$('#lockscreen_Msg').text('请再次输入密码!').removeClass('error');
						TEMP.twoPassword = '';
						TEMP.password = '';
						return false;
					};
			});//mouseup
		});//mousedown
	}


}
})();
