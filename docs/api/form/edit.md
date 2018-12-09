# 修改操作


修改需要先通过id查询出数据，然后填充form表单展示数据，最后再通过`修改按钮`提交数据。

所以打开form表单后，需要先查询。


> **[warning] 需要在form表单标签上配置`isLoad="1"` 和 `loadUrl`**


```html
<form class="layui-form" id="edit_form" isLoad="1" loadUrl="/fsbus/1003">
  <input type="hidden" name="id">
  <div class="layui-form-item" style="text-align: center;">
    <button class="layui-btn" lay-submit="" lay-filter="edit" url="/fsbus/1004"><i class="layui-icon">&#xe642;</i>编辑</button>
    <button type="button" class="layui-btn layui-btn-primary" function="close">关闭</button>
  </div>
</form>
```

编辑按钮和新增按钮一致。

**表单属性说明**

属性     | 必输 | 默认值                   | 名称         | 描述
---------|------|-------------------------|--------------|------
isLoad   | 否   |         `0`              | 是否异步加载数据 | 1：是，0：否
loadUrl  | 否   |                        | 异步请求数据地址    |
method   | 否   |  `post`                  | 请求类型        | `post`,`get`
