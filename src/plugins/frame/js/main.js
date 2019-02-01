/*
 * fsLayui - A Front-end Rapid Development Framework.
 * Copyright (C) 2017-2019 wueasy.com

 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.

 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
/**
 * 主页面
 * @author: fallsea
 * @version 2.2.1
 */
layui.use(['fsMenu','layer','fsTab','fsCommon','fsConfig'], function(){
	var fsTab = layui.fsTab,
	fsConfig = layui.fsConfig,
	fsCommon = layui.fsCommon,
	statusName = $.result(fsConfig,"global.result.statusName","errorNo"),
  msgName = $.result(fsConfig,"global.result.msgName","errorInfo"),
	fsMenu = layui.fsMenu;

	fsMenu.render();

	//初始化显示菜单
	showMenu($("#fsTopMenu li.layui-this").attr("dataPid"),$("#fsTopMenu li.layui-this"));

	if (window.attachEvent) {
	  window.attachEvent("hashchange", hashChanged);
	} else if (window.addEventListener) {
		window.addEventListener("hashchange", hashChanged, false);
	}

	hashChanged();

	function hashChanged(){
		//获取路由信息
		var hash = window.location.hash;
		if(!$.isEmpty(hash) && hash.length>1){
			var menuId = hash.substring(1);
			//获取layId
			var dom = $('#fsLeftMenu a[menuId="'+ menuId +'"]').parent();
			if(dom.length>0){
				fsTab.add(dom);
				fsTab.menuSelectCss(dom.attr("lay-id"));
			}
		}
	}


	$("#fsTopMenu").on("click","li",function(){
		var dataPid = $(this).attr("dataPid");
		var elem = $(this).find("a");
		showMenu(dataPid,elem);
	});


	//显示菜单
	function showMenu(dataPid,elem){
		if(!$.isEmpty(dataPid)){
			$('#fsLeftMenu>li').hide();
			var dom = $('#fsLeftMenu>li[dataPid="'+ dataPid +'"]');
			if(dom.length>0){
				dom.show();

				//展示菜单
				if($(".fsSwitchMenu").find("i.fa-indent").length>0){
					$(".fsSwitchMenu").find("i").removeClass("fa-indent").addClass("fa-outdent");
					$(".layui-layout-admin").toggleClass("showMenu");
				}

				//默认选中第一个
				fsTab.add(dom.eq(0));
			}else{
				//隐藏菜单
				if($(".fsSwitchMenu").find("i.fa-outdent").length>0){
					$(".fsSwitchMenu").find("i").removeClass("fa-outdent").addClass("fa-indent");
					$(".layui-layout-admin").toggleClass("showMenu");
				}
	  		//如果地址不为空，打开地址
				if(!$.isEmpty(elem)){
					fsTab.add(elem);
				}
			}


		}
	}

	//渲染tab
	fsTab.render();

	//新增tab
	function addTab(elem){
		fsTab.add(elem);
	}

	//手机设备的简单适配
	var treeMobile = $('.site-tree-mobile'),
		shadeMobile = $('.site-mobile-shade')

	treeMobile.on('click', function(){
		$('body').addClass('site-mobile');
	});

	shadeMobile.on('click', function(){
		$('body').removeClass('site-mobile');
	});


	//菜单绑定

	$(".fsSwitchMenu").on("click",function(){
		if($(this).find("i.fa-outdent").length>0){
			$(this).find("i").removeClass("fa-outdent").addClass("fa-indent");
		}else{
			$(this).find("i").removeClass("fa-indent").addClass("fa-outdent");
		}
	 	$(".layui-layout-admin").toggleClass("showMenu");
	});


	/**
	 * 右边菜单
	 */
	$.contextMenu({
    selector: '.layui-tab-title li',
    callback: function(key, options) {
    	var layId = $(this).attr("lay-id");
    	switch (key) {
				case "close":
					fsTab.del(layId);
					break;
				case "closeOther":

					$(this).parent().children("li").each(function(i,e){

						if($(this).find(".layui-tab-close").is(":visible")){

							var newLayId = $(this).attr("lay-id");
							if(layId != newLayId ){
								fsTab.del(newLayId);
							}
						}
					});
					break;
				case "closeAll":

					$(this).parent().children("li").each(function(i,e){
						if($(this).find(".layui-tab-close").is(":visible")){
							var newLayId = $(this).attr("lay-id");
							fsTab.del(newLayId);
						}
					});
					break;
				default:
					break;
    	}
    },
    items: {
      "close": {name: "关闭标签",icon:"fa-close",disabled: function(){
      	if($(this).find(".layui-tab-close").is(":visible")){
      		return false;
      	}
      	return true;
      }},
      "closeOther": {name: "关闭其他",icon:"fa-ban"},
      "closeAll": {name: "关闭全部",icon:"fa-window-close"}
    }
	});

	//退出
	$('#logout').on('click', function () {
		fsCommon.confirm('退出登陆提示！', '你真的确定要退出系统吗？',function()
		{
			fsCommon.invoke("/logout",{},function(result){
				if(result[statusName] == "0"){
					top.window.location.href="/login";
				}else{
					//提示错误消息
					fsCommon.errorMsg(result[msgName]);
			  }
			});
		});
	});

	//修改密码
	$("#updatePwd").on("click",function(){
		fsCommon.updatePwd("修改密码");
	});


	//站点切换
	$("#group_menu").on("click","dd",function(){
		var _this = $(this);
		$("#group_id_main").val(_this.attr("groupId"));
		$("#group_menu_html").html(_this.find("a").html());


		//清空历史菜单
		fsMenu.cleanMenu();

		//重新渲染菜单
		fsMenu.showMenu();

		//初始化显示菜单
		showMenu($("#fsTopMenu li.layui-this").attr("dataPid"));
	});


	$("#xiaoxi").on("click",function(){
		addTab($(this));
	});

	//个人中心
	$("#personal").on("click",function(){
		addTab($(this));
	});

	//默认出发点击事件
	$("#fsTopMenu li.layui-this").click();

});
