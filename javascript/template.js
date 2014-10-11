var windowTemp		= template(
'<div class="view" id="<%=id%>" data="<%=top%>_<%=left%>_<%=width%>_<%=height%>" '
+'style="top:<%=top%>px;left:<%=left%>px;width:<%=width%>px;height:<%=height%>px; z-index:<%=zindex%>">'
+       	'<div class="viewHeader<%if (darg){%> darg<%}%>">'
+			'<div class="viewHeader_body clearfix">'
+				'<h3 class="viewHeader_title"><%=title%></h3>'
+				'<img class="viewHeader_icon" src="<%=icon%>" width="20" height="20" />'
+				'<div class="viewHeader_btn">'
+					'<span class="close">关闭</span>'
+					'<%if (resize) { %>'
+					'<span class="large" <%if (large){%>style="display:none;"<%}%> >最大</span>'
+					'<span class="reduc" <%if (!large){%>style="display:none;"<%}%> >还原</span>'
+					'<% } %>'
+					'<span class="small">最小</span><span class="theme">主题</span>'
+				'</div>'
+        	'</div>'
+      	'</div>'
+      	'<div class="viewContent">'
+      		'<div class="viewContent_body">'
+					'<div class="view_mask"></div>'
+					'<div class="view_load"></div>'
+                	'<div class="viewWindows">'
+					'<%=content %>'
+                   '</div>'
+            '</div>'
+		'</div>'
+        '<div class="viewFooter">'
+            	'<div class="viewFooter_body">'
+				'<a href="javascript:;" class="btn_refresh" >刷新</a>'
+				'</div>'
+		'</div>'
+		'<% if (resize) { %><div class="viewResize">'
+			'<span class="viewResize_t"></span><span class="viewResize_r"></span><span class="viewResize_b"></span><span class="viewResize_l"></span>'
+    		'<span class="viewResize_tl"></span><span class="viewResize_tr"></span><span class="viewResize_bl"></span><span class="viewResize_br"></span>'
+		'</div><% } %>'
+		'<div class="viewBorder"></div>'
+       '<div class="viewShadow">'
+			'<span class="viewShadow_tl"></span><span class="viewShadow_tc"></span><span class="viewShadow_tr">'
+			'</span><span class="viewShadow_ml"></span><span class="viewShadow_mr"></span>'
+			'<span class="viewShadow_bl"></span><span class="viewShadow_bc"></span><span class="viewShadow_br"></span>'
+		'</div>'
+'</div>'
);
//图标
var appbtnTemp		= template(
		'<div class="appbtn appbtn_<%=style%>" '+
		'type="<%=type%>" '+
		'sortid="<%=sortid%>" '+
		'appid="<%=appid%>" '+
		'style="top:<%=top%>px; left:<%=left%>px;">'+
			'<div class="icon"><img src="<%=imgsrc%>" /></div>'+
			'<span class="name"><%=name%></span>'+
		'</div>'
);
//开始菜单
var startmenuTemp	= template(
					'<div id="start_menu" style="display:none;"><div id="start_menu_t"></div>'
					+'<div id="start_menu_m" class="clearfix">'
					+'<ul id="start_menu_list">'
					+	'<li><div class="icon"><img src="image/startmenu/docu.png"    width="30" height="30" /></div><span class="name">我的文档</span></li>'
					+	'<li><div class="icon"><img src="image/startmenu/log.png"     width="30" height="30" /></div><span class="name">我的日历</span></li>'
					+	'<li><div class="icon"><img src="image/startmenu/notice.png"  width="30" height="30" /></div><span class="name">工作笔记</span></li>'
					+	'<li><div class="icon"><img src="image/startmenu/konw.png"    width="30" height="30" /></div><span class="name">共享文档</span></li>'
					+	'<li><div class="icon"><img src="image/startmenu/plan.png"    width="30" height="30" /></div><span class="name">工作计划</span></li>'
					+	'<li><div class="icon"><img src="image/startmenu/address.png" width="30" height="30" /></div><span class="name">通讯记录</span></li>'
					+	'<li><div class="icon"><img src="image/startmenu/sysremd.png" width="30" height="30" /></div><span class="name">消息提醒</span></li>'
					+'</ul>'
					+'<div id="start_menu_user">'
					+	'<div id="user_head">'
					+		'<div id="user_head_mask"></div>'
					+		'<div id="user_head_img"><img src="<%=head%>" width="46" height="46" /></div>'
					+	'</div>'
					+	'<ul id="user_info">'
					+		'<li><p>用户姓名：<span id="user_name"><%=name%></span></p></li>'
					+		'<li><p>用户权限：<span id="user_stat"><%=stat%></span></p></li>'
					+		'<li><p>个性签名：</p></li>'
					+		'<li><p id="user_sign"><%=sing%><br><span class="editor"> 编辑 </span></p></li>'
					+	'</ul>'
					+'</div>'
					+'</div>'
					+'<div id="start_menu_d"></div>'
					+'</div><span id="start_menu_btn"></span>'		
);
var showTimeTemp	= template(
	'<p id="taskbar_right">'+
		'<span id="taskbar_msg_img"></span>'+
		'<span id="taskbar_show_time">loading......</span>'+
	'</p>'
)
//任务栏
var taskbarTemp		= template(
		'<li class="taskbtn" rel="<%=rel%>">'+
		'<div class="icon" >'+
		'<img src="<%=img%>" width="20" height="20" />'+
		'</div>'+
		'<span class="name"><%=name%></span>'+
		'</li>'
);
//弹出dialog
var dialogTemp		= template(
'<div class="dialog" id="<%=id%>" style="z-index:<%=zindex%>">'
+	'<div class="dialogHeader <%if (drag) {%> drag <%}%>">'
+    	'<div class="dialogHeader_l">'
+            '<div class="dialogHeader_r">'     	
+                '<div class="dialogHeader_c">'
+                    '<h4 class="dialog_title"><%=title%></h4>'
+					 '<%if (close) {%><span class="dialog_close"></span><%}%>'
+                '</div>'
+            '</div>'
+        '</div>'
+    '</div>'
+    '<div class="dialogContent">'
+    	'<div class="dialogContent_l">'
+            '<div class="dialogContent_r">'
+                '<div class="dialogContent_c">'
+                    '<table class="table_dialog">'
+                        '<tbody><tr>'
+								 '<td class="dialog_icon"<%if (msgtype == NULL) {%>style="display:none;"<%}%>><div class="dialog_tags <%=msgtype%>" ></div></td>'
+                                '<td class="dialog_text" style="padding:<%=padding%>;"><%=msg%></td>'
+                            '</tr>'
+                            '<tr>'
+                                '<td colspan="2" class="dialog_btn_body">'
+                                    '<%if(cancelValue != NULL){%>'
+									 '<span class="dialog_btn" rel="cancel"><%=cancelValue%></span><%}%>'
+                                    '<span class="dialog_btn" rel="ok"><%=okValue%></span>'
+                                    '<div class="clear"></div>'
+                                '</td>'
+                        '</tr></tbody>'
+                    '</table>'
+                '</div>'
+            '</div>'
+        '</div>'	
+    '</div>'
+    '<div class="dialogFooter">'
+		'<div class="dialogFooter_l">'
+            '<div class="dialogFooter_r">'
+                '<div class="dialogFooter_c"></div>'
+            '</div>'
+        '</div>'
+    '</div>'
+'</div>'		
);
//添加文件夹
var addnewfloderTemp= template('');
//添加应用
var addnewfillTemp	= template('');
