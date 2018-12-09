# 复选框

复选框有两种使用模式。
1. 常规操作，直接定义好选择项
2. 使用数据字典操作，通过字典方式自动填充选择项



## 常规操作

使用标准的html写法。写好html内容。

```html
<input type="checkbox" name="like" value="写作" title="写作">
<input type="checkbox" name="like" value="阅读" title="阅读">
<input type="checkbox" name="like" value="发呆" title="发呆">
```


## 数据字典操作

> **[warning] 如果需要使用复选框数据依赖`数据字典`，必须按照以下配置**

1. class样式中增加 `fsDict`  
2. 必须配置字典信息`dict`

```html
<input type="checkbox" name="type" class="fsDict" dict="type" lay-skin="primary">
```

> **[info] 配置说明**

属性       | 必输 | 默认值  | 名称         | 描述
-----------|------|-------|--------------|------
class      | 是   |        | 样式         | 必须指定`fsDict`
dict       | 是   |        | 字典信息     | 对应`fsDict.js`中字典
lay-skin   | 否   |        | 复选框风格   |
