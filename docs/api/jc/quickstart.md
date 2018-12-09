
## 配置修改

> **[warning] 所有的配置信息都在此文件中`plugins/frame/js/fsConfig.js`，如果项目需要修改，都在这里进行调整。**


### 数据接口地址修改


**异步请求数据地址**，主要用于前端和后端独立开发场景使用，如果前端和后台数据接口是同一个项目，可以配置为空。


```javascript
fsConfig["global"] = {
  "servletUrl":"https://fs.fallsea.com" //异步请求地址,本地工程可以不填
}
```


### 登录/上传地址配置

* `loginUrl`：登录地址，描述ajax异步请求后，接口返回 **未登录** 后，需要跳转的页面地址
* `uploadUrl`：上传附件url地址，描述上传附件统一的接口地址
* `uploadHtmlUrl`：上传附件按钮点击进入的页面地址

```javascript
fsConfig["global"] = {
  "loginUrl" : "/login", //登录url
  "uploadUrl" : "https://fs.fallsea.com/upload", //上传附件url
  "uploadHtmlUrl" : "/plugins/frame/views/upload.html" //上传附件html地址，默认/plugins/frame/views/upload.html
}
```

### 默认响应结果配置

> 可以理解为 **默认相应结果配置属性** ，例如：执行成功消息码值、执行成功标识属性、执行结果说明属性、执行结果集属性。


```javascript
fsConfig["global"] = {
  "result" : { //响应结果配置
    "statusName": "errorNo", //数据状态的字段名称，默认：errorNo
    "msgName": "errorInfo", //状态信息的字段名称，默认：errorInfo
    "successNo" : "0", //执行成功错误码统一配置
    "dataName" : "results.data" //数据列表的字段名称，默认：results.data
  }
}
```

### 分页响应结果配置

> **[warning] 只有数据表格分页会使用**


> 请求参数配置，分页传入的参数属性

* `pageName`：分页-页码参数属性配置，默认`pageNum`
* `limitName`：分页-每页数量参数属性配置，默认`pageSize`

> 响应结果配置，分页展示结果属性

* `countName`：数量总条数属性配置，默认`results.data.total`
* `dataName`：数据表格展示数据**未使用分页**属性配置，默认`results.data`
* `dataNamePage`：数据表格展示数据**使用分页**属性配置，默认`results.data.list`

> 分页配置

* `limit`：默认选中分页数量，默认`20`
* `limits`：分页数据选择项，默认`[10,20,30,50,100]`


```javascript
fsConfig["global"] = {
  "page" : { //分页配置
    "request": {//请求配置
      "pageName": "pageNum", //页码的参数名称，默认：pageNum
      "limitName": "pageSize" //每页数据量的参数名，默认：pageSize
    },
    "response": {//响应配置
      "countName": "results.data.total", //数据总数的字段名称，默认：results.data.total
      "dataName" : "results.data", //数据列表的字段名称，默认：results.data
      "dataNamePage": "results.data.list" //分页数据列表的字段名称，默认：results.data.list
    }//,
//  "limit":10,//每页分页数量。默认20
//  "limits":[10,20,30,50,100]//每页数据选择项，默认[10,20,30,50,100]
  }
}
```




## 页面开发  


以数据表格的增删改查为例。


### 引入框架基础文件

> **[warning] 基础文件是通用的，所有的页面必须按照这个顺序来引用**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta content="text/html;charset=UTF-8"/>
  <script src="https://cdn.bootcss.com/pace/1.0.2/pace.min.js"></script>
  <link href="https://cdn.bootcss.com/pace/1.0.2/themes/pink/pace-theme-flash.css" rel="stylesheet">
  <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="../../plugins/layui/css/layui.css" media="all"/>
  <link rel="stylesheet" type="text/css" href="../../css/fs.css" media="all"/>
  <script type="text/javascript" src="../../plugins/layui/layui.js"></script>
  <script type="text/javascript" src="../../plugins/jquery/jquery.min.js"></script>
  <script type="text/javascript" src="../../plugins/frame/js/fsDict.js?v=1.7.0"></script>
  <script type="text/javascript" src="../../plugins/frame/js/fs.js?v=1.7.0"></script>
  <script type="text/javascript" src="../../plugins/frame/js/frame.js?v=1.7.0"></script>
