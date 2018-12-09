# 富文本编辑器

富文本编辑器使用的是`tinymce`，[官网地址](https://www.tinymce.com/)


## 引入框架文件

由于富文本编辑器不是必须的，框架不会自动引入，需要手动引入，在需要的时候引入。

```html
<script type="text/javascript" src="../../plugins/tinymce/tinymce.min.js"></script>
<script type="text/javascript" src="../../plugins/tinymce/jquery.tinymce.min.js"></script>
```


## 定义富文本编辑器

使用富文本编辑器需要在`textarea`中制定样式`fsEditor`

```html
<textarea id="description" name="description" class="fsEditor" height="80"></textarea>
```

属性       | 必输 | 默认值 | 名称         | 描述
-----------|------|-------|-------------|------
id         | 是   |       | id     |
name       | 是   |       | 属性名    |
class      | 是   |       | 样式   | 必须指定`fsEditor`
height   | 否   |       |  高度 |  富文本高度
