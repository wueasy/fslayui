# 树使用说明

依赖[ztree](http://www.treejs.cn)插件

## 引入框架基础文件

[参考地址](../jc/frame.html)

## 数据展示

> 通过配置异步请求地址，自动加载数据并渲染

```html
<ul id="treeDemo" class="ztree fsTree" isRoot="1" url="/fsbus/S1003"  treeIdKey="id" treePIdKey="pId" treeName="name"></ul>
```

> 配置说明

属性        | 必输 | 默认值   | 名称       | 描述
------------|------|----------|------------|------
id          | 是   |          | 树id     |
class       | 是   |          | 样式       | 必须有 `ztree fsTree` 样式
url         | 是   |          | 请求地址   | ajax异步加载数据地址
method      | 否   |  post    | 请求类型   | `post`,`get`
isRoot      | 否   |    1     | 是否显示根目录   | 1 显示,0 不显示
treeName    | 是   |          | 显示名称对应的属性| 配置需要显示的字段属性
treeIdKey   | 是   |          | 树id对应的属性   |
treePIdKey  | 是   |          | 树上级id对应的属性 |
checkType   | 否   |          | 选择框配置   | `checkbox`:复选框，`radio`:单选框
isDrag      | 否   |    0     | 是否允许拖拽 | 1 是，0 否



## 右键菜单配置

> 对树进行增删改查操作

如以下示例，必须在树`ul`标签下，配置一个`div`,并且class为`fsTreeRightMenu`，通过`p`标签代表右键按钮列表

```html
<div class="fsTreeRightMenu">
  <p function="refresh" icon="refresh" name="刷新"></p>
  <p function="top" icon="add" name="新增" topUrl="views/treeDatagrid/add.html" topWidth="700px" topHeight="460px" topTitle="新增菜单信息" inputs="parentId:$id"></p>
  <p function="top" icon="edit" name="编辑" topUrl="views/treeDatagrid/edit.html" topWidth="700px" topHeight="460px" topTitle="编辑菜单信息" inputs="menuId:$id" disabledType="rootNode"></p>
  <p function="submit" icon="del" name="删除" url="/fsbus/S1007" isConfirm="1" confirmMsg="是否确定删除？" inputs="menuId:$id" disabledType="parent|rootNode"></p>
</div>
```

> 配置说明

属性        | 必输 | 默认值   | 名称       | 描述
------------|------|----------|------------|------
function    | 是   |          | 系统函数    | `refresh`：刷新，`top`：打开窗口，`submit`：提交请求
icon        | 否   |          | 图标       | 图标配置
name        | 是   |          | 菜单名称   |
topUrl     | 否   |                         | 弹出窗口地址 | 事件监听为top，此属性必输
topWidth   | 否   |   700px                 | 弹出窗口宽度 |
topHeight  | 否   |   400px                 | 弹出窗口高度 |
isMaximize | 否   |       0                 | 弹出窗口是否最大化 | 1：是， 0：否
topTitle   | 否   |                         | 弹出窗口标题 |
topMode    | 否   |                         | 弹出窗口模型 | add：新增窗口，edit：编辑窗口，readonly：只读窗口； **新增、修改、查看共用同一个页面使用**
url        | 否   |                         | 提交请求地址 | 事件监听为submit，此属性必输
method     | 否   |  post                   | 请求类型     | `post`,`get`
isConfirm  | 否   |    0                    | 是否确认提示 | 1：是，0：否
confirmMsg | 否   | 是否确定操作选中的数据?   | 确认提示内容 |
inputs     | 否   |                         | 业务参数     | 自定义需要传入的参数
disabledType| 否  |            | 禁用模式 | 菜单是否可以点击，`parent`：父栏目禁用，`rootNode`：根节点禁用


## 回调事件

> 树初始化后，执行的回调事件

事件基对象：`layui.fsCallback.tree.[treeId]`

事例：如果树表单id为`demoTreeId`，那么需要定义的回调函数为`layui.fsCallback.tree.demoTreeId`


> 函数传入的对象为`thisTree`对象，也就是`fsTree`对象，可以使用里面的方法。


```javascript
layui.fsCallback.tree.demoTreeId=function(thisTree){
  //业务处理
  
}
```