</head>
<body>


</body>
</html>
```

### 列表页

> 列表页支持通过form表单传参查询table数据，刷新表格等功能。  
表格详细配置请参考：[fsLayuiPlugin数据表格使用](http://www.itcto.cn/layui/fsLayuiPlugin%E6%95%B0%E6%8D%AE%E8%A1%A8%E6%A0%BC%E4%BD%BF%E7%94%A8/)

```html
<div>
  <div class="layui-fluid">
    <div class="layui-row layui-col-space1">
      <div class="layui-col-md12">
        <div class="layui-form-query">
          <form class="layui-form" id="query_form">
            <div class="layui-form-item">
              <div class="layui-inline">
                <label class="layui-form-mid">id：</label>
                <div class="layui-input-inline" style="width: 100px;">
                  <input type="tel" name="id" autocomplete="off" class="layui-input"/>
                </div>
              </div>
              <div class="layui-inline">
                <label class="layui-form-mid">名称：</label>
                <div class="layui-input-inline" style="width: 100px;">
                  <input type="text" name="name" autocomplete="off" class="layui-input"/>
                </div>
              </div>
              <div class="layui-inline">
                <label class="layui-form-mid">时间：</label>
                <div class="layui-input-inline" style="">
                  <input type="text" name="createDate" autocomplete="off" class="layui-input fsDate" dateRange="1" placeholder=" - "/>
                </div>
              </div>
              <div class="layui-inline">
                <div class="layui-input-inline">
                  <button class="layui-btn" type="button" function="query"><i class="layui-icon">&#xe615;</i>查询</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="layui-col-md12">
        <div class="layui-row grid-demo">
          <div class="layui-col-md12">
            <button class="layui-btn" function="top" topUrl="views/datagrid/add.html" topWidth="800px" isMaximize="0" topHeight="600px" topTitle="新增demo">
              <i class="layui-icon">&#xe654;</i>新增
            </button>
            <button class="layui-btn layui-btn-danger" function="submit" url="/fsbus/1002" isMutiDml="1" isConfirm="1" confirmMsg="是否确定删除选中的数据？" inputs="id:">
              <i class="layui-icon">&#xe640;</i>批量删除
            </button>
            <button class="layui-btn" function="refresh">
              <i class="layui-icon">&#x1002;</i>刷新
            </button>
            <button class="layui-btn" function="test">
              <i class="layui-icon">&#xe756;</i>测试
            </button>
          </div>
          <div class="layui-col-md12">
            <table id="fsDatagrid" lay-filter="fsDatagrid" class="fsDatagrid" isLoad="1" url="/fsbus/1000" isPage="1" sortType="1" pageSize="10" defaultForm="query_form" height="full-135"></table>

            <div class="fsDatagridCols">
              <p type="numbers" title="#"/>
              <p checkbox="true"/>
              <p field="id" title="ID" width="100" sort="true"/>
              <p field="name" title="名称" width="30%" sort="true" />
              <p field="type" title="类型" width="150" dict="type"/>
              <p field="city" title="城市" width="100" dict="city"/>
              <p field="sex" title="性别" width="100" />
              <p field="state" title="状态" width="100" templet="#stateTpl"/>
              <p field="area1" title="省份" width="100" dict="area1"/>
              <p field="createdTime" title="创建时间" width="180"/>
              <p field="modifiedTime" title="修改时间" width="180"/>
              <p fixed="right" align="center" toolbar="#barDemo" title="操作" width="220"/>
            </div>
            {% raw %}
            <script type="text/html" id="stateTpl">
              <input type="checkbox" name="state" lay-skin="switch" disabled lay-text="开启|关闭" {{ d.state==1 ? 'checked' : '' }}>
            </script>
            {% endraw %}
            <script type="text/html" id="barDemo">
              <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="top" topUrl="views/datagrid/edit.html" topMode="readonly" topWidth="800px" topHeight="600px" topTitle="查看demo" inputs="id:">查看</a>
              <a class="layui-btn layui-btn-xs" lay-event="top" topUrl="views/datagrid/edit.html" topWidth="800px" topHeight="600px" topTitle="编辑demo" inputs="id:">编辑</a>
              <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="submit" url="/fsbus/1002" isConfirm="1" confirmMsg="是否确定删除当前记录？" inputs="id:">删除</a>
              <a class="layui-btn layui-btn-xs" lay-event="test2" >测试</a>
            </script>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```


### 菜单配置

菜单赋予强大的功能，通过简单的配置，快速达到需要的效果。  
例如:  
* 弹出一个新的窗口
* 关闭窗口
* 查询talbe
* 提交数据(确认提示按钮)
* 选择table

等...，  
菜单信息配置请参考：[菜单配置说明](http://www.itcto.cn/layui/fsLayuiPlugin%E6%95%B0%E6%8D%AE%E8%A1%A8%E6%A0%BC%E4%BD%BF%E7%94%A8/#表格菜单工具栏配置)


#### 新增弹出窗口

* `function="top"` 描述弹出窗口  
* `topUrl="views/datagrid/add.html"` 指定打开的页面
* `topWidth="800px"` 弹出窗口宽度
* `topHeight="600px"` 弹出窗口高度
* `topTitle="新增demo"` 弹出窗口标题

```html
<button class="layui-btn" function="top" topUrl="views/datagrid/add.html" topWidth="800px" isMaximize="0" topHeight="600px" topTitle="新增demo">
  <i class="layui-icon">&#xe654;</i>新增
