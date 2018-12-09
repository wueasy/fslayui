# 结果集demo

展示默认结果集数据结构。

## 分页数据

```javascript
{
  "errorNo":0, //执行结果
  "results": //返回结果集
  {
    "data": //默认结果对象
    {
      "list": //结果集合对象
      [
        {"id":432,"name":"大大大"},
        {"id":431,"name":"3246"},
        {"id":430,"name":"111"}
      ],
      "pageNum":1,//当前页
      "pageSize":10,//每页数量
      "pages":1,//总页码
      "total":3//总数量
    }
  }
}
```

## 不分页数据

> `数据字典`类都是使用此结构结果集。

```javascript
{
  "errorNo":0, //执行结果
  "results": //返回结果集
  {
    "data": //默认结果集对象
    [
      {"id":432,"name":"大大大"},
      {"id":431,"name":"3246"},
      {"id":430,"name":"111"}
    ]
  }
}
```

## 导航菜单数据

```javascript
{
  "errorNo":0, //执行结果
  "results": //返回结果集
  {
    "data": //默认结果集对象
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
  }
}
```
