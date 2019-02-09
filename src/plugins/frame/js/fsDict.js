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
 * 字典配置
 * @author: fallsea
 * @version 2.3.0
 */
layui.fsDict = {
		//城市
 		city : {
 			formatType : "local",
 			labelField : "name",
 			valueField : "code",
 			//静态数据
 			data:[{"code":0,"name":"北京","style":"color:#F00;"},
 				{"code":1,"name":"上海"},
 				{"code":2,"name":"广州"},
 				{"code":3,"name":"深圳"},
 				{"code":4,"name":"杭州"}
 			]
 		},
 		//类型
 		type : {
 			formatType : "local",
 			labelField : "name",
 			valueField : "code",
 			spaceMode : " ",//展示多个数据分隔符，默认,
 			data:[{"code":"write","name":"写作","css":"layui-badge layui-bg-orange"},
 				{"code":"read","name":"阅读","css":"layui-badge layui-bg-green"},
 				{"code":"dai","name":"发呆","css":"layui-badge layui-bg-cyan"}]
 		}
 		,
 		//性别
 		sex : {
 			formatType : "local",
 			labelField : "name",
 			valueField : "code",
 			spaceMode : "",//展示多个数据分隔符，默认,
 			data:[{"code":"男","name":"男"},
 				{"code":"女","name":"女"}]
 		}
 		,
 		//省份
 		area1 : {
 			formatType : "server",
 			loadUrl : "/fsbus/DEMO1006",
 			method : "get",
 			inputs : "parentid:0",
 			labelField : "name",
 			valueField : "id"
 		},
 		//城市
 		area2 : {
 			formatType : "server",
 			loadUrl : "/fsbus/DEMO1006",
 			inputs : "parentid:",
 			labelField : "name",
 			valueField : "id"
 		},
 		//区
 		area3 : {
 			formatType : "server",
 			loadUrl : "/fsbus/DEMO1006",
 			inputs : "parentid:,area1:#area2222222",
 			labelField : "name",
 			valueField : "id"
 		}
};
