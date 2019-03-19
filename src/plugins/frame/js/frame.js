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
 * 通用框架
 * @author: fallsea
 * @version 2.3.1
 */
layui.use(['fsForm','fsDatagrid','fsTree','fsCommon','element'], function(){
	var fsForm = layui.fsForm,
	fsDatagrid = layui.fsDatagrid,
	fsTree = layui.fsTree,
	element = layui.element;
	fsCommon = layui.fsCommon;

	/********* form 表单处理   start *************/
	var formDoms =$("form");
	var forms = {};

	if(formDoms.length>0){//如果没有查到form，自动关闭
    $(formDoms).each(function (index, domEle) {
    	var formId=$(this).attr("id");
    	var form = fsForm.render({elem:$(this),getTree:getTree});
    	if(formDoms.length==1){
    		forms[formId] = form;
      }else{
      	//深度拷贝对象
      	forms[formId] = $.extend(true,{},form);
      }
    });
	}

	function getForm(formId){
    if($.isEmpty(formId)){
    	fsCommon.warnMsg("未配置formId！");
      return;
    }
    return forms[formId];
  }
	/********* form 表单处理   end *************/


	/********* tree 处理   start *************/

	var trees = {};

	var treeDoms = $("ul.fsTree");
	if(treeDoms.length>0){
    $(treeDoms).each(function(i){
        var treeId=$(this).attr("id");
        var funcNo = $(this).attr("funcNo");
        var url = $(this).attr("url");

        var treeParam = {id:treeId,funcNo:funcNo,url:url,clickCallback:clickCallback,getTree:getTree};

        if($(this).attr("mode") == "right"){
        	treeParam["getForm"] = getForm;
        }

        var tree = fsTree.render(treeParam);
        if(treeDoms.length==1){
        	trees[treeId] = tree;
        }else{
        	//深度拷贝对象
        	trees[treeId] = $.extend(true,{},tree);
        }
      });
    //绑定按钮事件
    fsCommon.buttonEvent("tree",getTree);
	}

	function getTree(treeId){
    if($.isEmpty(trees)){
    	fsCommon.warnMsg("未配置tree！");
      return;
    }
    if($.isEmpty(treeId)){
      treeId = "treeDemo";
    }
    return trees[treeId];
  }

  /**
   * 树点击回调
   */
  function clickCallback(e,treeId, treeNode) {

  	var _this = $("#"+treeId);


  	//自定义回调
  	var _clickCallback = _this.attr("clickCallback");//自定义回调事件
  	if(!$.isEmpty(_clickCallback) && !$.isEmpty(layui.fsCallback.tree.click[_clickCallback])){
  		layui.fsCallback.tree.click[_clickCallback](_this,fsCommon,treeId,treeNode);
    }

    var clickCallbackIds = _this.attr("clickCallbackId");//点击回调id

    if($.isEmpty(clickCallbackIds)){
    	return;
    }

    var clickCallbackInputs = _this.attr("clickCallbackInputs");

    //clickCallbackType 回调类型，setValue：form表单赋值
  	var clickCallbackType = _this.attr("clickCallbackType");

    $.each(clickCallbackIds.split(','),function(i,clickCallbackId){

    	var dom = $("#"+clickCallbackId);

    	if(dom.length==0){
    		return;
    	}


      var param = {};
      if(!$.isEmpty(clickCallbackInputs))
      {
        //获取值存入form表单
        param = fsCommon.getParamByInputs(clickCallbackInputs,treeNode);
      }

      //只赋值表单
    	if(!$.isEmpty(clickCallbackType) && clickCallbackType == "setValue"){
    		if(dom[0].tagName == "FORM"){
    			dom.setFormData(param,false);
    		}
    		return ;
    	}

    	var defaultForm = dom.attr("defaultForm");
      if($.isEmpty(defaultForm)){
        defaultForm = "query_form";
      }

    	 if(!$.isEmpty(clickCallbackInputs))
       {
         if($("#"+defaultForm).length>0 && dom[0].tagName != "FORM"){
         	$("#"+defaultForm).setFormData(param);
         }
       }

    	if(dom.filter(".fsDatagrid").length == 1){//数据表格

        if(!$.isEmpty(datagrids) && !$.isEmpty(datagrids[clickCallbackId])){
          datagrids[clickCallbackId].query($("#"+defaultForm).getFormData());
        }

    	}else if(dom.filter(".fsTree").length == 1){//树操作

    		if(!$.isEmpty(trees) && !$.isEmpty(trees[clickCallbackId])){
    			trees[clickCallbackId].query($("#"+defaultForm).getFormData());
        }
    	}else if(dom[0].tagName == "FORM"){

    		//点击回调处理，是否需要加载数据
    		var disabled = _this.attr("clickCallDisabledType");


    		var isLoadData = true;//是否加载数据

    		if(!$.isEmpty(disabled)){

					var disableds = disabled.split("|");
					for(var i=0;i<disableds.length;i++){

						if(disableds[i]=="parent"){ //父栏目禁用

							if(null!=treeNode && treeNode["isParent"]){//父栏目禁用
								isLoadData = false;
			      	}
						}else if(disableds[i]=="rootNode"){
							if(null!=treeNode && treeNode.level === 0){//根节点禁用
								isLoadData = false;
			      	}
						}

					}

  			}

    		if(isLoadData){
    			param["_mode"] = "readonly";
    			forms[clickCallbackId].loadFormData(param);
    		}else{
    			//重置表单
    			dom[0].reset();
    		}

    	}

    });

  }
  /********* tree 处理   end *************/


	/********* datagrid 处理   start *************/
  var tabs = $("table.fsDatagrid");
  var datagrids= {};//datagrid集合
  if(tabs.length > 0){
    $(tabs).each(function(){
      var tableId=$(this).attr("id");
      if(!$.isEmpty(datagrids[tableId])){
      	return;
      }
      var clickRenderTable = $(this).attr("clickRenderTable");//点击需要渲染的tableid
      var clickCallBack;//点击事件
  	  if(!$.isEmpty(clickRenderTable)){

  	  	var defaultForm= $("#"+clickRenderTable).attr("defaultForm");//默认form表单id

  	  	var clickRenderTableInputs = $(this).attr("clickRenderTableInputs");//点击需要传入的参数信息

  	  	clickCallBack = function(data,b){

  	  		if(!b){
  	  		  //获取参数
    	  		var formData = fsCommon.getParamByInputs(clickRenderTableInputs,data);

    	  		//点击后，为查询form表单赋值
    	  		if(!$.isEmpty(defaultForm)){
    	  			$("#"+defaultForm).setFormData(formData);
    	  		}
    	  		datagrids[clickRenderTable].reload(formData);
  	  		}
  	  		else{
  	  			//清空数据
  	  			datagrids[clickRenderTable].cleanData();
  	  		}


  	  	}
  	  }

  	  var datagrid = fsDatagrid.render({id:tableId,clickCallBack:clickCallBack,getDatagrid:getDatagrid});

      datagrid.bindDatagridTool(getDatagrid);

      if(tabs.length==1){
      	datagrids[tableId] = datagrid;
      }else{
      	//深度拷贝对象
      	datagrids[tableId] = $.extend(true,{},datagrid);
      }

    });
    fsCommon.buttonEvent("datagrid",getDatagrid);
  }else{
    //按钮绑定
  	fsCommon.buttonEvent("datagrid");
  }


  function getDatagrid(tableId){
    if($.isEmpty(tableId)){
      tableId = "fsDatagrid";
    }
    if($.isEmpty(datagrids)){
    	fsCommon.warnMsg("未配置datagrid！");
      return;
    }
    return datagrids[tableId];
  }
  /********* datagrid 处理   end *************/


  /******* 收缩处理 start ********/

  $(".fsShrink").on("click",function(){
  	if($(this).filter(".layui-icon-shrink-right").length==1){
  		$(this).removeClass("layui-icon-shrink-right").addClass("layui-icon-spread-left");

  		//改变当前窗口大小
  		var _this = $(this).parentsUntil(".layui-card").parent().parent();
  		var _oldClass = _this.attr("class");
  		_this.attr("class","layui-col-md12").attr("oldClass",_oldClass);

  		//隐藏上一个窗口

  		_this.prev().hide();

  	}else{
  		$(this).removeClass("layui-icon-spread-left").addClass("layui-icon-shrink-right");

     	//改变当前窗口大小
  		var _this = $(this).parentsUntil(".layui-card").parent().parent();
  		var _oldClass = _this.attr("oldClass");
  		_this.attr("class",_oldClass);

  		_this.prev().show();
  	}

  	//触发点击事件，用于刷新表格
  	var clickEventElem = $(this).attr("clickEventElem");
  	if(!$.isEmpty(clickEventElem)){
  		$(clickEventElem).click();
  	}

  });


  /******* 收缩处理 end ********/

});
