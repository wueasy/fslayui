
# 弹出窗口共用

> 一般对于数据表格的`新增、修改、查看详情`功能，如果弹出窗口内容一样，可以共用同一个弹出的页面。[demo](http://fslayui.wueasy.com/index.html#datagrid2)


 提供2种处理模式（主要区别区弹出窗口的html配置），根据实际情况选择使用那种方式。
1. 新增、修改功能共用一个按钮，使用同一个servlet接口提交数据，通过路由判断新增或修改；
2. 定义各自的新增或修改按钮，和普通模式一样，各自提交自己的servlet接口。


## 菜单按钮

需要在按钮中增加`topMode`标签，描述弹出的模型（add：新增窗口，edit：编辑窗口，readonly：只读窗口）。

* 新增窗口demo
```html
<button class="layui-btn" function="top" topUrl="one.html" topMode="add" topWidth="800px" topHeight="600px" topTitle="新增demo">
  <i class="layui-icon">&#xe654;</i>新增
</button>
```
* 编辑窗口demo
```html
<a class="layui-btn layui-btn-xs" lay-event="top" topUrl="one.html" topMode="edit" topWidth="800px" topHeight="600px" topTitle="编辑demo" inputs="id:">编辑</a>
```
* 查看详情demo（只读窗口）
```html
<a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="top" topUrl="one.html" topMode="readonly" topWidth="800px" topHeight="600px" topTitle="查看demo" inputs="id:">查看</a>
```


## 模式一

> 新增、修改功能共用一个按钮，使用同一个servlet接口提交数据，通过路由判断新增或修改；

此方式提交参数中会自带一个系统参数`_mode`，servlet接口通过获取此参数判断新增或修改。  
`add`:新增  
`edit`:修改


```html
<button class="layui-btn" lay-submit="" lay-filter="save" url="/fsbus/1006">保存</button>
```


## 模式二

> 定义各自的新增或修改按钮，和普通模式一样，各自提交自己的servlet接口。

**特别说明：**  
新增和编辑按钮必须设置特定的`class`样式。通过样式判断隐藏和显示。
新增按钮需要配置`fsAdd`  
编辑按钮需要配置`fsEdit`


```html
<button class="layui-btn fsAdd" lay-submit="" lay-filter="save" url="/fsbus/1001">新增</button>
<button class="layui-btn fsEdit" lay-submit="" lay-filter="edit" url="/fsbus/1004">编辑</button>
```
