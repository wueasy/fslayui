
> **[danger] 为了避免出现一些奇葩的问题，请大家一定要看完此文章**


# 项目目录配置


> **[danger] 从`2.1.2`版本开始，可以不用配置此项。**  


> 很多同学获取源码后，直接把整个目录拷贝到工程中，导致页面打开后，页面错乱或者没有任何效果。  


>  这个原因是由于没有配置项目名称导致的（实际上使用F12调试会发现，页面提示404错误）


解决方案：修改`plugins/frame/js/fs.js`中的`base`配置。

如：项目名称为`wueasy`，那么需要把配置改为`/wueasy/plugins/frame/js/`，在路径前面增加项目名。

```javascript
layui.config({
  base : "/plugins/frame/js/",//设定扩展的Layui模块的所在目录，一般用于外部模块扩展
  version : '2.0.0'
});
```

# 项目基础配置

> **[warning] 项目基础配置都在`plugins/frame/js/fsConfig.js`文件中**


## 请求地址配置

> **[info] 前后端分离，需要配置接口的请求根地址**

```javascript
fsConfig["global"] = {
  "servletUrl":"https://fs.fallsea.com/" //异步请求地址,本地工程可以不填
}
```

## 响应结果配置

> **[info] 接口请求成功后，响应结果参数配置。需要修改成和自己项目匹配的格式。**

```javascript
fsConfig["global"] = {
  "result" : { //响应结果配置
    "statusName": "errorNo", //数据状态的字段名称，默认：errorNo
    "msgName": "errorInfo", //状态信息的字段名称，默认：errorInfo
    "successNo" : "0", //执行成功错误码统一配置
    "dataName" : "results.data", //非表格数据的字段名称，默认：results.data
    "file" : { //文件配置
      "path" : "results.data.filePath"  //返回文件路径属性
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
}
```

## 公用错误码消息回调处理

> **[info] 通过指定错误码控制错误码的回调事件处理。**
>
> 例如：用户未登录返回的错误码为`-999`，可以指定如果用户未登录，跳转到登录页面。

```javascript
fsConfig["filters"] = {
  //配置统一未登录错误码处理
  "-999" : function(result) {
    //未登录，跳转登陆页
    top.window.location.href = fsConfig["global"]["loginUrl"];
  }
};
```

## 公用表单验证事件

> **[info] 平台默认验证事件比较少，可以在这里可以拓展自定义form表单的验证事件**


```javascript
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
}
```


## 菜单配置

> 动态加载菜单数据。

支持两种模式，
1. 加载前端缓存数据
2. 加载后台接口动态数据。


### 基础配置
> 接口数据必须配置list数组，子菜单通过`parentMenuIdField`关联。


```javascript
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
  data : [] //本地数据
};
```


> 配置说明

属性        | 必输  | 名称       | 描述
------------|------|------------|------------|------
dataType    | 是   | 获取数据方式  | local本地获取，server 服务端获取；本地获取需要配置`data`，服务端获取需要配置`loadUrl`
loadUrl     | 否   |  请求数据地址 |  服务端获取请求数据地址
method      | 否   | 请求类型     | 默认`post`,`get`
rootMenuId  | 是   |  根目录菜单id值 | 菜单根id，通过此id寻找一级菜单
defaultSelectTopMenuId | 是   | 默认选中的一级菜单 | 一级菜单即是头部菜单
defaultSelectLeftMenuId | 是  | 默认选中的左边菜单 | 左边菜单
menuIdField    | 是   | 菜单id字段信息 |
menuNameField | 是   | 菜单名称字段 |
menuIconField | 是   | 菜单图标字段   |
menuHrefField | 是   | 菜单打开地址字段 |
parentMenuIdField   | 是   | 父菜单id字段 |
data         | 否   | 菜单集合 | 本地菜单集合，必须是list


### 图标配置说明

菜单图标支持多种模式配置：

