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
 * 通用组件
 * @author: fallsea
 * @version 2.3.1
 */
layui.define([ 'layer', 'form', 'fsConfig', 'fsButtonCommon' ], function(exports) {

	var form = layui.form,
		layer = layui.layer,
		fsConfig = layui.fsConfig,
		fsButtonCommon = layui.fsButtonCommon,
		statusName = $.result(fsConfig, "global.result.statusName", "errorNo"),
		msgName = $.result(fsConfig, "global.result.msgName", "errorInfo"),
		dataName = $.result(fsConfig, "global.result.dataName", "results.data"),
		loadDataType = $.result(fsConfig, "global.loadDataType", "0"),
		successNo = $.result(fsConfig, "global.result.successNo", "0"),
		notifyType = $.result(fsConfig, "global.notifyType", "layer"),
		rsaKey = $.result(fsConfig, "global.rsaKey"),
		servletUrl = $.result(fsConfig, "global.servletUrl"),
		filePath = $.result(fsConfig, "global.result.file.filePath", "filePath"),
		fileName = $.result(fsConfig, "global.result.file.fileName", "fileName");

	var fsCommon = {

		/**错误msg提示 */
		errorMsg : function(text,time) {
			if($.isEmpty(time)){
				time = 5000;
			}
			if (notifyType == "toastr") {
				top.toastr.error(text);
			} else {
				top.layer.msg(text, {
					icon : 2,
					time : time
				});
			}
		},
		/**成功 msg提示 */
		successMsg : function(text,time) {
			if($.isEmpty(time)){
				time = 5000;
			}
			if (notifyType == "toastr") {
				top.toastr.success(text);
			} else {
				top.layer.msg(text, {
					icon : 1,
					time : time
				});
			}
		},
		/**警告弹出提示*/
		warnMsg : function(text,time) {
			if($.isEmpty(time)){
				time = 5000;
			}
			if (notifyType == "toastr") {
				top.toastr.warning(text);
			} else {
				top.layer.msg(text, {
					icon : 0,
					time : time
				});
			}
		},
		confirm : function(title, text, callBackFunc) {
			top.layer.confirm(text, {
				title : title,
				resize : false,
				btn : [ '确定', '取消' ],
				btnAlign : 'c',
				anim : 1,
				icon : 3
			}, callBackFunc, function() {})

		},
		invokeServer : function(funcNo, param, callBackFunc, async, method) {
			var url = "/servlet/" + funcNo;
			fsCommon.invoke(url, param, callBackFunc, async, method);
		},
		invoke : function(url, param, callBackFunc, async, method) {
			if (!$.isEmpty(servletUrl)) {
				url = servletUrl + url;
			}
			if ($.isEmpty(async)) {
				async = true;
			}
			if ($.isEmpty(method)) {
				method = "post";
			}
			//打开加载层C
			var index = layer.load(0,{shade:[0.1,'#FAFBF']});
			$.ajax({
				url : url,
				type : method,
				async : async,
				data : param,
				dataType : "json",
				success : function(result) {
					if (result[statusName] != successNo) {
						var filters = fsConfig["filters"];
						if (!$.isEmpty(filters)) {
							var otherFunction = filters[result[statusName]];
							if ($.isFunction(otherFunction)) {
								otherFunction(result);
								return;
							}
						}
					}
					if($.isFunction(callBackFunc)){
						callBackFunc(result);
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					var status = XMLHttpRequest.status;
					if (status == 404) {
						fsCommon.errorMsg("请求地址出错!");
					} else if (status == 302) {
						fsCommon.errorMsg('连接网页出错!');
					} else if (textStatus == "timeout") {
						fsCommon.errorMsg("请求超时!");
					} else {
						fsCommon.errorMsg('请求异常!');
					}
				},
				complete : function(XMLHttpRequest, textStatus) {
					//关闭加载层
					layer.close(index);
				}
			});

		},
		//是否需要刷新table,true 需要
		isRefreshTable : function() {
			var refreshTable = top.$('meta[name="refreshTable"]').attr("content");
			if (refreshTable == "1") {
				//刷新后，清空
				top.$('meta[name="refreshTable"]').attr("content", "0");
				return true;
			}
			return false;
		},
		getUrlParam : function() {
			var param = window.location.search;
			var pattern = /([^?&=]+)=([^&#]*)/g;
			var dict = {};
			var search = null;
			if (typeof param === "object" && param instanceof Location) {
				search = param.search;
			} else if (typeof param === "string") {
				search = param;
			} else {
				throw new Error("参数类型非法！请传入window.loaction对象或者url字符串。");
			}
			search.replace(pattern, function(rs, $1, $2) {
				var key = decodeURIComponent($1);
				var value = decodeURIComponent($2);
				dict[key] = value;
				return rs;
			});
			return dict;
		},
		/**
		 * 设置刷新table状态，1 需要刷新
		 */
		setRefreshTable : function(state) {
			var refreshTable = top.$('meta[name="refreshTable"]');
			if (refreshTable.length == 0) {
				top.$('head').append("<meta name=\"refreshTable\" content=\"" + state + "\"/>");
			} else {
				refreshTable.attr("content", state);
			}
		},
		/**
		 * 更新form表单数据
		 */
		autofill : function(elem, data) {
			if (!$.isEmpty(elem) && !$.isEmpty(data)) {
				$(elem)[0].reset();
				$(elem).autofill(data);
				form.render(); //更新全部
			}
		},
		//弹出窗口
		open : function(_title, _width, _height, _url, _end, isMaximize) {
			if ($.isEmpty(_width)) {
				_width = "700px";
			}
			if ($.isEmpty(_height)) {
				_height = "400px";
			}
			if (parseInt(_width.replace(/[^0-9]/ig, "")) > $(window.top.document).width()) {
				_width = $(window.top.document).width() + "px";
			}
			if (parseInt(_height.replace(/[^0-9]/ig, "")) > $(window.top.document).height()) {
				_height = $(window.top.document).height() + "px";
			}

			var index = top.layer.open({
				type : 2,
				title : _title,
				area : [ _width, _height ],
				fixed : true, //不固定
				scrollbar : true,
				maxmin : true,
				content : _url,
				end : _end
			});
			if (isMaximize == "1") {
				top.layer.full(index);
			}
		},
		/**
		 * 获取token信息
		 */
		getToken : function() {
			var _csrf_code = $('meta[name="_csrf_code"]').attr("content");
			var _csrf_name = $('meta[name="_csrf_name"]').attr("content");
			var token = {};
			token[_csrf_name] = _csrf_code;
			return token;
		},
		/**
		 * 按钮事件绑定
		 */
		buttonEvent : function(fsType, getDatagrid) {
			var botton = "";
			if (fsType == "tree") { //操作树
				botton = $("button.fsTree");
			} else { //默认操作table
				botton = $("button:not(.fsTree)");
			}
			botton.on("click", function(event) {
				var _this = $(this);
				fsCommon.buttonCallback(_this, getDatagrid);
			});
		},
		/**
		 * 按钮回调
		 * @_this 按钮对象
		 * @getDatagrid 当前操作的数据对象
		 * @ztree 选中的id值
		 * @getForm 获取ZTree对应form对象（左边数，右边内容使用）
		 */
		buttonCallback : function(_this, getDatagrid, idVal, getForm) {

			var _function = _this.attr("function");
			var _funcNo = _this.attr("funcNo");
			var _requestSuccessCallback = _this.attr("requestSuccessCallback");//请求成功回调函数
			var _method = _this.attr("method");
			var _successMsg=_this.attr("successMsg");//成功提示
			if($.isEmpty(_successMsg)){
				_successMsg = "操作成功!";
			}

			//判断是否是普通按钮和树按钮
			var _tableId = _this.attr("tableId");
			if (_this.filter('.fsTree').length == 1) {
				_tableId = _this.attr("treeId");
			}

			var selectTreeId = _this.attr("selectTreeId");

			if (!$.isEmpty(selectTreeId)) {

				var value = $("#" + selectTreeId).val();
				if ($.isEmpty(value)) {
					fsCommon.warnMsg("请选择左边树！");
					return false;
				} else if (value === "0") {
					fsCommon.warnMsg("请选择非根目录！");
					return false;
				}
			}

			//选择处理
			var selectId = _this.attr("selectId");

			if (!$.isEmpty(selectId)) {

				var value = $("#" + selectId).val();

				if ($.isEmpty(value)) {
					var msg = _this.attr("selectMsg");//提示消息
					if($.isEmpty(msg)){
						msg = "请选择后再操作";
					}
					fsCommon.warnMsg(msg);
					return false;
				}
			}

			switch (_function) {
			case "refresh":
				var obj = getDatagrid(_tableId);
				if (!$.isEmpty(obj)) {
					//刷新
					obj.refresh(idVal);
				}
				break;
			case "submit":
				//提交
				//单选判断 //多选判断
				if ("1" == _this.attr("isSelect") || "1" == _this.attr("isMutiDml")) {
					//获取选中的数据
					var data = getDatagrid(_tableId).getCheckData(idVal);
					if (data.length == 0) {
						fsCommon.warnMsg("请选择需要操作的数据！");
						return;
					}
					if ("1" == _this.attr("isSelect") && data.length > 1) {
						fsCommon.warnMsg("请选择一行数据！");
						return;
					}
				}
				var param = {}; //参数

				var submitForm = function() {
					var url = _this.attr("url"); //请求url
					if ($.isEmpty(_funcNo) && $.isEmpty(url)) {
						fsCommon.warnMsg("功能号或请求地址为空！");
						return;
					}
					if ($.isEmpty(url)) {
						url = "/servlet/" + _funcNo;
					}
					//获取参数
					var inputs = _this.attr("inputs");

					if (!$.isEmpty(inputs)) {
						//获取选中的数据
						var data = getDatagrid(_tableId).getCheckData(idVal);
						var param2 = fsCommon.getParamByInputs(inputs, data);
						$.extend(param, param2);
					}
					//请求数据
					fsCommon.invoke(url, param, function(data) {
						if(!$.isEmpty(_requestSuccessCallback)){
					        layui.fsRequestSuccessCallback[_requestSuccessCallback](data,getDatagrid(_tableId),fsCommon);
					        return;
					      }
						if (data[statusName] == "0") {
							fsCommon.setRefreshTable("1");
							if (_this.attr("isRefresh") !== "0" && !$.isEmpty(getDatagrid(_tableId))) {
								//刷新
								getDatagrid(_tableId).refresh(idVal);
							}

							if (_this.attr("isClose") == "1") {
								parent.layer.close(parent.layer.getFrameIndex(window.name));
							}
							fsCommon.successMsg(_successMsg);
						} else {
							//提示错误消息
							fsCommon.errorMsg(data[msgName]);
						}
					}, null, _method);
				}

				var submitForm2 = function() {

					if ("1" == _this.attr("isVerifyPwd")) //是否验证密码
					{
						fsCommon.promptVerifyPwd(param, function(data2) {
							param = data2;
							submitForm();
						});
					} else {
						submitForm();
					}
				}

				if ("1" == _this.attr("isConfirm")) {
					var confirmMsg = _this.attr("confirmMsg");
					if ($.isEmpty(confirmMsg)) {
						confirmMsg = "是否确定操作选中的数据?";
					}

					fsCommon.confirm("提示", confirmMsg, function(index) {
						top.layer.close(index);
						submitForm2();
					});
				} else {
					submitForm2();
				}
				break;
			case "close":
				//关闭
				var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
				parent.layer.close(index);
				break;
			case "query":
				//查询
				var obj = getDatagrid(_tableId);
				if (!$.isEmpty(obj)) {
					var formData = _this.parentsUntil('form').parent().getFormData();
					obj.query(formData);
				}
				if(!$.isEmpty(_requestSuccessCallback)){
			        layui.fsRequestSuccessCallback[_requestSuccessCallback](data,getDatagrid(_tableId),fsCommon);
			        return;
			      }
				break;
			case "top":
			case "topAddRow":

				var _url = _this.attr("topUrl");
				if ($.isEmpty(_url)) {
					fsCommon.warnMsg("url地址为空！");
					return false;
				}

				if ("1" == _this.attr("isSelect")) {
					//获取选中的数据
					var data = getDatagrid(_tableId).getCheckData();
					if (data.length == 0) {
						fsCommon.warnMsg("请选择需要操作的数据！");
						return;
					}
					if (data.length > 1) {
						fsCommon.warnMsg("请选择一行数据！");
						return;
					}
				}

				var inputs = _this.attr("inputs");

				if (!$.isEmpty(inputs)) {
					//获取选中的数据
					var data = getDatagrid(_tableId).getCheckData(idVal);
					_url = fsCommon.getUrlByInputs(_url, inputs, data[0]);

					//处理数据缓存
					if (loadDataType == "1") {
						var uuid = $.uuid();
						_url += "&_fsUuid=" + uuid;
						//缓存选中的数据
						$.setSessionStorage(uuid, JSON.stringify(data[0]));
					}
				}

				//弹出的方式
				var _mode = _this.attr("topMode");
				if (!$.isEmpty(_mode)) {
					if (_url.indexOf('?') == -1) {
						_url += "?";
					} else {
						_url += "&";
					}
					_url += "_mode=" + _mode;
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

				fsCommon.open(_title, _width, _height, _url, function() {
					if (_this.attr("isRefresh") !== "0" && fsCommon.isRefreshTable()) {
						if(_function == "topAddRow"){//新增表格缓存数据
							var str = $.getSessionStorage("fsDataRow");
							$.removeSessionStorage("fsDataRow");
							if(!$.isEmpty(str)){
								getDatagrid(_tableId).addRow(JSON.parse(str));
							}
						}else{
							getDatagrid(_tableId).refresh(idVal);
						}
					}
				}, isMaximize);
				break;
			case "upload":

				var _title = "上传附件";
				var _width = "400px";
				var _height = "280px";
				var _url = $.result(fsConfig, "global.uploadHtmlUrl", "/plugins/frame/views/upload.html");

				var inputs = _this.attr("inputs");

				if (!$.isEmpty(inputs)) {
					_url = fsCommon.getUrlByInputs(_url, inputs, null);
				}

				var fileParam = {};
				if (!$.isEmpty(_this.attr("fileAccept"))) {
					fileParam["fileAccept"] = _this.attr("fileAccept");
				}
				if (!$.isEmpty(_this.attr("fileExts"))) {
					fileParam["fileExts"] = _this.attr("fileExts");
				}
				if (!$.isEmpty(_this.attr("fileSize"))) {
					fileParam["fileSize"] = _this.attr("fileSize");
				}

				//是否允许多文件上传，1是
				var isMultiple = _this.attr("isMultiple");
				if (!$.isEmpty(isMultiple)) {
					fileParam["isMultiple"] = isMultiple;
				}
				//最大同时长传数量
				if (!$.isEmpty(_this.attr("maxNumber"))) {
					fileParam["maxNumber"] = _this.attr("maxNumber");
				}

				if (!$.isEmpty(fileParam)) {
					if (_url.indexOf('?') == -1) {
						_url += "?";
					} else {
						_url += "&";
					}
					_url += "fileParam=" + escape(JSON.stringify(fileParam));
				}

				fsCommon.open(_title, _width, _height, _url, function() {
					var uploadFileList = top.$('meta[name="uploadFileList"]').attr("content");
					if (!$.isEmpty(uploadFileList)) {

						var fileList = JSON.parse(uploadFileList);
						var fileObj = null;
						if($.isArray(fileList) && fileList.length>0){//多文件
							fileObj = fileList[0];
						}else{//单文件
							fileObj = fileList;
						}

						var uploadFilePath = fileObj[filePath];
						var uploadFileName = fileObj[fileName];
						if (!$.isEmpty(uploadFilePath)) {
							if (!$.isEmpty(_this.attr("fileElem"))) {
								$(_this.attr("fileElem")).val(uploadFilePath);
							}
							if (!$.isEmpty(uploadFileName)) {
								if (!$.isEmpty(_this.attr("fileNameElem"))) {
									$(_this.attr("fileNameElem")).val(uploadFileName);
								}
							}
						}

					  //回调处理
						var _callback = _this.attr("onCallback");
				    if(!$.isEmpty(_callback) && !$.isEmpty(layui.fsCallback.button[_callback])){
				    	layui.fsCallback.button[_callback](_this,fsCommon,JSON.parse(uploadFileList));
				    }

					}

				});

				break;
			case "uploadHeadImage":
				var _title = "修改头像";
				var _width = "600px";
				var _height = "500px";
				var _url = $.result(fsConfig, "global.uploadHeadImageHtmlUrl", "/plugins/frame/views/upload-head-image.html");

				fsCommon.open(_title, _width, _height, _url, function() {
					var uploadFileList = top.$('meta[name="uploadFileList"]').attr("content");
					if (!$.isEmpty(uploadFileList)) {

						var fileList = JSON.parse(uploadFileList);
						var fileObj = null;
						if($.isArray(fileList) && fileList.length>0){//多文件
							fileObj = fileList[0];
						}else{//单文件
							fileObj = fileList;
						}

					  //回调处理
						var _callback = _this.attr("onCallback");
				    if(!$.isEmpty(_callback) && !$.isEmpty(layui.fsCallback.button[_callback])){
				    	layui.fsCallback.button[_callback](_this,fsCommon,fileObj);
				    }

						var _fileElem = _this.attr("fileElem");
						if (!$.isEmpty(_fileElem)) {
							var _fileThis = $(_fileElem);
							var uploadFilePath = fileObj[filePath];
							if(_fileThis.is('img')){
								_fileThis.attr("src",uploadFilePath);
							}else if(_fileThis.is('input')){
								_fileThis.val(uploadFilePath);
							}
						}
					}
				});

				break;
			case "addRow":
				getDatagrid(_tableId).addRow();
				break;
			case "save":

				var groupId = _this.attr("groupId"); //分组id

				if ($.isEmpty(groupId)) {
					fsCommon.warnMsg("未配置分组id!");
					return;
				}
				var fsFormData = {}; //form表单数据
				var isFsForm = false; //是否有form表单
				var fsTableData = []; //数据表格数据
				var isFsTable = false; //是否有table表格

				var isFsVerifyForm = true;

				$("table.fsDatagrid,form").each(function(index, elem) {
					var _groupId = $(this).attr("groupId");
					if (!$.isEmpty(_groupId) && groupId == _groupId) {
						if ("FORM" == elem.tagName.toUpperCase()) {
							var isVerify = form.verifyForm($(this));
							if (isVerify != false) { //验证通过
								//获取form表单数据
								var formData = $(this).getFormData();
								$.extend(fsFormData, formData);
								isFsForm = true;
							} else {
								isFsVerifyForm = false;
								return false;
							}
						} else if ("TABLE" == elem.tagName.toUpperCase()) {
							var data = getDatagrid(elem.id).getData();
							$.extend(fsTableData, data);
							isFsTable = true;
						}
					}
				});

				if (!isFsVerifyForm) {
					return;
				}
				var param = {}; //参数

				var submitFormSave = function() {
					var url = _this.attr("url"); //请求url

					if ($.isEmpty(_funcNo) && $.isEmpty(url)) {
						fsCommon.warnMsg("功能号或请求地址为空！");
						return;
					}
					if ($.isEmpty(url)) {
						url = "/servlet/" + _funcNo;
					}
					//获取参数
					var inputs = _this.attr("inputs");

					if (!$.isEmpty(inputs)) {
						var param2 = fsCommon.getParamByInputs(inputs);
						$.extend(param, param2);
					}
					if (isFsForm) {
						param["fsFormData"] = encodeURIComponent(JSON.stringify(fsFormData));
					}
					if (isFsTable) {
						param["fsTableData"] = encodeURIComponent(JSON.stringify(fsTableData));
					}

					//请求数据
					fsCommon.invoke(url, param, function(data) {
						if (data[statusName] == "0") {
							fsCommon.setRefreshTable("1");

							//是否自动关闭，默认是
							if (_this.attr("isClose") != "0") {
								parent.layer.close(parent.layer.getFrameIndex(window.name));
							}
							fsCommon.successMsg(_successMsg);
						} else {
							//提示错误消息
							fsCommon.errorMsg(data[msgName]);
						}
					}, null, _method);
				}

				var submitFormSave2 = function() {

					if ("1" == _this.attr("isVerifyPwd")) //是否验证密码
					{
						fsCommon.promptVerifyPwd(param, function(data2) {
							param = data2;
							submitFormSave();
						});
					} else {
						submitFormSave();
					}

				};

				if ("1" == _this.attr("isConfirm")) {
					var confirmMsg = _this.attr("confirmMsg");
					if ($.isEmpty(confirmMsg)) {
						confirmMsg = "是否确定操作选中的数据?";
					}

					fsCommon.confirm("提示", confirmMsg, function(index) {
						top.layer.close(index);
						submitFormSave();
					});
				} else {
					submitFormSave();
				}
				break;
			case "download": //下载
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
			case "right": //打开右边窗口

				var rightId = _this.attr("rightId");
				var rightTitle = _this.attr("rightTitle");
				if ($.isEmpty(rightId)) {
					return;
				}

				var formDom = $("#" + rightId);
				if (formDom.length == 0) {
					return;
				}

				//赋值标题
				formDom.parentsUntil('div.layui-card').parent().children(".layui-card-header").html(rightTitle);

				//表单赋值、查询。清空
				var _mode = _this.attr("mode");

				//获取参数
				var inputs = _this.attr("inputs");

				if (!$.isEmpty(inputs)) {
					//获取选中的数据
					var data = getDatagrid(_tableId).getCheckData(idVal);

					var param = fsCommon.getParamByInputs(inputs, data);
					//赋值
					formDom.setFormData(param);
				}

				param["_mode"] = _mode;
				getForm(rightId).loadFormData(param);
				break;
			default:
				if (!$.isEmpty(_function)) {
					try {
						var obj = null;

						if (!$.isEmpty(getDatagrid)) {
							obj = getDatagrid(_tableId)
						}

						var data = null;
						if (null != obj) {
							data = obj.getCheckData();
						}
						if (!$.isEmpty(fsButtonCommon[_function])) {
							//执行
							fsButtonCommon[_function](_this, data, obj, fsCommon);
						} else if (!$.isEmpty(layui.fsButton[_function])) {
							layui.fsButton[_function](_this, data, obj, fsCommon);
						}

					} catch (e) {
						console.error(e);
					}
				}
				break;
			}

		},
		/**
		 * 确认验证密码
		 */
		promptVerifyPwd : function(data, callback) {
			//弹出密码输入验证
			top.layer.prompt({
				title : '输入验证密码，并确认',
				formType : 1
			}, function(pass, index) {
				top.layer.close(index);
				if ($.isEmpty(data)) {
					data = {};
				}
				data["verifyPwd"] = fsCommon.encryptRsa(pass);
				callback(data);
			});
		},
		/**获取参数对象**/
		getParamByInputs : function(inputs, data) {
			var param = {}; //参数
			if (!$.isEmpty(inputs)) {
				var inputArr = inputs.split(',');
				$.each(inputArr, function(i, value) {
					var paramArr = value.split(':', 2);
					if (!$.isEmpty(paramArr[0])) {
						//获取参数值，如果值为空，获取datagrid选中行数据
						var _vaule = paramArr[1];

						if ($.isEmpty(_vaule)) {
							//多结果集,分割
							var newValue = "";
							if (!$.isEmpty(data)) {
								//如果多选，获取多选数据
								$(data).each(function(index, dom) {
									if (!$.isEmpty(newValue)) {
										newValue += ",";
									}
									var __value = dom[paramArr[0]];
									if ($.isEmpty(__value)) {
										__value = "";
									}
									newValue += __value;
								});
							}

							_vaule = newValue;
						} else if ($.startsWith(_vaule, "$")) {
							var xxxx = _vaule.substring(1);
							//多结果集,分割
							var newValue = "";
							if (!$.isEmpty(data)) {
								//如果多选，获取多选数据
								$(data).each(function(index, dom) {
									if (!$.isEmpty(newValue)) {
										newValue += ",";
									}
									var __value = dom[xxxx];
									if ($.isEmpty(__value)) {
										__value = "";
									}
									newValue += __value;
								});
							}
							_vaule = newValue;
						} else if ($.startsWith(_vaule, "#")) {
							_vaule = $(_vaule).val();
						}
						if ($.isEmpty(_vaule)) {
							_vaule = "";
						}
						param[paramArr[0]] = _vaule;
					}
				});
			}
			return param;
		},
		/**返回url组装参数**/
		getUrlByInputs : function(_url, inputs, data) {
			if (!$.isEmpty(inputs)) {
				var urlStr = "";
				var inputArr = inputs.split(',');
				$.each(inputArr, function(i, value) {
					var paramArr = value.split(':', 2);
					if (!$.isEmpty(paramArr[0])) {
						if (!$.isEmpty(urlStr)) {
							urlStr += '&';
						}

						//获取参数值，如果值为空，获取datagrid选中行数据
						var _vaule = paramArr[1];
						if ($.isEmpty(_vaule)) //如果值为空或者值是#/$开头   $取参数，#取选择器
						{
							_vaule = data[paramArr[0]];
						} else if ($.startsWith(_vaule, "$")) {
							_vaule = data[_vaule.substring(1)];
						} else if ($.startsWith(_vaule, "#")) {
							_vaule = $(_vaule).val();
						}

						if (!$.isEmpty(_vaule)) {
							urlStr += paramArr[0] + "=" + _vaule;
						}
					}
				});
				if (_url.indexOf('?') == -1) {
					_url += "?";
				}
				_url += urlStr;
			}
			return _url;
		},
		encryptRsa : function(pwd) {
			if (!$.isEmpty(rsaKey) && !$.isEmpty(pwd)) {
				var crypt = new JSEncrypt();
				crypt.setPublicKey(rsaKey);
				return crypt.encrypt(pwd);
			}
		},
		/**退出*/
		logOut : function(title, text, url, type, dataType, data, callback) {
			parent.layer.confirm(text, {
				title : title,
				resize : false,
				btn : [ '确定退出系统', '不，我点错了！' ],
				btnAlign : 'c',
				icon : 3
			}, function() {
				location.href = url
			}, function() {})
		},
		/**修改密码**/
		updatePwd : function(_title, _end) {
			top.layer.open({
				type : 2,
				title : _title,
				area : [ '500px', '310px' ],
				fixed : false, //不固定
				scrollbar : false,
				maxmin : true,
				content : "/frame/system-user-account-updatePwd",
				end : _end
			});
		},
		/**转换tree数据**/
		toTree : function(data, parentId,idField,parentIdField) {
			var tree = [];
	    var temp = null;
	    for (var i = 0; i < data.length; i++) {
				var item = data[i];
	      if (item[parentIdField] == parentId) {
	        temp = fsCommon.toTree(data, item[idField],idField,parentIdField);
	        if (null!=temp && temp.length > 0) {
	         item.children = temp;
	        }
	        tree.push(item);
	      }
	    }
	    return tree;
		}
	};
	exports('fsCommon', fsCommon);
})
