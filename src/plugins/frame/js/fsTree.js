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
 * tree工具
 * @author: fallsea
 * @version 2.3.1
 */
layui.define(['layer',"fsCommon",'fsConfig'], function(exports){
	var layer = layui.layer,
	fsCommon = layui.fsCommon,
	fsConfig = layui.fsConfig,
	statusName = $.result(fsConfig,"global.result.statusName","errorNo"),
	msgName = $.result(fsConfig,"global.result.msgName","errorInfo"),
	successNo = $.result(fsConfig,"global.result.successNo","0"),
	dataName = $.result(fsConfig,"global.result.dataName","results.data"),
	FsTree = function (){
		this.config = {
			funcNo : undefined,//功能号
			url : undefined,//请求url地址
			id:"",
			isRoot:true,//是否显示更目录，默认显示
			clickCallback : undefined  //点击回掉函数
		}
	};


	/**
	 * 渲染tree
	 */
	FsTree.prototype.render = function(options){
		var _this = this;

    $.extend(true, _this.config, options);

    if($.isEmpty(_this.config.id)){
    	fsCommon.warnMsg("id不能为空!");
			return;
    }

    var domTree = $("#"+_this.config.id);

		_this.config.treeName = domTree.attr("treeName");
		_this.config.treeIdKey = domTree.attr("treeIdKey");
		_this.config.treePIdKey = domTree.attr("treePIdKey");
		_this.config.checkType = domTree.attr("checkType");
		_this.config.isDrag = domTree.attr("isDrag");//是否拖拽


    _this.queryTree();

    _this.rightMenu();

    return _this;
	};

	/**
	 * 右键菜单
	 */
	FsTree.prototype.rightMenu = function(){

		var _this = this;

		var _treeId = _this.config.id;

		//查询菜单列表

		var treeDom = $("#"+_treeId);

		var fsTreeRightMenu = treeDom.next(".fsTreeRightMenu");

		if(fsTreeRightMenu.length == 0){
			return;
		}

		var _rightMenu = {};

		$.each(fsTreeRightMenu.children(),function(){

			var thisMenu = $(this);
			var uuid = $.uuid();

			thisMenu.attr("id",uuid);

			var obj = {};
			obj["name"] = thisMenu.attr("name");

			var icon2 = thisMenu.attr("icon");
			var icon = thisMenu.attr("icon");
			if(icon == "add"){
				icon = "fa-plus";
			}else if(icon == "refresh"){
				icon = "fa-refresh";
			}else if(icon == "edit"){
				icon = "fa-edit";
			}else if(icon == "del"){
				icon = "fa-trash";
			}
			obj["icon"] = icon;

			var disabled = thisMenu.attr("disabledType"); //禁用模式
			if(!$.isEmpty(disabled)){
				obj["disabled"] = function(){

					var disableds = disabled.split("|");
					for(var i=0;i<disableds.length;i++){

						if(disableds[i]=="parent"){ //父栏目禁用

							var tid = $(this).parent().attr("id");

			      	var zTree = $.fn.zTree.getZTreeObj(_treeId);
							var node = zTree.getNodeByTId(tid);
			      	if(null!=node && node["isParent"] ){//父栏目禁用
			      		return true;
			      	}
						}else if(disableds[i]=="rootNode"){

							var tid = $(this).parent().attr("id");
			      	var zTree = $.fn.zTree.getZTreeObj(_treeId);
							var node = zTree.getNodeByTId(tid);
			      	if(null!=node && node.level === 0){//根节点禁用
			      		return true;
			      	}
						}

					}
	      	return false;
	      };
			}

			_rightMenu[uuid] = obj;

		});

		var _getTree = _this.config.getTree;

		var _getForm = _this.config.getForm;

		var _treeIdKey = _this.config.treeIdKey;


  	$.contextMenu({
      selector: "#"+_treeId+" a",
      callback: function(key, options) {
      	var tid = $(this).parent().attr("id");

      	var _thisButton = $("#"+key);

      	//通过tid获取id值
      	var zTree = $.fn.zTree.getZTreeObj(_treeId);
      	var node21 = zTree.getNodeByTId(tid);
    		var idVal = null;
    		if(!$.isEmpty(node21)){
    			idVal = node21[_treeIdKey];
    		}
      	fsCommon.buttonCallback(_thisButton,_getTree,idVal,_getForm);
      },
      items: _rightMenu
  	});
	}

	//显示树
	FsTree.prototype.showTree = function(data) {
		var _this = this;
		var funcNo = _this.config.funcNo;

    var url = _this.config.url;//请求url

    var treeId = _this.config.id;

    if($.isEmpty(funcNo) && $.isEmpty(url)){
    	fsCommon.warnMsg("功能号或请求地址为空!");
			return;
		}
		if($.isEmpty(url)){
      url = "/servlet/" + funcNo;
    }
		var servletUrl = $.result(fsConfig,"global.servletUrl");
		if(!$.isEmpty(servletUrl)){
			url = servletUrl + url;
		}

		var checkType = _this.config.checkType;

		var setting = {
			view: {
				showLine: true
			},
			data: {
				key : {
					name : _this.config.treeName
				},
				simpleData: {
					enable: true,
					idKey: _this.config.treeIdKey,
					pIdKey: _this.config.treePIdKey,
					rootPId: 0
				}
			},
			edit:edit,
			callback: {
				onClick: _this.config.clickCallback,
				onAsyncSuccess : function(){
					//判断是否选中，如果有选择的值，那么默认选中根节点
					if("checkbox" == checkType || "radio" == checkType){
						var zTree = $.fn.zTree.getZTreeObj(treeId);
						var node = zTree.getNodeByParam(_this.config.treeIdKey, 0, null);
						if(null!=node){
							var checkedNode = zTree.getCheckedNodes(true);
							if(checkedNode.length>1 || (checkedNode.length==1 && checkedNode[0][_this.config.treeIdKey] !==0)){
								node.checked = true;
							}else{
								node.checked = false;
							}
							zTree.refresh();
						}
					}
				}
			}
		};

		if("checkbox" == checkType || "radio" == checkType){
			var check = {};
			check["enable"] = true;
			check["chkStyle"] = checkType;
			setting["check"] = check;
		}


		if(_this.config.isDrag == "1"){//允许拖拽
			var edit = {};

			edit["enable"] = true;
			edit["showRemoveBtn"] = false;
			edit["showRenameBtn"] = false;
			setting["edit"] = edit;

		}

		$.fn.zTree.init($("#"+treeId), setting,data);

		//回调处理
    if(!$.isEmpty(layui.fsCallback.tree[treeId])){
    	layui.fsCallback.tree[treeId](_this);
    }
	};


	//查询菜单树列表
	FsTree.prototype.queryTree = function(param) {
		var _this = this;
		var funcNo = _this.config.funcNo;
		var url = _this.config.url;//请求url

		if($.isEmpty(funcNo) && $.isEmpty(url)){
			fsCommon.warnMsg("功能号或请求地址为空!");
			return;
		}
		if($.isEmpty(url)){
			url = "/servlet/" + funcNo;
		}
		var treeId = _this.config.id;
		var domTree = $("#"+treeId);

		domTree.empty();

		var otherParam = {};//业务参数
		var inputs = domTree.attr("inputs");
	  if(!$.isEmpty(inputs)){

	  	//参数处理，如果有参数，自动带入条件
	  	 var urlParam = fsCommon.getUrlParam();
	  	 var paramObj = fsCommon.getParamByInputs(inputs,urlParam);
	  	 if(!$.isEmpty(paramObj)){
	  		 $.extend(otherParam,paramObj);
	  	 }
	  }
	  if(!$.isEmpty(param)){
	  	$.extend(otherParam,param);
	  }
	  //处理查询表单
		var defaultForm = domTree.attr("defaultForm");
		if(!$.isEmpty(defaultForm)){
			 var fromData = $("#"+defaultForm).getFormData(true);
			 $.extend(otherParam,fromData);
		}
		_this.config.otherParam = otherParam;

		if(domTree.attr("isLoad") === "0"){
			var array = new Array();
			if(domTree.attr("isRoot") !== "0"){//是否显示根目录
				var arr = {};
				arr["open"] = true;
				arr["isParent"] = true;
				arr["drag"] = false;
				arr[_this.config.treeName] = "根目录";
				arr[_this.config.treeIdKey] = 0;
				array.push(arr);
			}
			_this.showTree(array);
		}else{
			var method = domTree.attr("method");//请求方式
			fsCommon.invoke(url,otherParam,function(data)
			{
				if(data[statusName] == successNo)
				{
					var array = $.result(data,dataName);
					if(!$.isArray(array)){
						array = new Array();
					}
					if(domTree.attr("isRoot") !== "0"){//是否显示根目录
						var arr = {};
						arr["open"] = true;
						arr["isParent"] = true;
						arr["drag"] = false;
						arr[_this.config.treeName] = "根目录";
						arr[_this.config.treeIdKey] = 0;
						array.push(arr);
					}
					_this.showTree(array);
				}
				else
				{
					//提示错误消息
					fsCommon.warnMsg(data[msgName], {icon:0})
				}
			},false,method);
		}

	}

	/**
	 * 刷新节点,tid不为空，刷新当前tid节点数据，否则刷新全部数据
	 */
	FsTree.prototype.refresh = function(idVal) {
		var _this = this;
		var zTree = $.fn.zTree.getZTreeObj(_this.config.id),
		type = "refresh",
		silent = false;

		_this.queryTree();

		var domTree = $("#"+_this.config.id);
		if(domTree.attr("isRoot") !== "0"){//是否显示根目录
			node = zTree.getNodesByFilter(function (node) { return node.level == 0 }, true);
		}
		if(!$.isEmpty(idVal)){
			//选中刷新的菜单
			var node3 = zTree.getNodeByParam(_this.config.treeIdKey,idVal, null);
			zTree.selectNode(node3);//选中
			zTree.setting.callback.onClick(null, zTree.setting.treeId, node3);//调用事件
		}
	}

	/**
	 * 查询
	 */
	FsTree.prototype.query = function(param) {
		//处理查询表单
		var _this = this;
		//强制加载
		$("#"+_this.config.id).attr("isLoad","1");
		_this.queryTree(param);
	}

	/**
	 * 设置选中的值
	 */
	FsTree.prototype.setCheckData = function(idVal) {
		if(!$.isEmpty(idVal)){
			var _this = this;
			var zTree = $.fn.zTree.getZTreeObj(_this.config.id);
			//选中指定栏目
			var node3 = zTree.getNodeByParam(_this.config.treeIdKey,idVal, null);
			zTree.selectNode(node3);//选中
			zTree.setting.callback.onClick(null, zTree.setting.treeId, node3);//调用事件
		}

	};


	/**
	 * 获取选中的节点
	 */
	FsTree.prototype.getCheckData = function(idVal) {
		var _this = this;
		var zTree = $.fn.zTree.getZTreeObj(_this.config.id);
		if($.isEmpty(idVal)){

			//判断是否复选框选择
			var checkType = $("#"+_this.config.id).attr("checkType");
			if("checkbox" == checkType || "radio" == checkType){
				return zTree.getCheckedNodes(true);
			}else{
				return zTree.getSelectedNodes();
			}
		}
		var arr = new Array();
		arr.push(zTree.getNodeByParam(_this.config.treeIdKey,idVal, null));
		return arr;
	}

	var fsTree = new FsTree();
	exports("fsTree",fsTree);
});