</button>
```

#### 修改弹出窗口

* `lay-event="top"` 描述弹出窗口  
* `topUrl="views/datagrid/edit.html"` 指定打开的页面
* `topWidth="800px"` 弹出窗口宽度
* `topHeight="600px"` 弹出窗口高度
* `topTitle="编辑demo"` 弹出窗口标题
* `inputs="id:"` 传入参数信息

```html
<a class="layui-btn layui-btn-xs" lay-event="top" topUrl="views/datagrid/edit.html" topWidth="800px" topHeight="600px" topTitle="编辑demo" inputs="id:">编辑</a>
```

#### 删除数据

* `lay-event="submit"` 描述提交数据
* `url="/fsbus/1002"` 提交的url地址
* `isConfirm="1"` 弹出确认提示
* `confirmMsg="是否确定删除当前记录？"` 自定义确认提升内容
* `inputs="id:"` 提交的参数信息

```html
<a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="submit" url="/fsbus/1002" isConfirm="1" confirmMsg="是否确定删除当前记录？" inputs="id:">删除</a>
```


#### 刷新表格

* `function="refresh"` 描述刷新表格

```html
<button class="layui-btn" function="refresh">
  <i class="layui-icon">&#x1002;</i>刷新
</button>
```


### 新增页  

实现原理：提交整个form表单数据。


```html
<div class="layui-fluid">

  <form class="layui-form">
    <div class="layui-form-item">
      <label class="layui-form-label">名称</label>
      <div class="layui-input-block">
        <input type="text" name="name" required="" lay-verType="tips" lay-verify="required" placeholder="请输入名称" autocomplete="off" class="layui-input"/>
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">类型</label>
      <div class="layui-input-block">
        <input type="checkbox" name="type" title="写作" value="write">
        <input type="checkbox" name="type" title="阅读" value="read">
        <input type="checkbox" name="type" title="发呆" value="dai">
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">性别</label>
      <div class="layui-input-inline">
        <input type="radio" name="sex" value="男" title="男" checked="checked">
        <input type="radio" name="sex" value="女" title="女">
      </div>
      <label class="layui-form-label">状态</label>
      <div class="layui-input-inline">
        <input type="checkbox" name="state" lay-skin="switch" lay-text="开启|关闭" value="1" checked>
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">城市</label>
      <div class="layui-input-inline">
        <select name="city" lay-verify="required"  lay-verType="tips" class="fsSelect" dict="city" addNull="1">
        </select>
      </div>
      <label class="layui-form-label">创建时间</label>
      <div class="layui-input-inline">
        <input type="text" name="createdTime" autocomplete="off" class="layui-input fsDate" dateType="datetime" />
      </div>
    </div>

    <div class="layui-form-item">
      <label class="layui-form-label">省份</label>
      <div class="layui-input-inline" style="width: 100px;">
        <select id="area2222222" name="area1" lay-filter="xxxxxx1" class="fsSelect" dict="area1" addNull="1" childrenSelectId="xxxxxx2">
        </select>
      </div>
      <label class="layui-form-label">城市</label>
      <div class="layui-input-inline" style="width: 100px;">
        <select id="xxxxxx2" name="area2" lay-filter="xxxxxx2" class="fsSelect" isLoad="0" dict="area2" addNull="1" childrenSelectId="xxxxxx3">
        </select>
      </div>
      <label class="layui-form-label">区</label>
      <div class="layui-input-inline" style="width: 100px;">
        <select id="xxxxxx3" name="area3" class="fsSelect" isLoad="0" dict="area3" addNull="1">
        </select>
      </div>
    </div>

    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">附件</label>
      <div class="layui-input-inline">
        <input type="text" id="filePath" name="filePath" autocomplete="off" disabled="disabled" class="layui-input"/>
      </div>
      <div class="layui-input-inline">
        <button type="button"  class="layui-btn" function="upload" fileElem="#filePath" fileAccept="file" fileExts="" fileSize="1024" inputs="type:test">上传图片</button>
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">描述</label>
      <div class="layui-input-block">
        <textarea id="description" name="description" placeholder="请输入描述" class="fsLayedit" height="80"></textarea>
      </div>
    </div>
    <hr/>
    <div class="layui-form-item" style="text-align: center;">
      <button class="layui-btn" lay-submit="" lay-filter="save" url="/fsbus/1001">新增</button>
      <button type="button" class="layui-btn layui-btn-primary" function="close">关闭</button>
    </div>
  </form>
