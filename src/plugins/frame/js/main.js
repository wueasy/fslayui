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
 * @version 2.3.1
 */
layui.use(['fsMenu','layer','fsTab','fsCommon','fsConfig','element'], function(){
	var fsTab = layui.fsTab,
	element = layui.element,
	layer = layui.layer,
	fsConfig = layui.fsConfig,
	fsCommon = layui.fsCommon,
	statusName = $.result(fsConfig,"global.result.statusName","errorNo"),
  msgName = $.result(fsConfig,"global.result.msgName","errorInfo"),
	fsMenu = layui.fsMenu;

	fsMenu.render();


	//渲染tab
	fsTab.render();

	var screen_size = {
        pc : [991, -1],
        pad : [768, 990],
        mobile : [0, 767]
    }

    var getDevice = function(){
        var width = $(window).width();
        for (var i in screen_size) {
            var sizes = screen_size[i],
                min = sizes[0],
                max = sizes[1];
            if(max == -1) max = width;
            if(min <= width && max >= width){
                return i;
            }
        }
        return null;
    }

    var isDevice = function(label){
        return getDevice() == label;
    }

    var isMobile = function(){
        return !isDevice('pc');
    }

		var slideSideBar = function() {
        var $slideSidebar = $('.slide-sidebar'),
            $pageContainer = $('.layui-body'),
            $mobileMask = $('.mobile-mask');

        var isFold = false;
        $slideSidebar.click(function(e){
            e.preventDefault();
            var $this = $(this), $icon = $this.find('i'),
                $admin = $('body').find('.layui-layout-admin');
            var toggleClass = isMobile() ? 'fold-side-bar-xs' : 'fold-side-bar';
            if($icon.hasClass('ai-menufold')){
                $icon.removeClass('ai-menufold').addClass('ai-menuunfold');
                $admin.addClass(toggleClass);
                isFold = true;
                if(isMobile()) {
									$mobileMask.show();
								}else{
									$mobileMask.hide();
								}
            }else{
                $icon.removeClass('ai-menuunfold').addClass('ai-menufold');
                $admin.removeClass(toggleClass);
                isFold = false;
                $mobileMask.hide();
            }
        });

        var tipIndex;
        // 菜单收起后的模块信息小提示
        $('#fsLeftMenu li > a').hover(function(){
            var $this = $(this);
            if(isFold) {
                tipIndex = layer.tips($this.find('em').text(),$this);
            }
        }, function(){
            if(isFold && tipIndex ){
                layer.close(tipIndex);
                tipIndex = null
            }
        })

        $mobileMask.click(function(){
            $slideSidebar.trigger('click');
        });

				//窗口大小变动时触发
				window.onresize = function(){
					var $admin = $('body').find('.layui-layout-admin');
					var $icon = $('.slide-sidebar').find('i');
					var toggleClass = isMobile() ? 'fold-side-bar-xs' : 'fold-side-bar';
					if(isMobile()){
						$admin.removeClass('fold-side-bar');
						$icon.removeClass('ai-menuunfold').addClass('ai-menufold');
					}
				}
    }
		slideSideBar();


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

});
