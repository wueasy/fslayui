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
 * 基础配置
 * @author: fallsea
 * @version 2.3.1
 */
layui.define([], function (exports) {

	var fsConfig = {};

	/**
	 * 错误码处理定义
	 */
	fsConfig["filters"] = {
		//配置统一未登录错误码处理
		"-999" : function(result) {
			//未登录，跳转登陆页
			top.window.location.href = fsConfig["global"]["loginUrl"];
		}
	};

	/**
	 * 项目中需要调用到的常量、变量这里配置
	 */
	fsConfig["global"] = {
		"servletUrl":"http://39.108.135.245:10100", //异步请求地址,本地工程可以不填
		"loginUrl" : "/login", //登录url
		"uploadUrl" : "http://39.108.135.245:10100/upload", //上传附件url
		"uploadHtmlUrl" : "/plugins/frame/views/file-upload.html", //上传附件html地址，默认/plugins/frame/views/upload.html
		"loadDataType":"1",//加载数据类型，1：使用缓存数据，0：实时查询，默认0  （编辑或查看是否取缓存数据）
		"datagridSubmitType":"1",//数据表格提交类型，1：原数据提交，2：增删改标签提交（fsType）， 默认1
		"notifyType" : "toastr",//提醒类型，默认layer，执行消息提示类型
		"tableHeight" : "full-125",//默认table高度，默认full-155
		"rsaKey":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDzlPObayOD1prtJloDYS2YCj/FXlN0PXnxiMjgHHBLWJ18KL58Q/SQCfx0aSFkU4nf5QAZeJDp+0ALzrtIk3Y4fUqSxoRTjOfheSM6e/HS66+97BOhw4iqxyYwoZDMAd4QSi+7sbhBWNYKnJFoWgjazvv1ZoUpzF5Wnh6n+WhPTQIDAQAB",
		"result" : { //响应结果配置
	    "statusName": "errorNo", //数据状态的字段名称，默认：errorNo
	    "msgName": "errorInfo", //状态信息的字段名称，默认：errorInfo
	    "successNo" : "0", //执行成功错误码统一配置
	    "dataName" : "results.data", //非表格数据的字段名称，默认：results.data
	    "file" : { //文件配置
	    	"filePath" : "filePath",  //返回文件路径属性
				"fileName" : "fileName"  //返回文件名称属性
	    }
		},
		"page" : { //分页配置
			"sortType":"0",//默认排序方式，0：本地排序，1：异步排序，不配置默认为0
			"request": {//请求配置
				"pageName": "pageNum", //页码的参数名称，默认：pageNum
				"limitName": "pageSize" //每页数据量的参数名，默认：pageSize
			},
			"response": {//响应配置
				"countName": "results.data.total", //数据总数的字段名称，默认：results.data.total
				"dataName" : "results.data", //数据列表的字段名称，默认：results.data
				"dataNamePage": "results.data.list" //分页数据列表的字段名称，默认：results.data.list
			}//,
//			"limit":10,//每页分页数量。默认20
//			"limits":[10,20,30,50,100]//每页数据选择项，默认[10,20,30,50,100]
		}
	};

	/**
	 * 拓展form表单验证规则
	 */
	fsConfig["verify"] = {
		/**
		 * 对比两个值相等
		 */
		"equals": function(value, item){ //value：表单的值、item：表单的DOM对象
	    var equalsId = $(item).attr("equalsId");
	    if($.isEmpty(equalsId)){
        return '未配置对比id';
	    }
	    var value2 = $("#"+equalsId).val();

	    if(value!==value2)
	    {
        var equalsMsg = $(item).attr("equalsMsg");
        if($.isEmpty(equalsMsg))
        {
        	equalsMsg = "值不相等";
        }
        return equalsMsg;
	    }
		},
		/**
		 * 用户名验证
		 */
		"username": [
			/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){2,19}$/,
			'用户名格式不正确!'
		],
		/**
		 * 最小、最大长度判断
		 */
		"length": function(value, item){ //value：表单的值、item：表单的DOM对象
	    var minLength = $(item).attr("minLength");//最小长度
	    var maxLength = $(item).attr("maxLength");//最大长度
	    if(!$.isEmpty(minLength) && '0' !== minLength && parseInt(minLength)>value.length){
	    	return "输入内容小于最小值:"+minLength;
	    }
	    if(!$.isEmpty(maxLength) && '0' !== maxLength && value.length>parseInt(maxLength)){
	    	return "输入内容大于最小值:"+maxLength;
	    }
		}
	};

	/**
	 * 菜单配置
	 */
	fsConfig["menuConfig"] = {
		dataType : "local" , //获取数据方式，local本地获取，server 服务端获取
		loadUrl : "", //加载数据地址
		method : "post",//请求类型，默认post
		rootMenuId : "0", //根目录菜单id
		defaultSelectTopMenuId : "1", //默认选中头部菜单id
		defaultSelectLeftMenuId : "111", //默认选中左边菜单id
		menuIdField : "menuId", //菜单id
		menuNameField : "menuName", //菜单名称
		menuIconField : "menuIcon" , //菜单图标，图标必须用css
		menuHrefField : "menuHref" , //菜单链接
		parentMenuIdField : "parentMenuId" ,//父菜单id
		data : [
			{"menuId":"11","menuName":"案例","menuIcon":"fa-table","menuHref":"","parentMenuId":0},
			{"menuId":"13","menuName":"组件","menuIcon":"layui-icon layui-icon-template-1","menuHref":"","parentMenuId":0},
			{"menuId":"12","menuName":"其他页面","menuIcon":"layui-icon layui-icon-component","menuHref":"","parentMenuId":0},
			{"menuId":"changelog","menuName":"版本记录","menuIcon":"&#xe68e;","menuHref":"views/changelog/index.html","parentMenuId":"11"},
			{"menuId":"datagrid","menuName":"数据表格","menuIcon":"fa-list","menuHref":"views/datagrid/index.html","parentMenuId":"11"},
			{"menuId":"datagrid2","menuName":"数据表格2","menuIcon":"fa-list","menuHref":"views/datagrid2/index.html","parentMenuId":"11"},
			{"menuId":"treeDatagrid","menuName":"树+表格","menuIcon":"fa-list","menuHref":"views/treeDatagrid/index.html","parentMenuId":"11"},
			{"menuId":"multiDatagrid","menuName":"多数据表格","menuIcon":"fa-list","menuHref":"views/multiDatagrid/index.html","parentMenuId":"11"},
			{"menuId":"complexDatagrid","menuName":"复杂数据表格","menuIcon":"fa-list","menuHref":"views/complexDatagrid/index.html","parentMenuId":"11"},
			{"menuId":"linkageDatagrid","menuName":"联动数据表格","menuIcon":"fa-list","menuHref":"views/linkageDatagrid/index.html","parentMenuId":"11"},
			{"menuId":"linkageDatagrid2","menuName":"联动数据表格(复杂)","menuIcon":"fa-list","menuHref":"views/linkageDatagrid2/index.html","parentMenuId":"11"},
			{"menuId":"staticDatagrid","menuName":"表格数据提交","menuIcon":"fa-list","menuHref":"views/staticDatagrid/index.html","parentMenuId":"11"},
			{"menuId":"121","menuName":"404","menuIcon":"<i class=\"layui-icon\">&#xe61c;</i>","menuHref":"404.html","parentMenuId":"12"},
			{"menuId":"122","menuName":"204","menuIcon":"<i class=\"layui-icon\">&#xe61c;</i>","menuHref":"204.html","parentMenuId":"12"},
			{"menuId":"123","menuName":"500","menuIcon":"<i class=\"layui-icon\">&#xe61c;</i>","menuHref":"500.html","parentMenuId":"12"},
			{"menuId":"124","menuName":"501","menuIcon":"<i class=\"layui-icon\">&#xe61c;</i>","menuHref":"501.html","parentMenuId":"12"},
			{"menuId":"125","menuName":"503","menuIcon":"<i class=\"layui-icon\">&#xe61c;</i>","menuHref":"503.html","parentMenuId":"12"},
			{"menuId":"126","menuName":"登录","menuIcon":"","menuHref":"login.html","parentMenuId":"12"},
			{"menuId":"127","menuName":"登录2","menuIcon":"","menuHref":"login2.html","parentMenuId":"12"},
			{"menuId":"date","menuName":"日期时间","menuIcon":"","menuHref":"views/component/date.html","parentMenuId":"13"},
			{"menuId":"tinymce","menuName":"富文本编辑器","menuIcon":"","menuHref":"views/component/tinymce.html","parentMenuId":"13"},
			{"menuId":"dict","menuName":"动态字典","menuIcon":"","menuHref":"views/component/dict.html","parentMenuId":"13"},
			{"menuId":"file","menuName":"附件上传","menuIcon":"","menuHref":"views/component/file.html","parentMenuId":"13"},
			{"menuId":"form","menuName":"表单回调","menuIcon":"","menuHref":"views/component/form.html","parentMenuId":"13"},
			{"menuId":"test1","menuName":"三级菜单演示","menuIcon":"layui-icon layui-icon-engine","menuHref":"","parentMenuId":0},
			{"menuId":"test11","menuName":"后台模版","menuIcon":"","menuHref":"","parentMenuId":"test1"},
			{"menuId":"test12","menuName":"测试12","menuIcon":"","menuHref":"views/component/dict.html","parentMenuId":"test1"},
			{"menuId":"test111","menuName":"组件一","menuIcon":"","menuHref":"views/component/dict.html","parentMenuId":"test11"},
			{"menuId":"test112","menuName":"组件二","menuIcon":"","menuHref":"views/component/dict.html","parentMenuId":"test11"},
			{"menuId":"test113","menuName":"组件三","menuIcon":"","menuHref":"views/component/dict.html","parentMenuId":"test11"},
			{"menuId":"wx1","menuName":"无限级菜单测试","menuIcon":"layui-icon layui-icon-chart","menuHref":"","parentMenuId":0},
			{"menuId":"wx11","menuName":"二级1","menuIcon":"","menuHref":"","parentMenuId":"wx1"},
			{"menuId":"wx12","menuName":"二级2","menuIcon":"","menuHref":"views/component/dict.html","parentMenuId":"wx1"},
			{"menuId":"wx111","menuName":"三级1","menuIcon":"","menuHref":"views/component/dict.html","parentMenuId":"wx11"},
			{"menuId":"wx112","menuName":"三级2","menuIcon":"","menuHref":"views/component/dict.html","parentMenuId":"wx11"},
			{"menuId":"wx1111","menuName":"四级1","menuIcon":"","menuHref":"views/component/dict.html","parentMenuId":"wx111"},
			{"menuId":"wx1112","menuName":"四级2","menuIcon":"","menuHref":"views/component/dict.html","parentMenuId":"wx111"}
	 ] //本地数据
 };

	exports('fsConfig', fsConfig);
});
