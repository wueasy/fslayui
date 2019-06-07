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
 * datagrid工具
 * @author: fallsea
 * @version 2.3.1
 */
layui.define(["fsCommon","table",'laypage','element','fsConfig','form','slider','rate','fsButtonCommon'], function(exports){
  var fsCommon = layui.fsCommon,
  table = layui.table,
  form = layui.form,
  laypage = layui.laypage,
  slider = layui.slider,
  element = layui.element,
  rate = layui.rate,
  fsConfig = layui.fsConfig,
  fsButton = layui.fsButtonCommon,
  statusName = $.result(fsConfig,"global.result.statusName","errorNo"),
  msgName = $.result(fsConfig,"global.result.msgName","errorInfo"),
  dataName = $.result(fsConfig,"global.result.dataName","results.data"),
  defaultLimit = $.result(fsConfig,"global.page.limit",20),//默认分页数量
  defaultLimits = $.result(fsConfig,"global.page.limits",[10,20,30,50,100]),//默认每页数据选择项
  loadDataType = $.result(fsConfig,"global.loadDataType","0"),
  successNo = $.result(fsConfig,"global.result.successNo","0"),
  tableHeight = $.result(fsConfig,"global.tableHeight","full-155"),
  datagridSubmitType = $.result(fsConfig,"global.datagridSubmitType","1"),
  previewUrl = $.result(fsConfig,"global.previewUrl"),
  rootUrl = $.result(fsConfig,"global.rootUrl"),
  servletUrl = $.result(fsConfig, "global.servletUrl");
  FsDatagrid = function (){
  };

  FsDatagrid.prototype.render = function(options,params){
  	this.config = {
      id:"",//form表单id
      elem:null,//form对象
      fsSortType : $.result(fsConfig,"global.page.sortType"),//排序方式，1 异步排序
      clickCallBack:null, //点击回调函数
      getDatagrid:null
    }

    var thisDatagrid = this;
    $.extend(true, thisDatagrid.config, options);

    if($.isEmpty(thisDatagrid.config.id)){
    	fsCommon.warnMsg("表格id不能为空!");
      return;
    }

    if(!$.isEmpty(thisDatagrid.config.id)){
      thisDatagrid.config.elem = $("#"+thisDatagrid.config.id);
    }

    thisDatagrid.loadDatagrid(params);


    return thisDatagrid;
  };

  //评分
  FsDatagrid.prototype.renderRate = function(){
    var thisDatagrid = this;
    $(thisDatagrid.config.elem).next().find(".fsRate").each(function(){
      //追加div
      var uuid = $.uuid();
      var _this = $(this);
      _this.after('<div id="'+uuid+'" class="fsRateDiv"></div>');

      var _length = _this.attr("length");
      var _value = _this.val();
      var _theme = _this.attr("theme");
      var _half = _this.attr("half");
      var _text = _this.attr("text");
      var _readonly = _this.attr("readonly");
      var _disabled = _this.attr("disabled");

      rate.render({
        elem: '#'+uuid  //绑定元素
        ,length : !$.isEmpty(_length)?parseInt(_length):5
        ,value : !$.isEmpty(_value)?parseInt(_value):0
        ,theme: !$.isEmpty(_theme)?_theme:'#FFB800'
        ,half: _half =="true"?true:false
        ,text: _text =="true"?true:false
        ,readonly: _readonly =="true" || _readonly=="readonly" || _disabled?true:false
        ,choose: function(value){
          _this.val(value);
        }
      });
    });
  };

  //渲染滑块
  FsDatagrid.prototype.renderSlider = function(){
    var thisDatagrid = this;
    $(thisDatagrid.config.elem).next().find(".fsSlider").each(function(){
      //追加div
      var uuid = $.uuid();
      var _this = $(this);
      _this.after('<div id="'+uuid+'"  style="position:relative;top: 15px;"></div>');

      var _type = _this.attr("type");
      var _min = _this.attr("min");
      var _max = _this.attr("max");
      var _range = _this.attr("range");
      var _value = _this.val();
      if(!$.isEmpty(_value)){
        var _values = _value.split(',');
        if(_values.length==1){
          _value = _values[0];
        }else{
          _value = _values;
        }
      }else{
        _value = 0;
      }
      var _step = _this.attr("step");
      var _showstep = _this.attr("showstep");
      var _tips = _this.attr("tips");
      var _input = _this.attr("input");
      var _height = _this.attr("height");
      var _disabled = _this.attr("disabled");
      var _theme = _this.attr("theme");

      var isTips = !$.isEmpty(_tips) && _tips !="false" && _tips !="true";
      slider.render({
        elem: '#'+uuid  //绑定元素
        ,type: !$.isEmpty(_type)?_type:null
        ,min: !$.isEmpty(_min)?parseInt(_min):0
        ,max: !$.isEmpty(_max)?parseInt(_max):100
        ,range: _range =="true"?true:false
        ,value: _value
        ,step: !$.isEmpty(_step)?parseInt(_step):1
        ,showstep: _showstep =="true"?true:false
        ,tips: _tips =="false"?false:true
        ,input: _input =="true"?true:false
        ,height: !$.isEmpty(_height)?parseInt(_height):200
        ,disabled: _disabled =="true" || _disabled =='disabled'?true:false
        ,theme: !$.isEmpty(_theme)?_theme:'#009688'
        ,setTips: function(value){ //自定义提示文本
          if(isTips){
            return value + _tips;
          }else{
            return value;
          }
        }
        ,change: function(value){
          if($.isArray(value)){
            _this.val(value);
          }else{
            if(isTips){
              _this.val(value.replace(_tips,""));
            }else{
              _this.val(value);
            }
          }

        }
      });
    });
  };

  /**
   * 加载datagrid
   */
  FsDatagrid.prototype.loadDatagrid = function(params){
	  var thisDatagrid = this;

	  var _table = $(thisDatagrid.config.elem);
	  var tableId = _table.attr("id");
	  if($.isEmpty(tableId)){
	  	fsCommon.errorMsg("表格id未配置!");
      return ;
	  }

	  if(tableId != _table.attr("lay-filter")){
	  	fsCommon.errorMsg("表格id和lay-filter不一致!");
      return ;
	  }

	  //判断模式
	  var urlParam = fsCommon.getUrlParam();
		var _mode = urlParam["_mode"];
		if(!$.isEmpty(_mode)){
			if("readonly" == _mode){//只读
				//设置只读
				_table.attr("isLoad","1");
				$("button.fsNew,button.fsEdit").hide();
			}else if("add" == _mode){//新增
				_table.attr("isLoad","0");
				$("button.fsEdit").hide();
				$("button:not(.fsEdit)").show();
			}else if("edit" == _mode){//编辑
				_table.attr("isLoad","1");
				$("button.fsAdd").hide();
				$("button:not(.fsAdd)").show();
			}
		}

	  //获取table属性
	  var defaultForm = _table.attr("defaultForm");//查询条件formid

	  if($.isEmpty(defaultForm)){
      defaultForm = "query_form";
	  }

	  //获取查询表单的参数
	  var formData = $("#"+defaultForm).getFormData(true);
	  if(!$.isEmpty(params)){
	  	$.extend(formData, params);
	  }

	  var inputs = _table.attr("inputs");//参数
	  if(!$.isEmpty(inputs)){
	  	var param = fsCommon.getParamByInputs(inputs,urlParam);
	  	$.extend(formData, param);
	  }

	  if(!$.isEmpty(_table.attr("sortType"))){
	  	thisDatagrid.config.fsSortType = _table.attr("sortType");
	  }

	  var funcNo = _table.attr("funcNo");//功能号

	  var isPage = _table.attr("isPage");//是否分页

	  var height = _table.attr("height");//高度
    var method = _table.attr("method");//请求方式
    if($.isEmpty(method)){
      method = "post";
    }
	  if($.isEmpty(height)){
      height = tableHeight;
	  }

	  var pageSize = _table.attr("pageSize");//每页数量
	  if($.isEmpty(pageSize)){
      pageSize = defaultLimit;
	  }

	  var url = _table.attr("url");//请求url
	  if($.isEmpty(url)){
      url = "/servlet/" + funcNo;
	  }
	  if(!$.isEmpty(servletUrl)){
      url = servletUrl + url;
	  }

    var defaultToolbar = _table.attr("defaultToolbar");
    if(!$.isEmpty(defaultToolbar)){
      defaultToolbar = defaultToolbar.split(',');
    }

    var isTotalRow = _table.attr("isTotalRow");
    if(isTotalRow==="1"){
      isTotalRow = true;
    }else{
      isTotalRow = false;
    }
	  var isLoad =  _table.attr("isLoad");//是否自动加载数据，1 :默认加载，0 ：不加载
	  if(isLoad != "0"){
	  	isLoad = "1";
	  }

    var title = _table.attr("title");

	  var datagridCols = _table.getDatagridCols();

	  var _cols = datagridCols["colsArr"];
    //点击行回调
    var _clickCallBack = thisDatagrid.config.clickCallBack;
    if(!$.isEmpty(_clickCallBack)){
      var _table = $(thisDatagrid.config.elem);
      var lay_filter = _table.attr("lay-filter");
      table.on('row('+lay_filter+')', function(obj){

      	//默认选中选择框
      	if($(obj.tr).find('input[lay-type="layTableRadio"]+').length==1){
      		//处理死循环问题
      		if($.getSessionStorage("fsSelected")=="1"){
      			$.removeSessionStorage("fsSelected");
      			return;
      		}
      		$.setSessionStorage("fsSelected","1");
      		$(obj.tr).find('input[lay-type="layTableRadio"]+').click();
      	}
//      	thisDatagrid.datagrid.select(obj.tr);
      	//点击行回调
        obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
        _clickCallBack(obj.data);
        });
    }

	  thisDatagrid.formatDataQuery(datagridCols["formatArr"]);

	  var _requestSuccessCallback = _table.attr("requestSuccessCallback");//请求成功回调函数

    var toolbar = _table.attr("toolbar");

	  //执行渲染
	  thisDatagrid.datagrid = table.render({
	    id:tableId,
	    elem: "#"+tableId, //指定原始表格元素选择器（推荐id选择器）
	    url:url,
	    fsSortType : thisDatagrid.config.fsSortType,
	    where : formData, //增加条件
	    page: isPage == "1",
      toolbar : toolbar,
      defaultToolbar: defaultToolbar,
      totalRow : isTotalRow,
	    method : method,
      title : $.isEmpty(title)?null:title,
//	    skin : 'row',
	    height: height, //容器高度
	    limits: defaultLimits,//每页数据选择项
	    limit: pageSize ,//默认采用50
	    cols:  _cols,
	    data: [],
	    isLoad : isLoad,
	    request: {
        pageName: $.result(fsConfig,"global.page.request.pageName","pageNum"), //页码的参数名称，默认：pageNum
        limitName: $.result(fsConfig,"global.page.request.limitName","pageSize") //每页数据量的参数名，默认：pageSize
	    },
	    response: {
	      statusName: statusName //数据状态的字段名称，默认：errorNo
	      ,statusCode: successNo //成功的状态码，默认：0
	      ,msgName: msgName //状态信息的字段名称，默认：errorInfo
	      ,countName: $.result(fsConfig,"global.page.response.countName","results.data.total") //数据总数的字段名称，默认：results.data.total
	      ,dataName: isPage == "1" ? $.result(fsConfig,"global.page.response.dataNamePage","results.data.list") : $.result(fsConfig,"global.page.response.dataName","results.data") //数据列表的字段名称，默认：data
	    },
      done:function(res, curr, count){
        if(!$.isEmpty(_clickCallBack)){
        	if(_table.next().find(".layui-table-body tr").length==0){
        		//清空数据
        		_clickCallBack(null,true);
        	}else{
        		_table.next().find(".layui-table-body tr").first().click();
        	}
        }

        thisDatagrid.renderSlider();

        thisDatagrid.renderRate();

        element.render('progress');

        if(!$.isEmpty(_requestSuccessCallback)){
	        layui.fsRequestSuccessCallback[_requestSuccessCallback](res,thisDatagrid,fsCommon);
	      }
      }
	  });

	  if(thisDatagrid.config.fsSortType == "1"){
	  	table.on('sort('+tableId+')', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
	  		thisDatagrid.config.getDatagrid(tableId).sort(obj);
	  	});
	  }

  };

  /**
   * 格式化数据查询
   */
  FsDatagrid.prototype.formatDataQuery = function(formatArr){
  	if(!$.isEmpty(formatArr)){
  		$.each(formatArr,function(index,dict){

  			var elem = layui.fsDict[dict];

  			if($.isEmpty(elem)){
  				return false;
  			}

  			var formatType = elem["formatType"];//格式化类型

  			if(formatType == "server"){

  				var url = elem["loadUrl"];//请求url

          var method = elem["method"];

  				if(!$.isEmpty(url)){

  					var inputs =elem["inputs"];
  					var param = {};//参数
  					if(!$.isEmpty(inputs))
  					{
  						var inputArr = inputs.split(',');
  						$.each(inputArr,function(i,v) {
  							var paramArr = v.split(':',2);
  							if(!$.isEmpty(paramArr[0]))
  							{
  								param[paramArr[0]] = paramArr[1];
  							}
  						});

  					}

  					fsCommon.invoke(url,param,function(result){
  						if(result[statusName] == successNo)
  						{
  							var list = $.result(result,dataName);
  							elem["data"]=list;
  						}
  						else
  						{
  							//提示错误消息
  							fsCommon.errorMsg(result[msgName]);
  						}
  					},false,method);
  				}
  			}

  		});
  	}
  };

  /**
   * 刷新
   */
  FsDatagrid.prototype.refresh = function(){
    if(!$.isEmpty(this.datagrid)){
        this.datagrid.refresh();
    }
  };

  /**
   * 排序
   */
  FsDatagrid.prototype.sort = function(obj){
    if(!$.isEmpty(this.datagrid)){
        this.datagrid.sort(obj);
    }
  };


  /**
   * 选中的数据
   */
  FsDatagrid.prototype.getCheckData = function(){
    var tableId = this.config.id;
    return table.checkStatus(tableId).data;
  };

  /**
   * 查询
   */
  FsDatagrid.prototype.query = function(param){
    if(!$.isEmpty(this.datagrid)){
      this.datagrid.query(param);
    }
  };

  /**
   * 新增行
   */
  FsDatagrid.prototype.addRow = function(param){
    if(!$.isEmpty(this.datagrid)){
      this.datagrid.addRow(param);
    }
  };


  /**
   * 重新load
   */
  FsDatagrid.prototype.reload = function(param){
    if(!$.isEmpty(this.datagrid)){
  		var options = {where:param};
      this.datagrid.reload(options);
    }
  };

  /**
   * 清空数据
   */
  FsDatagrid.prototype.cleanData = function(){
    if(!$.isEmpty(this.datagrid)){
      this.datagrid.cleanData();
    }
  };

  /**
   * 刷新静态表格数据
   */
  FsDatagrid.prototype.refreshStatic = function(){
    if(!$.isEmpty(this.datagrid)){
      this.datagrid.refreshStatic();
    }
  };

  /**
   * 获取数据
   */
  FsDatagrid.prototype.getData = function(){
    if(!$.isEmpty(this.datagrid)){
    	if(datagridSubmitType == "2"){
    		var arr = new Array();
    		var data = this.datagrid.getData();
    		if(!$.isEmpty(data)){
    			$.each(data,function(i,row){
    				if($.isEmpty(row["fsType"])){
      				row["fsType"] = "edit";
      			}
    				arr.push(row);
    			});
    		}
    		if(!$.isEmpty(this.data)){
    			$.each(this.data,function(i,row){
    				arr.push(row);
    			});
    		}
    		return arr;
    	}
    	else{
    		return this.datagrid.getData();
    	}

    }
  };

  /**
   * 绑定工具条
   */
  FsDatagrid.prototype.bindDatagridTool = function(getDatagrid){
    var thisDatagrid = this;
    var _table = $(thisDatagrid.config.elem);
    var tableId = _table.attr("id");
    //监听工具条
    table.on("tool("+tableId+")", function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      var data = obj.data; //获得当前行数据
      var layEvent = obj.event; //获得 lay-event 对应的值
      var tr = obj.tr; //获得当前行 tr 的DOM对象

      var _this = $(this);
      var _method = _this.attr("method");
      var _requestSuccessCallback = _this.attr("requestSuccessCallback");//请求成功回调函数

      switch(layEvent){
      	case "submit" :
      		 //提交
        	function submitForm(){
        		var funcNo = _this.attr("funcNo");

            var url = _this.attr("url");//请求url

            if($.isEmpty(funcNo) && $.isEmpty(url)){
            	fsCommon.warnMsg("功能号或请求地址为空！");
              return;
            }

            if($.isEmpty(url)){
              url = "/servlet/" + funcNo;
            }

            //获取参数
            var inputs = _this.attr("inputs");
            var param = {};//参数
            if(!$.isEmpty(inputs)){
              param = fsCommon.getParamByInputs(inputs,data);
            }

            //请求数据
            fsCommon.invoke(url,param,function(data)
            {
              if(!$.isEmpty(_requestSuccessCallback)){
  			        layui.fsRequestSuccessCallback[_requestSuccessCallback](data,thisDatagrid,fsCommon);
  			        return;
  			      }
              if(data[statusName] == successNo)
              {
              	fsCommon.setRefreshTable("1");
              	if(!$.isEmpty(getDatagrid(tableId))){
              		 getDatagrid(tableId).refresh();
              	}
                fsCommon.successMsg('操作成功!');
              }
              else
              {
                //提示错误消息
              	fsCommon.errorMsg(data[msgName]);
              }
            },null,_method);
        	}


          if("1" == _this.attr("isConfirm"))
          {
            var confirmMsg = _this.attr("confirmMsg");
            if($.isEmpty(confirmMsg))
            {
              confirmMsg="是否确定操作选中的数据?";
            }

            fsCommon.confirm("提示", confirmMsg, function(index)
            {
              top.layer.close(index);
              submitForm();
            });
          }else{
          	submitForm();
          }
				  break;
      	case "top" :
      	case "topEditRow" :

      		 //打开新窗口
          var _url = _this.attr("topUrl");
          if($.isEmpty(_url))
          {
          	fsCommon.warnMsg("url地址为空！");
            return false;
          }

          var inputs = _this.attr("inputs");

          if(!$.isEmpty(inputs))
          {
            _url = fsCommon.getUrlByInputs(_url,inputs,data);
          }

          //处理数据缓存
          if(loadDataType == "1" || layEvent=="topEditRow"){
          	if(_url.indexOf('?') == -1)
    				{
    					_url +="?";
    				}else{
    					_url +="&";
    				}
          	var uuid = $.uuid();
          	_url += "_fsUuid="+uuid;
          	//缓存选中的数据
          	$.setSessionStorage(uuid,JSON.stringify(data));
          }

          //弹出的方式
          var _mode = _this.attr("topMode");
          if(!$.isEmpty(_mode)){
          	if(_url.indexOf('?') == -1)
    				{
    					_url +="?";
    				}else{
    					_url +="&";
    				}
          	_url += "_mode="+_mode;
          }
          var _title = _this.attr("topTitle");
          var _titleElem = _this.attr("titleElem");//自定义的标题内容
  				if(!$.isEmpty(_titleElem)){
  					var xx = $(_titleElem).html();
  					if(!$.isEmpty(xx)){
  						_title += xx;
  					}
  				}
          var _width = _this.attr("topWidth");
          var _height = _this.attr("topHeight");
          var isMaximize = _this.attr("isMaximize");

          fsCommon.open(_title,_width,_height,_url,function(){
          	if(fsCommon.isRefreshTable())
            {
          		if(layEvent=="topEditRow"){//缓存操作
          			//修改
          			var str = $.getSessionStorage("fsDataRow");
  							$.removeSessionStorage("fsDataRow");
  							if(!$.isEmpty(str)){
  								obj.update(JSON.parse(str));
  							}

          		}else{
          			if(!$.isEmpty(getDatagrid(tableId))){
          				getDatagrid(tableId).refresh();
          			}
          		}
            }
    			},isMaximize);

				  break;
      	case "delRow" :

      		function submit(){
      			var fsType = obj.data["fsType"];

	      		//删除前，记录删除的数据
	      		if(datagridSubmitType == "2" && ($.isEmpty(fsType) || fsType == "edit")){
	      			if($.isEmpty(thisDatagrid["data"])){
	      				thisDatagrid["data"] = new Array();
	      			}
	      			obj.data["fsType"] = "del";
	      			thisDatagrid["data"].push(obj.data);
	      		}
	      		//删除行
	      		obj.del();
	        	thisDatagrid.refreshStatic();
	      	}

	    		 if("1" == _this.attr("isConfirm"))
	         {
	           var confirmMsg = _this.attr("confirmMsg");
	           if($.isEmpty(confirmMsg))
	           {
	             confirmMsg="是否确定操作选中的数据?";
	           }

	           fsCommon.confirm("提示", confirmMsg, function(index)
	           {
	             top.layer.close(index);
	             submit();
	           });
	         }else{
	         	submit();
	         }

				  break;
      	case "download" ://下载附件
      		var url = _this.attr("url");
  				if (!$.isEmpty(servletUrl)) {
  					url = servletUrl + url;
  				}
  			  // 创建一个 form
  			  var form1 = document.createElement("form");
  			  // 添加到 body 中
  			  document.body.appendChild(form1);
  			  // form 的提交方式
  			  form1.method = "get";
  			  form1.target="_blank";
  			  // form 提交路径
  			  form1.action =url;
  			  // 对该 form 执行提交
  			  form1.submit();
  			  // 删除该 form
  			  document.body.removeChild(form1);
				  break;
      	case "preview" ://预览
      		var url = _this.attr("url");
      		if (!$.isEmpty(rootUrl)) {
  					url = rootUrl + url;
  				}
  				if (!$.isEmpty(servletUrl)) {
  					url = servletUrl + url;
  				}
  			  // 创建一个 form
  			  var form1 = document.createElement("form");
  			  // 添加到 body 中
  			  document.body.appendChild(form1);
  			  // 创建一个输入
  			  var input = document.createElement("input");
  			  // 设置相应参数
  			  input.type = "text";
  			  input.name = "url";
  			  input.value = url;
  			  // 将该输入框插入到 form 中
  			  form1.appendChild(input);
  			  // form 的提交方式
  			  form1.method = "get";
  			  form1.target="_blank";
  			  // form 提交路径
  			  form1.action =previewUrl;
  			  // 对该 form 执行提交
  			  form1.submit();
  			  // 删除该 form
  			  document.body.removeChild(form1);
				  break;
      	default:
      		if(!$.isEmpty(layEvent)){
      			try {
      				if(!$.isEmpty(fsButton[layEvent])){
      					//执行
        				fsButton[layEvent](_this,obj.data,getDatagrid(tableId),fsCommon,obj);
      				}else{
      					layui.fsButton[layEvent](_this,obj.data,getDatagrid(tableId),fsCommon,obj);
      				}
						} catch (e) {
							console.error(e);
						}
      		}

      		break;
      	;
      }
    });

  };

  var fsDatagrid = new FsDatagrid();
  exports("fsDatagrid",fsDatagrid);

});
