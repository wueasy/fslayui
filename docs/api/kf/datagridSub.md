# 表格数据提交

提交表格数据，把表格中的数据，同时提交到服务端接口。

有两种操作方式：

1. 在表格中新增一个空白行，表格中编辑当前行（只能支持文本框方式）
2. 在表格中新增弹出一个编辑的窗口，在窗口中修改当前行的数据


## 表格中编辑

> **[info] `数据表格编辑`主要使用场景：新增或编辑同时需要提交多条记录(原有模式只支持单条记录提交)，通过编辑数据表格，`保存`获取所有表格数据提交。**


静态表格编辑和普通数据表格使用上没有区别，只需要在原有的基础上做一些配置或修改。  
[数据表格使用说明](../kf/datagrid.html)

### 表格列设置可以编辑

表格如果需要编辑，那么只需要在编辑的列上增加`edit="text"`即可，目前只支持`文本框输入`。


```html
<div class="fsDatagridCols">
  <p type="numbers" title="#" />
  <p field="attribute" edit="text" title="参数" width="150"/>
  <p field="name" edit="text" title="名称" width="200"/>
  <p field="value" edit="text" title="值" width="130"/>
  <p field="defaultValue" edit="text" title="默认值" width="130"/>
  <p fixed="right" align="center" toolbar="#barDemo" title="操作" width="100" />
</div>
```

### 表格新增行

* 需要为表格增加一行空的记录，需要怎么做？

框架本身已经处理好了，我们只需要在`按钮`配置`function="addRow"`，描述点击按钮后，增加一个记录。

> **[warning] 特殊说明： 如果表格的id不是默认的`fsDatagrid`，那么需要在按钮上配置`tableId="addFsDatagrid"`，指向对应的表格id，这点与`普通数据表格`使用一致。**

```html
<button class="layui-btn layui-btn layui-btn-sm" function="addRow" tableId="addFsDatagrid">
  <i class="layui-icon">&#xe654;</i>新增
</button>
```


### 表格删除行

> 表格删除行，目前只支持在表格内配置一个模板，模板里面配置删除按钮。


配置事件监听`lay-event="delRow"`描述删除行操作。

如果需要删除确认提示，可以配置`isConfirm="1"`，不需要配置为0或者不配置即可。


```html
<a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="delRow" isConfirm="1" confirmMsg="是否确定删除当前记录？">删除</a>
```

### 表格初始化数据查询处理

> 对于新增页面，没有这个处理，对于编辑页面，需要先把之前保存的数据提取出来，对原有的数据进行操作，那么就需要做这个处理。

使用步骤：
1. 配置`table`表格中异步加载地址`url="/fsbus/S1030"`
2. 配置`table`表格中业务参数，主要用在异步加载传入的参数`inputs="funcId:$id"`


**注意：**  
这里的`inputs`中的配置数据不是数据表格选中的行，而是打开此页面url地址中的参数。



```html
<table id="addFsDatagrid" lay-filter="addFsDatagrid" class="fsDatagrid" groupId="test" url="/fsbus/S1030"
isLoad="0" isPage="0" height="200" inputs="funcId:$id"></table>
```



## 弹出窗口编辑

> **[info] `弹出窗口编辑`主要是在`表格中编辑`基础上通过弹出窗口中进行编辑。**


### 新增按钮

新增窗口，主要配置`function="topAddRow"`

```html
<button class="layui-btn layui-btn layui-btn-sm" function="topAddRow" tableId="addFsDatagrid" topUrl="views/staticDatagrid/addRow.html" topWidth="700px" topHeight="275px" isMaxWindow="" topTitle="新增信息">
  <i class="layui-icon">&#xe654;</i>新增弹窗
</button>
```

### 修改按钮

弹窗窗口编辑

```html
<a class="layui-btn layui-btn-xs" lay-event="topEditRow" topUrl="views/staticDatagrid/addRow.html" topWidth="700px" topHeight="275px" isMaxWindow="" topTitle="修改信息">修改</a>
```

### 新增或修改页面

需要在提交按钮中配置`lay-filter="addRow"`

```html
<form class="layui-form" isLoad="1" loadFuncNo="">
  <div class="layui-form-item">
    <label class="layui-form-label">参数</label>
    <div class="layui-input-inline">
      <input type="text" name="attribute" required="" lay-verType="tips" lay-verify="required" placeholder="请输入参数" autocomplete="off" class="layui-input"/>
    </div>
    <label class="layui-form-label">名称</label>
    <div class="layui-input-inline">
      <input type="text" name="name" required="" lay-verType="tips" lay-verify="required" placeholder="请输入名称" autocomplete="off" class="layui-input"/>
    </div>
  </div>
  <div class="layui-form-item">
    <label class="layui-form-label">值</label>
    <div class="layui-input-inline">
      <input type="text" name="value" autocomplete="off" class="layui-input"/>
    </div>
    <label class="layui-form-label">默认值</label>
    <div class="layui-input-inline">
      <input type="text" name="defaultValue"  autocomplete="off" class="layui-input"/>
    </div>
  </div>
  <hr/>
  <div class="layui-form-item" style="text-align: center;">
      <button class="layui-btn" lay-submit="" lay-filter="addRow">新增</button>
      <button type="button" class="layui-btn layui-btn-primary" function="close">关闭</button>
  </div>
</form>
```


