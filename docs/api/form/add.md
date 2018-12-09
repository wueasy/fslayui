# 新增操作

新增数据，提交表单的数据。


> **[warning] 新增只需要关注按钮配置，form表单基于`layui.form`监听提交事件，不需要配置function，直接在按钮中配置提交地址`url`即可**


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
    <button class="layui-btn" lay-submit="" lay-filter="save" url="/fsbus/1001">新增</button>
    <button type="button" class="layui-btn layui-btn-primary" function="close">关闭</button>
  </div>
</form>
```

配置后，自动向`url="/fsbus/1001"`接口请求。
