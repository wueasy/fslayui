# 多数据表格使用说明

 **多个数据表格** 和 **单个数据表格** 使用方式一样，只是细节方面不一致，不对数据表格进行详细的介绍，只介绍区别。 [单个数据表格请参考](../kf/datagrid.html)  



## 多数据表格和单数据表格区别？

主要区别在于 数据表格`id`上，不同的数据表格`id`不同；  
如果想要实现多数据表格，必输指定数据表格id，也就是 `tableId` ，例如在`buttion`按钮设置 `tableId` 属性。如果不设置默认 `tableId` 为 `fsDatagrid` ，渲染数据就不是想要的操作了。  

## demo

 以下demo都有设置 `tableId`

```html
<div class="layui-row grid-demo">
  <div class="layui-col-md12">
  	<button class="layui-btn" function="top" topUrl="add.html" tableId="fsDatagrid2" topWidth="500px" topHeight="200px" topTitle="新增demo">
      <i class="layui-icon">&#xe654;</i>新增
    </button>
    <button class="layui-btn layui-btn-danger" function="submit" tableId="fsDatagrid2" url="/fsbus/1002" isSelect="1" isConfirm="1" confirmMsg="是否确定删除选中的数据？" inputs="id:">
      <i class="layui-icon">&#xe640;</i>删除
    </button>

    > <button class="layui-btn" function="refresh"
    ="fsDatagrid2">
      <i class="layui-icon">&#x1002;</i>刷新
    </button>
  </div>
  <div class="layui-col-md12">
     <table id="fsDatagrid2" lay-filter="fsDatagrid2" class="fsDatagrid" url="/fsbus/1000" isPage="1" defaultForm="query_form2" height="full-235"></table>
     <div class="fsDatagridCols">
    	<p checkbox="true"/>
        <p field="id" title="ID" width="200" sort="true"/>
        <p field="name" title="名称" width="300" sort="true"/>
        <p field="createdTime" title="创建时间" width="180"/>
        <p field="modifiedTime" title="修改时间" width="180"/>
        <p fixed="right" align="center" toolbar="#barDemo2" title="操作" width="150"/>
    </div>
	  <script type="text/html" id="barDemo2">
  	  <a class="layui-btn layui-btn-xs" lay-event="top" topUrl="edit.html" topWidth="500px" topHeight="200px" topTitle="编辑demo" inputs="id:">编辑</a>
  	  <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="submit" url="/fsbus/1002" isConfirm="1" confirmMsg="是否确定删除当前记录？" inputs="id:">删除</a>
    </script>
  </div>
</div>
```
