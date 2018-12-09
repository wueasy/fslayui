# 创建一个表单

表单通常使用在查询条件、新增数据、展示数据、修改数据等应用场景。


**表格请按照以下步骤来使用。**

## 引入框架基础文件

[参考地址](../jc/frame.html)


## 创建一个form表单

框架基础文件引入后，我们需要先创建一个`form`表单，表单用于描述我们的业务属性。


以下是一个很简单的表单demo，描述业务的基础信息。表单样式等属性，可以参考https://www.layui.com/doc/element/form.html


```html
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
  <div class="layui-form-item layui-form-text">
    <label class="layui-form-label">描述</label>
    <div class="layui-input-block">
      <textarea id="description" name="description" placeholder="请输入描述" class="fsLayedit" height="80"></textarea>
    </div>
  </div>
  <hr/>
  <div class="layui-form-item" style="text-align: center;">
    <button class="layui-btn" lay-submit="" lay-filter="save">新增</button>
  </div>
</form>
```

表单创建好后，怎么结合我们的业务处理呢？请参考下面的介绍
