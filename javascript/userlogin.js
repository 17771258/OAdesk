var _submitBtn;
$(function(){
	$('#topbar').on('mouseover', 'span', function(){
		$(this).addClass('hover');
	}).on('mouseout', 'span', function(){
		$(this).removeClass('hover');
	}).on('click', 'span:not([rel="newpassword"])', function(){
			choice_from( $(this).attr('rel') );
	});

	$('.has_input').on('focus', 'input', function(){
		$(this).select();;		
	}).on('blur', 'input', function(){
		var input_str = $(this).val().replace(/(^\s*)|(\s*$)/g, "");
		if (input_str == ''){ $(this).next('.input_tips').show(); $(this).val('') };
	}).on('keyup', 'input', function(){
		if($(this).val() != ''){ $(this).next('.input_tips').hide(); }else{ $(this).next('.input_tips').fadeIn(200); }
	});
	//解决IE7不能获取焦点的问题
	$('.input_tips').on('click', function(){
		$(this).prev('input').focus();
	});

	$('.input_btn').on('mouseover',function(){
		$(this).addClass('hover');
	}).on('mouseout',function(){
		$(this).removeClass('hover');
	}).on('click',function(){
		if($(this).hasClass('btn_loading')){
			return false;
		};
		var	datas 		= '',
			that		= $(this),
			username	= $('#username').val(),
			relname		= $('#relname').val(),
			email		= $('#email').val(),
			password	= $('#password').val(),
			repassword	= $('#repassword').val(),
			type		= that.attr('id'),
			ajaxurl		= 'ajax.php';
			_submitBtn = that;
			_submitBtn.addClass('btn_loading');

			//如果用户框显示的话
			if( $('.username').is(":visible") ){
				if(username == '' ){ return user_msg('error', '错误提示，用户名不能为空。') };
			};
			if( $('.relname').is(":visible") ){
				if(relname == ''){ return user_msg('error', '错误提示，姓名不能为空。')};
			};
			if( $('.password').is(":visible") ){
				if(password == ''){ return user_msg('error', '错误提示，密码不能为空。')};
			};
			if( $('.repassword').is(":visible") ){
				if(repassword == ''){ return user_msg('error', '错误提示，重复密码不能为空。')};
				if(repassword != password ){ return user_msg('error', '错误提示，两次密码不一致。')};
			};
			if( $('.email').is(":visible") ){
				if(email == ''){ return user_msg('error', '错误提示，邮件地址不能为空。')};
				if(!checkMail(email)){return user_msg('error', '错误提示，邮件地址格式。')};
			};
			datas = {'ac':that.attr('id'), 'username':username, 'relname':relname, 'email':email, 'password':password}
			console.log(datas);
			//开始发送 AJAX请求
			user_msg('loading','数据处理中，请稍后…………');
			$.ajax({
				type:'POST',
				url:ajaxurl,
				data:datas,
				success:function(res){
					console.log(res);
					
					switch ( parseInt(res.code) ){
						case 0 :
							user_msg('correct','登陆成功，正在跳转。');
							window.location.href="index.php";
							break;
						case 1 :
							user_msg('error','错误提示：您输入的用户名、密码不正确。');
							break;
						case 2 :
							user_msg('error','错误提示：用户名已被占用。');
							break;
						case 3 :
							user_msg('error','错误提示：该邮件已在本站注册。');
							break;
						case 4 :
							user_msg('error','错误提示：找回密码验证成功。');
							break;
						case 5 :
							user_msg('error','错误提示：密码修改成功，请登陆。');
							break;
						case 6 :
							user_msg('correct', '注册成功，正在跳转到登陆页面。');
							window.location.href="index.php";
							break;
						default:
					}
				},
				dataType:"json"
			})
			$('#user_msg').show();
		});
	//初始化的时候显示登陆
	choice_from('login');
});
//跳转
function choice_from(str){
	//删除找回密码成功按钮
	$('#topbar span[rel="newpassword"]').remove();	
	//清空所有input
	$('.has_input').each(function(){ $(this).hide(); $('input', this).val('').blur(); });
	$('.input_btn').each(function(){ $(this).hide() });
	
	//根据str进行判断
	switch (str){
		case 'register' :
			$('.has_input').show();
			break;
		case 'getpassword':
			$('.has_input.username, .has_input.relname, .has_input.email').show();
			break;
		case 'newpassword':
				$('#topbar').append('<span rel="newpassword">重置密码</span>');
				$('.has_input.password, .has_input.repassword').show();
			break;
		default:
			str = 'login';
			$('.has_input.username, .has_input.password').show();							
			break;
	};

	//给当前按钮加上样式
	$('#topbar span[rel='+str+']').addClass('click').siblings('span').removeClass('click');

	$('#'+str).show();
	
};

//信息提示
function user_msg(type,str){
	$('#user_msg').removeClass().addClass(type).show();
	$('#user_msg>#text').text(str);
	if(type != 'loading'){ 
		$('.'+type).show().delay(2000).fadeOut(200,function(){
			_submitBtn.removeClass('btn_loading');
		}) 
	};
	
	if(type == 'error'){ return false; }
}
//邮件地址验证
function checkMail(str){
    var _mailArray;   
    var patterns = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; 
    _mailArray=str.split(",");
    for(i=0;i<_mailArray.length;i++) { 
        if(patterns.test(_mailArray[i])) { return true; } else { return false; }
    }
}