## 保存操作

点击保存按钮后，需要怎么获取到表格里面的数据？怎么把数据提交后台处理？

1. 保存按钮配置

  `function="save"` 描述保存操作  
  `groupId="test"` 配置分组id，配置后会获取这个分组的所有数据  
  `url="/fsbus/1007"` 配置提交数据的url地址

  ```html
  <button class="layui-btn fsAdd" function="save" groupId="test" url="/fsbus/1007"><i class="layui-icon">&#xe609;</i>新增</button>
  ```

2. 表格配置

 `groupId="test"` 配置分组id，配置后保存按钮会获取到这个表格的数据

  ```html
  <table id="addFsDatagrid" lay-filter="addFsDatagrid" class="fsDatagrid" groupId="test" url="/fsbus/S1030"
  isLoad="0" isPage="0" height="200" inputs="funcId:$id"></table>
  ```


## 请求参数说明

表格提交默认的参数为： `fsTableData` ，对应的值是一个编码后的json字符串，后台获取值后需要解码。

* java 解码demo

```java
try {
  fsTableData = URLDecoder.decode(fsTableData, "UTF-8");
} catch (UnsupportedEncodingException e) {
}
```


## 提交模式

!> 表格的参数分为2个类型，1：原数据提交，2：增删改标签提交（fsType）  
默认为1，可以在`fsConfig.js`中配置`datagridSubmitType`，两种模式各有各的优缺点，根据自己的要求修改。

### 模式一(原数据提交)

此模式会自动获取数据表格的原数据，不会做任何其他的数据，所以在编辑的时候，需要先删除以前的数据，然后重新新增。

例如：

```json
[{"LAY_TABLE_INDEX":0,"attribute":"test1","name":"测试1"},{"LAY_TABLE_INDEX":1,"attribute":"test2","name":"测试2"}]
```

### 模式二(增删改标签提交)

此模式在数据表格原数据基础上新增了一个系统参数`fsType`，可以通过这个参数来判断当前记录的操作模式(新增，修改，删除)。

`fsType`参数说明：
  `add` : 新增
  `edit` : 修改
  `del` : 删除

例如：

```json
[{"attribute":"2121","createdTime":"2017-12-20 14:33:03","defaultValue":"2121","funcId":"393028361208020992","id":"393048159182733312","modifiedTime":"2017-12-20 14:33:03","name":"1221","orderline":"393048159182733312","value":"2121","LAY_TABLE_INDEX":0,"fsType":"edit"},{"fsType":"add","LAY_TABLE_INDEX":1,"attribute":"121212","name":"22"},{"attribute":"3223","createdTime":"2017-12-20 14:33:03","defaultValue":"23","description":"2323","funcId":"393028361208020992","id":"393048159178539008","maxLength":"3223","minLength":"3232","modifiedTime":"2017-12-20 14:34:01","name":"3223","notEmpty":"1","orderline":"393048159178539008","type":"1","value":"323232","verifyType":"Numeric","fsType":"del"}]
```



## 完整表格demo

```html
<div class="layui-row grid-demo">
  <div class="layui-col-md3">
    <button class="layui-btn layui-btn layui-btn-sm" function="addRow" tableId="addFsDatagrid">
      <i class="layui-icon">&#xe654;</i>新增
    </button>
  </div>
  <div class="layui-col-md12">
    <table id="addFsDatagrid" lay-filter="addFsDatagrid" class="fsDatagrid" groupId="test" url="/fsbus/S1030"
    isLoad="0" isPage="0" height="200" inputs="funcId:$id"></table>

    <div class="fsDatagridCols">
      <p type="numbers" title="#" />
      <p field="attribute" edit="text" title="参数" width="150"/>
      <p field="name" edit="text" title="名称" width="200"/>
      <p field="value" edit="text" title="值" width="130"/>
      <p field="defaultValue" edit="text" title="默认值" width="130"/>
      <p fixed="right" align="center" toolbar="#barDemo" title="操作" width="100" />
    </div>
    <script type="text/html" id="barDemo">
      <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="delRow" isConfirm="1" confirmMsg="是否确定删除当前记录？">删除</a>
    </script>
  </div>
</div>
<div style="text-align: center;">
  <button class="layui-btn fsAdd" function="save" groupId="test" url="/fsbus/1007"><i class="layui-icon">&#xe609;</i>新增</button>
  <button class="layui-btn fsEdit" function="save" groupId="test" url="/fsbus/1008"><i class="layui-icon">&#xe609;</i>修改</button>
  <button type="button" class="layui-btn layui-btn-primary" function="close">关闭</button>
</div>
```


## 效果图

![效果图](../images/2017-12-20_17-29-51.gif)
