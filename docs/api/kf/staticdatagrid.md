
# 表单和数据表格同时提交

> 主要实现`主表、附表`同时新增或修改操作。  


## 表单提交


> 这里的表单和普通表单处理一致，没有任何区别，包含表单验证等处理。


### 基础使用

点击保存按钮后，需要怎么获取到表格里面的数据？怎么把数据提交后台处理？


1. 保存按钮配置

  `function="save"` 描述保存操作  
  `groupId="test"` 配置分组id，配置后会获取这个分组的所有数据  
  `url="/fsbus/1007"` 配置提交数据的url地址

  ```html
  <button class="layui-btn fsAdd" function="save" groupId="test" url="/fsbus/1007"><i class="layui-icon">&#xe609;</i>新增</button>
  ```

2. 表单配置

   `groupId="test"` 配置分组id，配置后保存按钮会验证表单并且获取这个表单的数据

  ```html
<form class="layui-form" groupId="test">
  ```

### 请求参数说明

表单提交默认的参数为： `fsFormData` ，对应的值是一个编码后的json字符串，后台获取值后需要解码。

* java 解码demo

```java
try {
  fsFormData = URLDecoder.decode(fsFormData, "UTF-8");
} catch (UnsupportedEncodingException e) {
}
```

### 特殊说明

 `提交按钮`可以在form表单中，也可以不在form表单中，但是必须指定按钮为普通按钮，不能是`submit`提交按钮。


## 表格数据提交

请参考
[数据表格编辑](../kf/editdatagrid.html)


## 表单和表格同时提交

> 如果表单和表格数据需要同时提交，那么只需要保证`groupId` 是一致的即可。


## 效果图

![效果图](../images/2017-12-20_17-29-51.gif)
