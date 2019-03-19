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
 * 菜单管理
 * @author: fallsea
 * @version 2.3.1
 */
layui.define(['element'], function(exports){
  var element = layui.element,
  FsTab = function (){
  	this.config = {
			leftMenuFilter:"fsLeftMenu",//左边菜单
      tabFilter:"fsTab"
		}
	};

	FsTab.prototype.render = function(options){
		var thisTab = this;
    $.extend(true, thisTab.config, options);

    thisTab.bindTabFilter();
    // thisTab.bindDeleteFilter();

    //绑定左边菜单点击。
    element.on('nav('+thisTab.config.leftMenuFilter+')', function(elem){
      if($(elem).is("a")){
          //判断下个节点是否存在子菜单，存在则推出
          if($(elem).next().filter(".layui-nav-child").length>0){
            return;
          }
          elem = $(elem).parent();
      }
    	thisTab.add(elem);
    });
	};

	/**
	 * 新增tab
	 */
	FsTab.prototype.add = function(elem,title,dataUrl) {

    if($(elem).is("a")){
        elem = $(elem).parent();
    }
		var thisTab = this;
		var layId = $(elem).attr("lay-id");
  	if($.isEmpty(layId)){
  		layId = $.uuid();
  	}
  	//判断导航栏是否存在
  	if($('#fsTabMenu>li[lay-id="'+layId+'"]').length==0){
  		$(elem).attr("lay-id",layId);
  		var dom =$(elem).find("a");
  		if($.isEmpty(title)){
  			title = $(elem).find("a").html();
  		}
  		if($.isEmpty(dataUrl)){
  			dataUrl = dom.attr("dataUrl");
  		}
  		if(!$.isEmpty(dataUrl)){
  			element.tabAdd(thisTab.config.tabFilter, {
  			  title: title
  			  ,content: '<iframe src="'+dom.attr("dataUrl")+'"></iframe>' //支持传入html
  			  ,id: layId
  			});
  		}
  	}
  	thisTab.tabChange(layId);
	};

	FsTab.prototype.addProperty = function(elem) {

	};


	/**
	 * 切换tab
	 */
	FsTab.prototype.tabChange = function(layId) {
		element.tabChange(this.config.tabFilter, layId);
	}

	/**
	 * 删除
	 */
	FsTab.prototype.del = function(layId) {
		element.tabDelete(this.config.tabFilter, layId);
	};


	/**
   * 删除监听
   */
	FsTab.prototype.bindDeleteFilter = function(){
		element.on('tabDelete('+this.config.tabFilter+')', function(data){
	  	// var layId = $(this).parentsUntil().attr("lay-id");
	  	// $('#fsLeftMenu .layui-nav-child>dd[lay-id="'+ layId +'"],#fsLeftMenu>li[lay-id="'+ layId +'"]').removeAttr("lay-id");
		});
	}

	/**
	 * 监听tab切换，处理菜单选中
	 */
	FsTab.prototype.bindTabFilter = function(){
		var thisTab = this;
		element.on('tab('+this.config.tabFilter+')', function(data){
			var layId = $(this).attr("lay-id");

			thisTab.menuSelectCss(layId);

		});
	}

	/**
	 * 菜单选中样式
	 */
	FsTab.prototype.menuSelectCss = function(layId){
    $('#fsLeftMenu .layui-this').removeClass('layui-this');
		if(!$.isEmpty(layId)){

      $('#fsLeftMenu .layui-nav-child>dd[lay-id="'+ layId +'"],#fsLeftMenu>li[lay-id="'+ layId +'"]').addClass('layui-this');

		}
	}


	var fsTab = new FsTab();
  //绑定按钮
	exports("fsTab",fsTab);

});
