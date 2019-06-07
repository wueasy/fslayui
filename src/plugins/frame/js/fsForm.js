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
 * form表单工具
 * @author: fallsea
 * @version 2.3.1
 */
layui.define(['layer',"fsCommon","form",'laydate','slider','rate',"fsConfig"], function(exports){
  var layer = layui.layer,
  fsCommon = layui.fsCommon,
  laydate = layui.laydate,
  slider = layui.slider,
  rate = layui.rate;
  fsConfig = layui.fsConfig,
  form = layui.form,
  statusName = $.result(fsConfig,"global.result.statusName","errorNo"),
  msgName = $.result(fsConfig,"global.result.msgName","errorInfo"),
  dataName = $.result(fsConfig,"global.result.dataName","results.data"),
  successNo = $.result(fsConfig,"global.result.successNo","0"),
  loadDataType = $.result(fsConfig,"global.loadDataType","0"),
  filePath = $.result(fsConfig, "global.result.file.filePath", "filePath"),
  fileName = $.result(fsConfig, "global.result.file.fileName", "fileName");
  selectVals = {},//下拉框默认值
  FsForm = function (){
		this.config = {
			id:"",//form表单id
			elem:null,//form对象
			mode:null,//模型类型
			getTree:null
		}
	};

	FsForm.prototype.render = function(options){
		var thisForm = this;
    $.extend(true, thisForm.config, options);

    if($.isEmpty(thisForm.config.id) && $.isEmpty(thisForm.config.elem)){
    	fsCommon.warnMsg("form选择器不能为空!");
    	return;
    }

    if(!$.isEmpty(thisForm.config.id)){
      thisForm.config.elem = $("#"+thisForm.config.id);
    }

    thisForm.loadFormData();

    thisForm.renderDate();

    thisForm.renderEditor();


    thisForm.renderSlider();

    thisForm.renderRate();

    thisForm.bindButtonSubmit();


    var formId = thisForm.config.elem.attr("id");

    //回调处理
    if(!$.isEmpty(layui.fsCallback.form[formId])){
    	layui.fsCallback.form[formId](thisForm,fsCommon);
    }
    return thisForm;
	};

  //评分
  FsForm.prototype.renderRate = function(){
    var thisForm = this;
    $(thisForm.config.elem).find(".fsRate").each(function(){
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
  FsForm.prototype.renderSlider = function(){
    var thisForm = this;
    $(thisForm.config.elem).find(".fsSlider").each(function(){
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

	//渲染富文本编辑器
	FsForm.prototype.renderEditor = function(){

		 	var thisForm = this;
		 	var mode = thisForm.config.mode;
		 	//是否只读
		 	var isReadonly = false;
		  if(mode=="readonly"){
		  	isReadonly = true;//只读
		  }

		  $(thisForm.config.elem).find(".fsEditor").each(function(){

		  	var _height = $(this).attr("height");
		  	if($.isEmpty(_height)){
		  		_height = 100;
		  	}

		  	tinymce.init({
		  	  selector: "#"+$(this).attr("id"),
		  	  height: _height,
		  	  readonly: isReadonly?1:0,//只读
		  	  toolbar:isReadonly?false:null,//禁用工具栏
		  		language:'zh_CN',
			  	 plugins: [
			  	    "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak",
			  	    "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
			  	    "table contextmenu directionality emoticons template textcolor paste fullpage textcolor colorpicker textpattern"
			  	  ],
            fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
			  	  toolbar1: isReadonly?"":"bold italic underline forecolor backcolor strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
			  	  toolbar2: isReadonly?"":"undo redo | searchreplace | bullist numlist | outdent indent blockquote | link unlink anchor image media code | insertdatetime preview",
			  	  toolbar3: isReadonly?"":"table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak restoredraft",
			  	  menubar: false,
			  	  toolbar_items_size: 'small',
//			  	  images_upload_url: '/upload',
			  	  images_upload_handler: function (blobInfo, success, failure) {
			  	  	var xhr, formData;
			  	    xhr = new XMLHttpRequest();
			  	    xhr.withCredentials = false;
			  	    xhr.open('POST', $.result(fsConfig,"global.uploadUrl"));
			  	    xhr.onload = function() {

			  	      if (xhr.status != 200) {
			  	        failure('HTTP Error: ' + xhr.status);
			  	        return;
			  	      }
			  	      var result = JSON.parse(xhr.responseText);

			  	      if(result[statusName] != successNo){
			  	      	failure(result[msgName]);
			  	        return;
			  	      }

                //上传成功后，返回文件路径
          			var fileList = $.result(result,$.result(fsConfig,"global.result.dataName"));
                var fileObj = null;
    						if($.isArray(fileList) && fileList.length>0){//多文件
    							fileObj = fileList[0];
    						}else{//单文件
    							fileObj = fileList;
    						}

    						var uploadFilePath = fileObj[filePath];
    						var uploadFileName = fileObj[fileName];
			  	     success(uploadFilePath);
			  	    };
			  	    formData = new FormData();
			  	    formData.append('file', blobInfo.blob(), blobInfo.filename());
			  	    xhr.send(formData);
			  	  },video_upload_handler: function (blobInfo, success, failure) {
             alert();
           },

			  	  style_formats: [{
			  	    title: 'Bold text',
			  	    inline: 'b'
			  	  }, {
			  	    title: 'Red text',
			  	    inline: 'span',
			  	    styles: {
			  	      color: '#ff0000'
			  	    }
			  	  }, {
			  	    title: 'Red header',
			  	    block: 'h1',
			  	    styles: {
			  	      color: '#ff0000'
			  	    }
			  	  }, {
			  	    title: 'Example 1',
			  	    inline: 'span',
			  	    classes: 'example1'
			  	  }, {
			  	    title: 'Example 2',
			  	    inline: 'span',
			  	    classes: 'example2'
			  	  }, {
			  	    title: 'Table styles'
			  	  }, {
			  	    title: 'Table row 1',
			  	    selector: 'tr',
			  	    classes: 'tablerow1'
			  	  }],

			  	  templates: [{
			  	    title: 'Test template 1',
			  	    content: 'Test 1'
			  	  }, {
			  	    title: 'Test template 2',
			  	    content: 'Test 2'
			  	  }],

			  	  init_instance_callback: function () {
			  	    window.setTimeout(function() {
			  	      $("#div").show();
			  	     }, 1000);
			  	  }
			  });
			});

	};

	//渲染日期控件绑定
	FsForm.prototype.renderDate = function(){
    var thisForm = this;
		$(thisForm.config.elem).find("input.fsDate").each(function(){
		  var options = {};
		  var _this = $(this);
		  var dateRange = _this.attr("dateRange");//区间选择，1 是
		  var dateType = _this.attr("dateType");//控件选择类型
		  var dateFormat = _this.attr("dateFormat");//自定义格式
		  var dateMin = _this.attr("dateMin");//最大值
		  var dateMax = _this.attr("dateMax");//最小值

		  options["elem"] = this; //指定元素;
		  if(dateRange=="1"){
			  options["range"] = true;
		  }
		  if(!$.isEmpty(dateType)){
			  options["type"] = dateType;
		  }
		  if(!$.isEmpty(dateFormat)){
			  options["format"] = dateFormat;
		  }
		  var value = _this.val();//默认值
		  if(!$.isEmpty(value)){
			  options["value"] = value;
		  }
		  if(!$.isEmpty(dateMin)){
			  options["min"] = parseInt(dateMin);
		  }
		  if(!$.isEmpty(dateMax)){
			  options["max"] = parseInt(dateMax);
		  }

		  laydate.render(options);
	  });
	};

  /**
  * 渲染全部数据字典配置
  */
  FsForm.prototype.renderDictAll = function(b){
    var thisForm = this;
    //获取加载数据字典信息
    $(thisForm.config.elem).find(".fsDict,.fsSelect").each(function(){
	   	var _this = $(this);
      if(!b){
        if(_this.is('input')){//单选或者多选
          var type = _this.attr("type").toLowerCase();
          var dict = _this.attr("dict");
          if(!$.isEmpty(dict) && (type == "checkbox" || type == "radio")){
            thisForm.loadDictData(_this,false,null,type);
          }

        }
      }else{
        if(_this.is('input')){//单选或者多选
          var type = _this.attr("type").toLowerCase();
          var dict = _this.attr("dict");
          if(!$.isEmpty(dict) && (type == "checkbox" || type == "radio")){
            thisForm.loadDictData(_this,false,null,type);
          }

        }
      }

      if(_this.is('select')){
        thisForm.renderSelect(_this);
      }

	  });

  }

	/**
	 * 渲染全部下拉框
	 */
	FsForm.prototype.renderSelectAll = function(){
		var thisForm = this;

	  $(thisForm.config.elem).find("select.fsSelect").each(function(){
	   	var _this = $(this);
	   	thisForm.renderSelect(_this);
	  });
	};

	/**
	 * 渲染下拉框
	 */
	FsForm.prototype.renderSelect = function(_this,b,value){
		var thisForm = this;
   	thisForm.loadDictData(_this,b,value,"select");
   	//绑定选择器
   	var childrenSelectId = _this.attr("childrenSelectId");
   	var lay_filter = _this.attr("lay-filter");
   	if(!$.isEmpty(childrenSelectId) && !$.isEmpty(lay_filter)){
   		form.on('select('+lay_filter+')', function(data){
   			//如果选择项为空，清空所有的子选择项
   			thisForm.cleanSelectData(_this);
   			if(!$.isEmpty(data.value)){
   				thisForm.renderSelect($("#"+childrenSelectId),true,data.value);
   			}
   		});

   	}

   	form.render("select"); //更新全部
	};

	/**
	 * 清空下拉框
	 */
	FsForm.prototype.cleanSelectData =function(_this){
		var childrenSelectId = _this.attr("childrenSelectId");
		if($.isEmpty(childrenSelectId)){
			return;
		}
		var _childerThis = $("#"+childrenSelectId);
		if(_childerThis.length==0){
			return;
		}
		var addNull = _childerThis.attr("addNull");//是否显示空值，1 显示
		_childerThis.empty();//清空
    if(addNull == "1"){
    	_childerThis.append("<option></option>");
    }
    form.render("select"); //更新全部

    this.cleanSelectData(_childerThis);//递推处理子选择器
	};

	/**
	 * 加载数据
	 */
  	FsForm.prototype.loadDictData = function(_this,b,value,type){
		var thisForm = this;

		var addNull = _this.attr("addNull");//是否显示空值，1 显示
    var isLoad = _this.attr("isLoad");//是否自动加载，1 是
    if(type == "select"){
      _this.empty();//清空
      if(addNull == "1"){
      	_this.append("<option></option>");
      }
    }
    var dict = _this.attr("dict");
    if($.isEmpty(dict)){
    	return false;
    }

    var dictObj = layui.fsDict[dict];

    if($.isEmpty(dictObj)){
    	return false;
    }

    var labelField = dictObj["labelField"];
		var valueField = dictObj["valueField"];
    var method = dictObj["method"];
    var formatType = dictObj["formatType"];//格式化类型
    if(formatType == "server"){
    	var funcNo = dictObj["loadFuncNo"];
    	var url = dictObj["loadUrl"];//请求url
    	var inputs = dictObj["inputs"];
    	var param = {};//参数
    	if(!$.isEmpty(inputs))
    	{
    		var inputArr = inputs.split(',');
    		$.each(inputArr,function(i,v) {
    			var paramArr = v.split(':',2);
    			if(!$.isEmpty(paramArr[0]))
    			{
    				//获取参数值，如果值为空，获取选中行数据
    				var _vaule = paramArr[1];
    				if($.isEmpty(_vaule))
    				{
    					_vaule = value;
    				}else if($.startsWith(_vaule,"#")){
	            _vaule = $(_vaule).val();
	          }
    				param[paramArr[0]] = _vaule;
    			}
    		});

    	}
    	if($.isEmpty(url)){
    		url = "/servlet/" + funcNo;
    	}

    	if(!$.isEmpty(url) && (isLoad !="0" || b)){
    		fsCommon.invoke(url,param,function(data){
    			if(data[statusName] == successNo)
    			{
    				var list = $.result(data,dataName);
            thisForm.dictDataRender(_this,labelField,valueField,list,type);
    			}
    			else
    			{
    				//提示错误消息
    				fsCommon.errorMsg(data[msgName]);
    			}
    		},false,method);
    	}
    }else{

  		var list = dictObj["data"];
      thisForm.dictDataRender(_this,labelField,valueField,list,type);
    }

	};


  FsForm.prototype.dictDataRender = function(_this,labelField,valueField,list,type){
    var thisForm = this;
    if(type == "select"){
      thisForm.selectDataRender(_this,labelField,valueField,list);
    }else if(type == "checkbox"){
      thisForm.checkboxDataRender(_this,labelField,valueField,list);
    }else if(type == "radio"){
      thisForm.radioDataRender(_this,labelField,valueField,list);
    }
  }

  /**
	 * 复选框数据渲染
	 */
  FsForm.prototype.checkboxDataRender = function(_this,labelField,valueField,list){
    var thisForm = this;
    var name = _this.attr("name");
    var laySkin = _this.attr("lay-skin");
    var disabled = _this.attr("disabled");
		$(list).each(function(i,v){
			var checkbox="<input type=\"checkbox\" name=\""+name+"\" lay-skin=\""+laySkin+"\" title=\""+v[labelField]+"\" value=\""+v[valueField]+"\"";
      if(!$.isEmpty(disabled)){
        checkbox += " disabled=\"disabled\"";
      }
      checkbox += "/>";
			_this.parent().append(checkbox);
		});
    _this.next().remove();
    _this.remove();
    form.render("checkbox"); //更新全部
  }

  /**
	 *  单选框数据渲染
	 */
  FsForm.prototype.radioDataRender = function(_this,labelField,valueField,list){
    var thisForm = this;
    var name = _this.attr("name");
    var disabled = _this.attr("disabled");
		$(list).each(function(i,v){
			var radio="<input type=\"radio\" name=\""+name+"\" title=\""+v[labelField]+"\" value=\""+v[valueField]+"\"";
      if(!$.isEmpty(disabled)){
        radio += " disabled=\"disabled\"";
      }
      radio += "/>";
			_this.parent().append(radio);
		});
    _this.next().remove();
    _this.remove();
    form.render("checkbox"); //更新全部
  }

	/**
	 * select数据渲染
	 */
	FsForm.prototype.selectDataRender = function(_this,labelField,valueField,list){
		var thisForm = this;

		$(list).each(function(i,v){
			var option="<option value=\""+v[valueField]+"\">"+v[labelField]+"</option>";
			_this.append(option);
		});

		//默认值
		var defaultValue = selectVals[_this.attr("name")];
		if(!$.isEmpty(defaultValue)){
			_this.val(defaultValue);
			//如果有子联动，继续渲染
			var childrenSelectId = _this.attr("childrenSelectId");
			if(!$.isEmpty(childrenSelectId)){
				thisForm.renderSelect($("#"+childrenSelectId),true,defaultValue);
			}

		}
		form.render("select"); //更新全部
	};

	/**
	 * 自动填充form表单数据
	 */
	FsForm.prototype.loadFormData = function(param){
    var thisForm = this;
		//参数处理，如果有参数，自动填充form表单
		var urlParam = fsCommon.getUrlParam();

		if(!$.isEmpty(param)){
			urlParam = param;
		}

		var formDom = $(thisForm.config.elem);

		//判断模式
		var _mode = urlParam["_mode"];
		if(!$.isEmpty(_mode)){
			thisForm.config.mode =  _mode;
			delete urlParam["_mode"];

			//判断是否存在
			var _modeDom = formDom.find("input[name='_mode']");
			if(_modeDom.length == 0){
				formDom.append("<input type=\"hidden\" name=\"_mode\" value=\""+_mode+"\"/>");
			}else{
				_modeDom.val(_mode);
			}
			if("readonly" == _mode){//只读
				formDom.attr("isLoad","1");
				//隐藏所有的非关闭按钮
				formDom.find("button").each(function(i,e){
					var _function = $(e).attr("function");
					if("close" != _function){
						 $(e).hide();
					}else{
						$(e).show();
					}
				});
				//设置只读
				formDom.find("input").addClass("layui-disabled").attr("disabled","disabled");
				formDom.find("select,textarea").attr("disabled","disabled");
			}else if("add" == _mode){//新增

				formDom.attr("isLoad","0");

				//清空只读属性
				formDom.find("input").removeClass("layui-disabled").removeAttr("disabled");
				formDom.find("select,textarea").removeAttr("disabled");

				formDom.attr("isLoad","0");
				formDom.find("button.fsEdit").hide();
				formDom.find("button:not(.fsEdit)").show();
				//只读处理
				formDom.find("input.fsAddReadonly").addClass("layui-disabled").attr("disabled","disabled");
				formDom.find("select.fsAddReadonly,textarea.fsAddReadonly").attr("disabled","disabled");
			}else if("edit" == _mode){//编辑

				formDom.attr("isLoad","1");

				//清空只读属性
				formDom.find("input").removeClass("layui-disabled").removeAttr("disabled");
				formDom.find("select,textarea").removeAttr("disabled");

				formDom.attr("isLoad","1");
				formDom.find("button.fsAdd").hide();
				formDom.find("button:not(.fsAdd)").show();
				//只读处理
				formDom.find("input.fsEditReadonly").addClass("layui-disabled").attr("disabled","disabled");
				formDom.find("select.fsEditReadonly,textarea.fsEditReadonly").attr("disabled","disabled");
			}

		}

		if(!$.isEmpty(urlParam)){
			$(thisForm.config.elem).setFormData(urlParam);
		}

		//如果isLoad =1 并且功能号不为空，查询
		var _fsUuid = urlParam["_fsUuid"];
		if(!$.isEmpty(_fsUuid)){
			delete urlParam["_fsUuid"];
		}
		if(formDom.attr("isLoad") == "1")
		{
      //加载单选框和复选框
      thisForm.renderDictAll(false);

			//从缓存中获取
			if(/*loadDataType == "1" && */$.isEmpty(formDom.attr("loadFuncNo")) && $.isEmpty(formDom.attr("loadUrl"))){
				if(!$.isEmpty(_fsUuid)){
					var formDataStr =$.getSessionStorage(_fsUuid);
					if(!$.isEmpty(formDataStr)){
						showData(JSON.parse(formDataStr));
					}
				}
			}else if(!$.isEmpty(formDom.attr("loadFuncNo")) || !$.isEmpty(formDom.attr("loadUrl"))){
        var _method = formDom.attr("method");
				//如果配置异步地址，默认加载异步地址
				var funcNo = formDom.attr("loadFuncNo");
		    var url = formDom.attr("loadUrl");//请求url
	      if($.isEmpty(url)){
	        url = "/servlet/" + funcNo;
	      }
	      fsCommon.invoke(url,urlParam,function(data){
					if(data[statusName] == successNo)
			  	{
						var formData = $.result(data,dataName);
						showData(formData);
			  	}
			  	else
			  	{
			  		//提示错误消息
			  		fsCommon.errorMsg(data[msgName]);
			  	}
			  },false,_method);

			}

	  }else{
	  	thisForm.renderDictAll(true);
      //加载完数据字典后，重新设置表单值，解决新增无法赋值问题
      $(thisForm.config.elem).setFormData(urlParam);
	  }

		if(!$.isEmpty(_fsUuid)){
			//删除
			$.removeSessionStorage(_fsUuid);
		}

		//显示数据
		function showData(formData){
			if($.isEmpty(formData)){
				fsCommon.errorMsg("记录不存在!");
				return;
			}
			formDom.setFormData(formData);
			form.render(); //更新全部

			//联动下拉框处理，
			//1.先把联动下拉框数据缓存
			//2.异步加载完后，赋值
			$(thisForm.config.elem).find("select.fsSelect").each(function(){
				var _name = $(this).attr("name");
				selectVals[_name] = formData[_name];
			});

			$(thisForm.config.elem).find("select.fsSelect").each(function(){
				var selectDom = $(this);
				if(selectDom.attr("isLoad") != "0"){//一级下拉
					thisForm.renderSelect(selectDom);
				}
			});
		}

	};



	/**
	 * 绑定提交按钮
	 */
	FsForm.prototype.bindButtonSubmit = function(){
    var thisForm = this;
    var formElem = thisForm.config.elem;
    $(formElem).find("button").each(function(){
      var lay_filter = $(this).attr("lay-filter");
      /**监听新增提交*/
      form.on("submit("+lay_filter+")", function (data) {

      	var _thisButton = $(this);
      	if(lay_filter=="addRow"){//增加到行中，缓存中
      		$.setSessionStorage("fsDataRow",JSON.stringify(data.field));
      		fsCommon.setRefreshTable("1");

      	  //是否自动关闭，默认是
      		if(_thisButton.attr("isClose") != "0"){
      			parent.layer.close(parent.layer.getFrameIndex(window.name));
      		}
      		fsCommon.successMsg('操作成功!');

      	}else{
      		if("1" == _thisButton.attr("isVerifyPwd"))//是否验证密码
      		{
      			fsCommon.promptVerifyPwd(data.field,function(data2){
      				thisForm.submitForm(data2,_thisButton,formElem);
      			});
      		}
      		else
      		{
      			thisForm.submitForm(data.field,_thisButton,formElem);
      		}
      	}
        return false;
      });
    });
	}

	/**
	 * form表单格式验证
	 */
	if(!$.isEmpty(fsConfig["verify"])){
    form.verify(fsConfig["verify"]);
	}

	/**
	 * 获取ztree对象
	 */
	FsForm.prototype.getTree = function(treeId){
		var thisForm = this;
		return thisForm.config.getTree(treeId);
	}

  /**
   * 提交请求
   */
	FsForm.prototype.submitForm = function(param,_this,formElem){
		var thisForm = this;
    var url = _this.attr("url");//请求url
  	var funcNo = _this.attr("funcNo");
    var requestSuccessCallback = _this.attr("requestSuccessCallback");//请求成功回调函数
  	if($.isEmpty(funcNo) && $.isEmpty(url)){
  		fsCommon.warnMsg('功能号或请求地址为空!');
  		return;
  	}
  	if($.isEmpty(url)){
      url = "/servlet/" + funcNo;
    }

  	//处理的tinymce编辑器值
	  formElem.find(".fsEditor").each(function(i,v){
	  	param[$(this).attr("name")] = tinymce.editors[i].getBody().innerHTML;
	  });

  	//加密处理
  	formElem.find("input.fsCrypt").each(function(i,e){
  		var name = $(this).attr("name");
  		param[name] = fsCommon.encryptRsa(param[name]);
  	});


  	//新增前回调
  	var onBeforeCallback = _this.attr("onBeforeCallback");
  	if(!$.isEmpty(onBeforeCallback)){
  		layui.fsBeforeCallback.button[onBeforeCallback](_this,fsCommon,param);
    }


  	fsCommon.invoke(url,param,function(data)
		{
      if(!$.isEmpty(requestSuccessCallback)){
        layui.fsRequestSuccessCallback[requestSuccessCallback](data,formElem,fsCommon);
        return;
      }
    	if(data[statusName] == successNo)
    	{
    		fsCommon.setRefreshTable("1");

    		//是否自动关闭，默认是
    		if(_this.attr("isClose") != "0"){
    			parent.layer.close(parent.layer.getFrameIndex(window.name));
    		}

    		fsCommon.successMsg('操作成功!');

    		//判断是否需要刷新树 getTree

    		var treeId = _this.attr("treeId");//刷新tree的id

    		if(!$.isEmpty(treeId)){
    			//获取tid值，用于刷新tree后，默认选中
    			var _treeIdKey = _this.attr("treeIdKey");
    			var treeIdKeyVal = "";
    			if(!$.isEmpty(_treeIdKey)){
    				treeIdKeyVal = param[_treeIdKey];
    			}
    			thisForm.config.getTree(treeId).refresh(treeIdKeyVal);
    		}

    		//重置表单

    		if(_this.attr("isReset") == "1"){
    			formElem[0].reset();
    		}

    	}
    	else
    	{
    		//提示错误消息
    		fsCommon.errorMsg(data[msgName]);
    	}
		},false);
  };

  var fsForm = new FsForm();
    //绑定按钮
	exports("fsForm",fsForm);
});