1. 使用`font-awesome`图标库

  只需要进入官网[font-awesome](http://fontawesome.io/icons/)，选择好对应的图标，然后在菜单图标字典中配置即可。

  例如：复制的按钮图标配置`fa-files-o`

2. 使用`layui`官方的图标库

  进入官网[layui](http://www.layui.com/doc/element/icon.html)，选择图标代码即可。

  例如：首页的按钮图标配置`&#xe68e;`

3. 自定义图标库

  如果需要自定义图标，那么只需要配置原生的图标配置。

  例如：`<i class="layui-icon">&#xe60c;</i>`




### 本地菜单配置demo

> 本地菜单只需要在`data`中，配置json数组，json对象的属性需要和上面的配置属性匹配。

```javascript
[
  {"menuId":"1","menuName":"控制台","menuIcon":"fa-cog","menuHref":"","parentMenuId":"0"},
  {"menuId":"2","menuName":"测试","menuIcon":"","menuHref":"","parentMenuId":"0"},
  {"menuId":"11","menuName":"案例","menuIcon":"fa-table","menuHref":"","parentMenuId":"1"},
  {"menuId":"12","menuName":"其他页面","menuIcon":"","menuHref":"","parentMenuId":"1"},
  {"menuId":"111","menuName":"首页","menuIcon":"&#xe68e;","menuHref":"views/home/index.html","parentMenuId":"11"},
  {"menuId":"datagrid","menuName":"数据表格","menuIcon":"fa-list","menuHref":"views/datagrid/index.html","parentMenuId":"11"},
  {"menuId":"datagrid2","menuName":"数据表格2","menuIcon":"fa-list","menuHref":"views/datagrid2/index.html","parentMenuId":"11"},
  {"menuId":"treeDatagrid","menuName":"数+表格","menuIcon":"fa-list","menuHref":"views/treeDatagrid/index.html","parentMenuId":"11"},
  {"menuId":"multiDatagrid","menuName":"多数据表格","menuIcon":"fa-list","menuHref":"views/multiDatagrid/index.html","parentMenuId":"11"},
  {"menuId":"tabDatagrid","menuName":"tab数据表格","menuIcon":"fa-list","menuHref":"views/tabDatagrid/index.html","parentMenuId":"11"},
  {"menuId":"complexDatagrid","menuName":"复杂数据表格","menuIcon":"fa-list","menuHref":"views/complexDatagrid/index.html","parentMenuId":"11"},
  {"menuId":"linkageDatagrid","menuName":"联动数据表格","menuIcon":"fa-list","menuHref":"views/linkageDatagrid/index.html","parentMenuId":"11"},
  {"menuId":"linkageDatagrid2","menuName":"联动数据表格(复杂)","menuIcon":"fa-list","menuHref":"views/linkageDatagrid2/index.html","parentMenuId":"11"},
  {"menuId":"staticDatagrid","menuName":"表格数据提交","menuIcon":"fa-list","menuHref":"views/staticDatagrid/index.html","parentMenuId":"11"},
  {"menuId":"121","menuName":"404","menuIcon":"<i class=\"layui-icon\">&#xe61c;</i>","menuHref":"404.html","parentMenuId":"12"},
  {"menuId":"21","menuName":"基本元素","menuIcon":"","menuHref":"","parentMenuId":"2"},
  {"menuId":"22","menuName":"徽章","menuIcon":"","menuHref":"http://www.layui.com/demo/badge.html","parentMenuId":"2"},
  {"menuId":"23","menuName":"数据表格","menuIcon":"","menuHref":"http://www.layui.com/demo/table.html","parentMenuId":"2"},
  {"menuId":"211","menuName":"按钮","menuIcon":"","menuHref":"http://www.layui.com/demo/button.html","parentMenuId":"21"},
  {"menuId":"212","menuName":"表单","menuIcon":"","menuHref":"http://www.layui.com/demo/form.html","parentMenuId":"21"},
  {"menuId":"213","menuName":"选项卡","menuIcon":"","menuHref":"http://www.layui.com/demo/tab.html","parentMenuId":"21"}
]
```
