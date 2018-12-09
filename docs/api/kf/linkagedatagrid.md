# 联动表格使用说明

> 通过主表格加载副表格数据。


## 简单联动表格

[演示地址](http://fslayui.wueasy.com/index.html#linkageDatagrid)


联动表格配置和基础表格配置一致，只是多了几个特殊的属性，[基础表格使用](../kf/datagrid.html)


> 联动表格需要在基础表格上增加以下3个配置：
* clickRenderTable：点击行渲染的表格id
* clickRenderTableInputs：点击后传入参数
* isLoad：是否自动加载


详细配置说明参考：[表格属性配置](../kf/datagrid.html#表格基础属性配置)


### 主表格demo

主表格需要配置 `clickRenderTable`,`clickRenderTableInputs`,`isLoad`,三个属性，`isLoad` 可以不用配置，默认为`1`.


```html
<table id="fsDatagrid" lay-filter="fsDatagrid" class="fsDatagrid" clickRenderTable="fsDatagrid2" clickRenderTableInputs="funcId:$id" isLoad="1" url="/fsbus/S1023" isPage="1" height="260"></table>

<div class="fsDatagridCols">
  <p type="numbers" title="#"/>
  <p field="funcNo" title="功能号" width="100" sort="true"/>
  <p field="funcName" title="名称" width="200"/>
  <p field="funcType" title="类型" width="150" templet="#typeTpl"/>
  <p field="state" title="状态" width="100" templet="#stateTpl"/>
  <p field="resource" title="资源信息" width="300"/>
  <p field="createdTime" title="创建时间" width="180"/>
</div>
{% raw %}
<script type="text/html" id="typeTpl">
  {{#  if(d.funcType == 'c'){ }}
    功能号实现类
  {{# } else if(d.funcType == 's'){ }}
    service实现类
  {{# } else if(d.funcType == 'm'){ }}
	  mapper实现类
  {{#  } }}
</script>
<script type="text/html" id="stateTpl">
  {{#  if(d.state == 0){ }}
    <span style="color: #c2c2c2">关闭</span>
  {{# } else if(d.state == 1){ }}
    <span style="color: #5FB878">启用</span>
  {{# } else if(d.state == 2){ }}
    <span style="color: #FF5722;">作废</span>
  {{#  } }}
</script>
{% endraw %}
```

### 副表格demo

副表格需要配置 `isLoad` 属性为 `0` 。  
这里必须配置为0，不然会导致异步数据渲染冲突，首次加载页面显示存在问题

```html
<table id="fsDatagrid2" class="fsDatagrid" lay-filter="fsDatagrid2" url="/fsbus/S1030" isLoad="0" height="260" isPage="0"></table>

<div class="fsDatagridCols">
  <p type="numbers" title="#"/>
  <p field="attribute" title="参数" width="100" sort="true"/>
  <p field="name" title="名称" width="150"/>
  <p field="notEmpty" title="必输" width="80" templet="#notEmptyTpl"/>
  <p field="verifyType" title="验证类型" width="100"/>
  <p field="value" title="值" width="100"/>
  <p field="defaultValue" title="默认值" width="100"/>
  <p field="minLength" title="最小长度" width="100"/>
  <p field="maxLength" title="最大长度" width="100"/>
</div>
{% raw %}
<script type="text/html" id="notEmptyTpl">
  {{#  if(d.notEmpty == '1'){ }}
    <span style="color: #FF5722">是</span>
  {{# } else{ }}
    <span style="color: #c2c2c2">否</span>
  {{#  } }}
</script>
{% endraw %}
```


## 复杂联动表格

 **复杂联动表格使用** 点击主表格，加载副表格数据，支持主、副表格的 **增删改查** 操作。  
[演示地址](http://fslayui.wueasy.com/index.html#linkageDatagrid2)


[基础表格使用](../kf/datagrid.html)



### 主表格demo

> 增加查询条件

```html
<form class="layui-form" id="query_form">
  <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-mid">功能号：</label>
      <div class="layui-input-inline" style="width: 100px;">
        <input type="text" name="funcNo" autocomplete="off" class="layui-input"/>
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-mid">名称：</label>
      <div class="layui-input-inline" style="width: 150px;">
        <input type="text" name="funcName" autocomplete="off" class="layui-input"/>
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-mid">类型：</label>
      <div class="layui-input-inline" style="width: 150px;">
        <select name="funcType" lay-verify="required">
          <option value="">--请选择--</option>
          <option value="c">功能号实现类</option>
          <option value="s">service实现类</option>
          <option value="m">mapper实现类</option>
        </select>
      </div>
    </div>
    <div class="layui-inline">
      <div class="layui-input-inline">
        <button class="layui-btn" type="button" function="query"><i class="layui-icon">&#xe615;</i>查询</button>
      </div>
    </div>
  </div>
</form>
```

> 菜单配置

```html
<button class="layui-btn" function="top" topUrl="../complexDatagrid/add.html" topWidth="700px" topHeight="450px" topTitle="新增功能号信息">
  <i class="layui-icon">&#xe654;</i>新增
</button>
<button class="layui-btn" function="refresh">
  <i class="layui-icon">&#x1002;</i>刷新
</button>
```


> 表格配置

```html
<table id="fsDatagrid" lay-filter="fsDatagrid" class="fsDatagrid" clickRenderTable="fsDatagrid2" clickRenderTableInputs="funcId:$id" isLoad="1" defaultForm="query_form" url="/fsbus/S1023" isPage="1" height="260"></table>

<div class="fsDatagridCols">
  <p type="numbers" title="#"/>
  <p field="funcNo" title="功能号" width="100" sort="true"/>
  <p field="funcName" title="名称" width="200"/>
  <p field="funcType" title="类型" width="150" templet="#typeTpl"/>
  <p field="state" title="状态" width="100" templet="#stateTpl"/>
  <p field="resource" title="资源信息" width="300"/>
  <p field="createdTime" title="创建时间" width="180"/>
  <p fixed="right" align="center" toolbar="#barDemo" title="操作" width="150"/>
</div>
{% raw %}
<script type="text/html" id="typeTpl">
  {{#  if(d.funcType == 'c'){ }}
    功能号实现类
  {{# } else if(d.funcType == 's'){ }}
    service实现类
  {{# } else if(d.funcType == 'm'){ }}
    mapper实现类
  {{#  } }}
</script>
<script type="text/html" id="stateTpl">
  {{#  if(d.state == 0){ }}
    <span style="color: #c2c2c2">关闭</span>
  {{# } else if(d.state == 1){ }}
    <span style="color: #5FB878">启用</span>
  {{# } else if(d.state == 2){ }}
    <span style="color: #FF5722;">作废</span>
  {{#  } }}
</script>
<script type="text/html" id="barDemo">
  <a class="layui-btn layui-btn-xs" lay-event="top" topUrl="../complexDatagrid/edit.html" topWidth="700px" topHeight="450px" topTitle="编辑功能号信息" inputs="id:">编辑</a>
</script>
{% endraw %}
```

### 副表格demo

> 副表格需要特别注意button按钮中的 `tableId` 配置，通过配置按钮的 `tableId` 控制需要刷新的table。


> form查询条件配置

```html
<form class="layui-form" id="query_form2">
  <div class="layui-form-item">
    <input type="hidden" id="funcId" name="funcId" autocomplete="off" class="layui-input"/>
    <div class="layui-inline">
      <label class="layui-form-mid">参数：</label>
      <div class="layui-input-inline" style="width: 150px;">
        <input type="text" name="attribute" autocomplete="off" class="layui-input"/>
      </div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-mid">名称：</label>
      <div class="layui-input-inline" style="width: 150px;">
        <input type="text" name="name" autocomplete="off" class="layui-input"/>
      </div>
    </div>
    <div class="layui-inline">
      <div class="layui-input-inline">
        <button class="layui-btn layui-btn-sm" type="button" function="query" tableId="fsDatagrid2"><i class="layui-icon">&#xe615;</i>查询</button>
      </div>
    </div>
  </div>
</form>
```
> 菜单配置

```html
<div id="table_buttion_div">
  <button class="layui-btn layui-btn-sm" function="top" tableId="fsDatagrid2" topUrl="../complexDatagrid/addParam.html" topWidth="700px" topHeight="450px" isMaxWindow="" topTitle="新增参数" inputs="funcId:#funcId">
    <i class="layui-icon">&#xe654;</i>新增
  </button>
  <button class="layui-btn layui-btn-sm" function="refresh" tableId="fsDatagrid2">
    <i class="layui-icon">&#x1002;</i>刷新
  </button>
</div>
```

> 表格配置

```html
<table id="fsDatagrid2" class="fsDatagrid" lay-filter="fsDatagrid2" url="/fsbus/S1030" isLoad="0" defaultForm="query_form2" height="260" isPage="0"></table>

<div class="fsDatagridCols">
  <p type="numbers" title="#"/>
  <p field="attribute" title="参数" width="100" sort="true"/>
  <p field="name" title="名称" width="150"/>
  <p field="notEmpty" title="必输" width="80" templet="#notEmptyTpl"/>
  <p field="verifyType" title="验证类型" width="100"/>
  <p field="value" title="值" width="100"/>
  <p field="defaultValue" title="默认值" width="100"/>
  <p field="minLength" title="最小长度" width="100"/>
  <p field="maxLength" title="最大长度" width="100"/>
  <p fixed="right" align="center" toolbar="#barDemo2" title="操作" width="150"/>
</div>
{% raw %}
<script type="text/html" id="notEmptyTpl">
  {{#  if(d.notEmpty == '1'){ }}
    <span style="color: #FF5722">是</span>
  {{# } else{ }}
    <span style="color: #c2c2c2">否</span>
  {{#  } }}
</script>
{% endraw %}
<script type="text/html" id="barDemo2">
  <a class="layui-btn layui-btn-xs" lay-event="top" topUrl="../complexDatagrid/editParam.html" topWidth="700px" topHeight="510px" topTitle="编辑参数" inputs="id:">编辑</a>
  <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="submit" isConfirm="1" url="/fsbus/S1034" inputs="id:">删除</a>
</script>
```