</div>
```

### 编辑页  

实现原理：先异步查询数据，然后填充form表单。


```html
<div class="layui-fluid">

  <form class="layui-form" id="edit_form" isLoad="1" loadUrl="/fsbus/1003">
    <div class="layui-form-item">
      <label class="layui-form-label">名称</label>
      <div class="layui-input-block">
        <input type="text" name="name" required="" lay-verType="tips" lay-verify="required" placeholder="请输入名称" autocomplete="off" class="layui-input"/>
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">类型</label>
      <div class="layui-input-block">
        <input type="checkbox" name="type" title="写作" value="write">
        <input type="checkbox" name="type" title="阅读" value="read">
        <input type="checkbox" name="type" title="发呆" value="dai">
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">性别</label>
      <div class="layui-input-inline">
        <input type="radio" name="sex" value="男" title="男" checked="checked">
        <input type="radio" name="sex" value="女" title="女">
      </div>
      <label class="layui-form-label">状态</label>
      <div class="layui-input-inline">
        <input type="checkbox" name="state" lay-skin="switch" lay-text="开启|关闭" value="1" checked>
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">城市</label>
      <div class="layui-input-inline">
        <select name="city" lay-verify="required"  lay-verType="tips" class="fsSelect" dict="city" addNull="1">
        </select>
      </div>
      <label class="layui-form-label">创建时间</label>
      <div class="layui-input-inline">
        <input type="text" name="createdTime" autocomplete="off" class="layui-input fsDate" dateType="datetime" />
      </div>
    </div>

    <div class="layui-form-item">
      <label class="layui-form-label">省份</label>
      <div class="layui-input-inline" style="width: 100px;">
        <select id="area2222222" name="area1" lay-filter="xxxxxx1" class="fsSelect" dict="area1" addNull="1" childrenSelectId="xxxxxx2">
        </select>
      </div>
      <label class="layui-form-label">城市</label>
      <div class="layui-input-inline" style="width: 100px;">
        <select id="xxxxxx2" name="area2" lay-filter="xxxxxx2" class="fsSelect" isLoad="0" dict="area2" addNull="1" childrenSelectId="xxxxxx3">
        </select>
      </div>
      <label class="layui-form-label">区</label>
      <div class="layui-input-inline" style="width: 100px;">
        <select id="xxxxxx3" name="area3" class="fsSelect" isLoad="0" dict="area3" addNull="1">
        </select>
      </div>
    </div>

    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">附件</label>
      <div class="layui-input-inline">
        <input type="text" id="filePath" name="filePath" autocomplete="off" disabled="disabled" class="layui-input"/>
      </div>
      <div class="layui-input-inline">
        <button type="button"  class="layui-btn" function="upload" fileElem="#filePath" fileAccept="file" fileExts="" fileSize="1024" inputs="type:test">上传图片</button>
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">描述</label>
      <div class="layui-input-block">
        <textarea id="description" name="description" placeholder="请输入描述" class="fsLayedit" height="80"></textarea>
      </div>
    </div>
    <hr/>
    <div class="layui-form-item" style="text-align: center;">
      <button class="layui-btn" lay-submit="" lay-filter="edit" url="/fsbus/1004"><i class="layui-icon">&#xe642;</i>编辑</button>
      <button type="button" class="layui-btn layui-btn-primary" function="close">关闭</button>
    </div>
  </form>
