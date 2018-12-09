# 树+数据表格使用说明

左边展示树，右边展示数据表格；点击左边的树，查询右边的表格数据。

树依赖[ztree](http://www.treejs.cn)插件

## 树列表数据展示

> 数据展示请参考 [树使用说明](../kf/tree.html)


```html
<ul id="treeDemo" class="ztree fsTree" isRoot="1" url="/fsbus/S1003" treeIdKey="id" treePIdKey="pId" treeName="name" ></ul>
```


## 树点击事件处理

> 点击树加载数据表格数据，只需要在`ul`标签中配置`clickCallbackId="fsDatagrid"`， 其中`fsDatagrid`是表格id，如果需要参数，需要配置项`clickCallbackInputs="menuId:$id"`


```html
<ul id="treeDemo" class="ztree fsTree" isRoot="1" url="/fsbus/S1003" clickCallbackId="fsDatagrid" clickCallbackInputs="menuId:$id" treeIdKey="id" treePIdKey="pId" treeName="name" ></ul>
```

> 配置说明

属性               | 必输 | 默认值   | 名称       | 描述
-------------------|------|----------|------------|------
clickCallbackId    | 是   |          | 表格id     | 需要加载表格的id
clickCallbackInputs| 否   |          | 业务参数   | 配置业务参数后，会自动给数据表格对应的form表单赋值


> **clickCallbackInputs参数说明**

1. 把当前选中的行id传入请求，可以配置 `id:`
2. 传入固定的指，可以配置 `属性:值` ,示例： `state:1`
3. 传入的参数和选中的参数不一样，可以配置 `属性:$对应值的属性` ，示例：`uid:$id`
4. 传入的参数取某一个输入框的值，可以配置 `属性:#输入框id` ，示例：`name:#name`
5. 需要传多个参数直接通过 `,` 分割，示例： `id:,state:1`


## 数据表格配置

**树+数据表格** 和 **普通数据表格** 没有任何区别，配置信息可以参考普通表格配置：[数据表格](../kf/datagrid.html)


```html
<div class="layui-field-box">
  <div class="layui-col-md12 layui-col-space1">
    <div id="table_buttion_div">
      <form id="query_form" style="display: none;">
        <input type="text" id="menuId" name="menuId" value="0"/>
      </form>
      <button class="layui-btn" function="top" topUrl="addFunc.html" topWidth="700px" topHeight="350px" topTitle="新增功能号信息" inputs="menuId:#menuId">
        <i class="layui-icon">&#xe654;</i>新增
      </button>
      <button class="layui-btn" function="refresh">
        <i class="layui-icon">&#x1002;</i>刷新
      </button>
    </div>
  </div>
  <div class="layui-col-md12 layui-col-space1">
    <table id="fsDatagrid" class="fsDatagrid" lay-filter="fsDatagrid" url="/fsbus/S1009" isPage="0" defaultForm="query_form"></table>
    <div class="fsDatagridCols">
      <p type="numbers" title="#"/>
      <p checkbox="true"/>
      <p field="name" title="名称" width="200" sort="true"/>
      <p field="linkUrl" title="访问地址" width="300"/>
      <p field="funcs" title="功能号" width="200"/>
      <p fixed="right" align="center" toolbar="#barDemo" title="操作" width="150"/>
    </div>
    <script type="text/html" id="barDemo">
      <a id="edit" class="layui-btn layui-btn-xs" lay-event="top" topUrl="editFunc.html" topWidth="700px" topHeight="350px" isSelect="1" topTitle="编辑功能号信息" inputs="id:">编辑</a>
      <a id="del" class="layui-btn layui-btn-danger layui-btn-xs" lay-event="submit" isConfirm="1" url="/fsbus/S1013" inputs="id:">删除</a>
    </script>
  </div>
</div>
```
