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
 * 菜单配置
 * @author: fallsea
 * @version 2.3.1
 */
layui.define(['element',"fsConfig","fsCommon"], function(exports){

	var element = layui.element,
	fsCommon = layui.fsCommon,
	fsConfig = layui.fsConfig,
	menuConfig = fsConfig.menuConfig;
	statusName = $.result(fsConfig,"global.result.statusName","errorNo"),
  msgName = $.result(fsConfig,"global.result.msgName","errorInfo"),
	successNo = $.result(fsConfig,"global.result.successNo","0"),
  dataName = $.result(fsConfig,"global.result.dataName","results.data"),
	FsMenu = function (){

	};

	FsMenu.prototype.render = function(){

		this.loadData();

		this.showMenu();
	};

	/**
	 * 加载数据
	 */
	FsMenu.prototype.loadData = function(){

		if(menuConfig.dataType == "server"){//服务端拉取数据

			var url = menuConfig.loadUrl;
			if($.isEmpty(url)){
				fsCommon.errorMsg("未配置请求地址！");
				return;
			}

			fsCommon.invoke(url,{},function(data){
  			if(data[statusName] == successNo)
  			{
  				menuConfig.data = $.result(data,dataName);
  			}
  			else
  			{
  				//提示错误消息
  				fsCommon.errorMsg(data[msgName]);
  			}
  		},false,menuConfig.method);

		}

	}


	/**
	 * 获取图标
	 */
	FsMenu.prototype.getIcon = function(menuIcon){
		if(!$.isEmpty(menuIcon)){
			if(menuIcon.indexOf("<i") == 0){
				return menuIcon;
			}else if (menuIcon.indexOf("&#") == 0){
				return '<i class="layui-icon">'+menuIcon+'</i>';
			}else if (menuIcon.indexOf("fa-") == 0){
				return '<i class="fa '+menuIcon+'"></i>';
			}else {
				return '<i class="'+menuIcon+'"></i>';
			}
		}
		return "";
	};

	/**
	 * 清空菜单
	 */
	FsMenu.prototype.cleanMenu = function(){
		$("#fsLeftMenu").html("");
	}

	/**
	* 处理左边导航数据
	*/
	FsMenu.prototype.handleLeftMenuData = function(children){
		var thisMenu = this;
		var content = "";
		if(!$.isEmpty(children)){

			content = '<dl class="layui-nav-child">';
			$.each(children,function(i,v){
				var menuRow3 = '<dd';
				if(!$.isEmpty(menuConfig.defaultSelectLeftMenuId) && menuConfig.defaultSelectLeftMenuId == v[menuConfig.menuIdField]){//默认选中处理
					menuRow3 += ' class="layui-this"';
				}
				menuRow3 += ' lay-id="'+v[menuConfig.menuIdField]+'"><a href="javascript:;" menuId="'+v[menuConfig.menuIdField]+'" dataUrl="'+ (!$.isEmpty(v["children"]) ? '' : v[menuConfig.menuHrefField]) +'">'+thisMenu.getIcon(v[menuConfig.menuIconField])+' <em>'+v[menuConfig.menuNameField]+'</em></a>';
				content += menuRow3;

				//多级处理
				content += thisMenu.handleLeftMenuData(v["children"]);
			});
			content += '</dl>';
			return content;
		}
		return content;
	}

	/**
	 * 显示菜单
	 */
	FsMenu.prototype.showMenu = function(){
		var thisMenu = this;
		var data = menuConfig.data;
		if(!$.isEmpty(data)){
			var _index = 0;
			//显示顶部一级菜单
			var fsLeftMenu = $("#fsLeftMenu");

			var rootMenuId = menuConfig.rootMenuId;
			if(!$.isEmpty(rootMenuId) && (typeof rootMenuId=='string') && $.startsWith(rootMenuId,"#")){
				rootMenuId = $(rootMenuId).val();
			}

			//转换树结构
			var menuTree = fsCommon.toTree(data,rootMenuId,menuConfig.menuIdField,menuConfig.parentMenuIdField);
			if(!$.isEmpty(menuTree)){
				//一级菜单处理，头部导航菜单
				$(menuTree).each(function(i1,v){
					var menuRow = '<li class="layui-nav-item';
					menuRow += '" lay-id="'+v[menuConfig.menuIdField]+'"><a href="javascript:;" menuId="'+v[menuConfig.menuIdField]+'" dataUrl="'+v[menuConfig.menuHrefField]+'">'+thisMenu.getIcon(v[menuConfig.menuIconField])+' <em>'+v[menuConfig.menuNameField]+'</em></a>';
					//fsTopMenuElem.append(topStr);

					//处理子集菜单
					var xcontent  = thisMenu.handleLeftMenuData(v["children"]);

					if(!$.isEmpty(xcontent)){
						menuRow += xcontent;
					}
					menuRow += '</li>';

					fsLeftMenu.append(menuRow);

				});

			}
		}
		element.render("nav");
	};

	var fsMenu = new FsMenu();
	exports("fsMenu",fsMenu);
});