</div>
```



## java返回结果集demo

> **[warning] 返回json消息，必须指定错误码，通过错误码判断是否执行成功。**


### json格式

```json
{"errorNo":"0","errorInfo":"执行成功","results":{"data":[]}}
```

### 实体bean

```java
package com.fallsea.base.entity;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * @Description: 结果集
 * @Copyright: 2017 www.fallsea.com Inc. All rights reserved.
 * @author: fallsea
 * @version 1.0
 * @date: 2017年10月22日 下午8:29:07
 */
public class Result implements Serializable
{

    private static final long serialVersionUID = -5063527180151987941L;

    private int errorNo;

    private String errorInfo;

    private Map<String, Object> results = null;

    public Result()
    {
	    this.errorNo = 0;
    }

	/**
	 * @Description:
	 * @author: fallsea
	 * @date: 2017年10月22日 下午8:29:29
	 * @param errorNo 错误码
	 * @param errorInfo 错误消息
	 */
    public Result(int errorNo, String errorInfo)
    {
        this.errorNo = errorNo;
        this.errorInfo = errorInfo;
    }


    public int getErrorNo()
    {
        return errorNo;
    }

    public void setErrorNo(int errorNo)
    {
        this.errorNo = errorNo;
    }

    public String getErrorInfo()
    {
        return errorInfo;
    }

    public void setErrorInfo(String errorInfo)
    {
        this.errorInfo = errorInfo;
    }

    public Map<String, Object> getResults()
    {
        return results;
    }

    /**
     * @Description: 获取第一个集合
     * @author: fallsea
     * @date: 2017年10月22日 下午8:29:43
     * @return
     */
    @JSONField(serialize=false)
    public Object getResult()
    {
        if( null != this.results)
        {
            Set<String> set = this.results.keySet();
            if(null!=set && !set.isEmpty())
            {
                Iterator<String> iter = set.iterator();
                if ( iter.hasNext() )
                {
                    String key = iter.next();
                    return getResult(key);
                }
            }
        }
        return null;
    }

    /**
     * @Description: 获取属性集合
     * @author: fallsea
     * @date: 2017年10月22日 下午8:29:51
     * @param dsName
     * @return
     */
    @JSONField(serialize=false)
    public Object getResult(String dsName)
    {
        if( null != getResults())
        {
            return getResults().get(dsName);
        }
        return null;
    }



    /**
     * @Description: 当一个 接口只返回一个结果集时，可调用此方法
     * @author: fallsea
     * @date: 2017年10月22日 下午8:30:28
     * @param object
     */
    public void setResult(Object object)
    {
        this.setResult("data", object);
    }

    /**
     * @Description: 多个结果集需使用此方法，前台根据结果集名称获取不同的数据
     * @author: fallsea
     * @date: 2017年10月22日 下午8:30:42
     * @param name
     * @param object
     */
    public void setResult(String name, Object object)
    {
        if(null == this.results)
        {
            this.results = new HashMap<String, Object>();
        }
        this.results.put(name, object);
    }
}
```


### 返回结果demo

组装返回结果集数据

```java
Result result = new Result();

result.setErrorNo(0);
result.setErrorInfo("执行成功");

result.setResult(null);//结果集
```
