
# 引入框架基础文件

以下为引入框架的基础问题，可以根据需要来引入。


```html
<link href="/plugins/pace/themes/pink/pace-theme-flash.css" rel="stylesheet"/>
<script src="/plugins/pace/pace.min.js"></script>
<link href="/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet"/>
<script type="text/javascript" src="/plugins/jquery/jquery.min.js"></script>
<link rel="stylesheet" href="/plugins/ztree/css/zTreeStyle/zTreeStyle.css" type="text/css"/>
<script type="text/javascript" src="/plugins/ztree/js/jquery.ztree.all.min.js"></script>
<link href="/plugins/toastr/toastr.min.css" rel="stylesheet"/>
<script src="/plugins/toastr/toastr.min.js"></script>
<link rel="stylesheet" type="text/css" href="/plugins/layui/css/layui.css" media="all"/>
<script type="text/javascript" src="/plugins/encrypt/jsencrypt.min.js"></script>
<link href="/plugins/contextMenu/jquery.contextMenu.min.css" rel="stylesheet"/>
<script src="/plugins/contextMenu/jquery.contextMenu.min.js"></script>
<link rel="stylesheet" type="text/css" href="/css/fs.css?v=2.0.0" media="all"/>
<script type="text/javascript" src="/plugins/layui/layui.js"></script>
<script type="text/javascript" src="/plugins/frame/js/fsDict.js?v=2.0.0"></script>
<script type="text/javascript" src="/plugins/frame/js/fs.js?v=2.0.0"></script>
<script type="text/javascript" src="/plugins/frame/js/frame.js?v=2.0.0"></script>
```

# 详细说明

## 加载进度条

如果需要页面加载进度条，可以通过引入此项。

```html
<link href="/plugins/pace/themes/pink/pace-theme-flash.css" rel="stylesheet"/>
<script src="/plugins/pace/pace.min.js"></script>
```

## 图标库

`layui`官方默认图标较少，可以使用`font-awesome`图标库。

```html
<link href="/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet"/>
```
## 引入jquery

```html
<script type="text/javascript" src="/plugins/jquery/jquery.min.js"></script>
```

## ztree树组件

树形结构，模式使用`ztree`。

```html
<link rel="stylesheet" href="/plugins/ztree/css/zTreeStyle/zTreeStyle.css" type="text/css"/>
<script type="text/javascript" src="/plugins/ztree/js/jquery.ztree.all.min.js"></script>
```

## 提示组件

`toastr`消息提示组件。

```html
<link href="/plugins/toastr/toastr.min.css" rel="stylesheet"/>
<script src="/plugins/toastr/toastr.min.js"></script>
```

## 右键菜单

鼠标右键菜单组件。

```html
<link href="/plugins/contextMenu/jquery.contextMenu.min.css" rel="stylesheet"/>
<script src="/plugins/contextMenu/jquery.contextMenu.min.js"></script>
```

## 加密库

前端js加密库组件。

```html
<script type="text/javascript" src="/plugins/encrypt/jsencrypt.min.js"></script>
```

## 引入layui

引入`layui`框架。

> **[danger] 重要：只能引入`layui.js`，不能引入`layui.all.js`**

```html
<link rel="stylesheet" type="text/css" href="/plugins/layui/css/layui.css" media="all"/>
<script type="text/javascript" src="/plugins/layui/layui.js"></script>
```


## 引入框架样式

引入`fsLayui`框架样式文件。


```html
<link rel="stylesheet" type="text/css" href="/css/fs.css?v=2.0.0" media="all"/>
```

## 引入数据字典文件

引入`fsDict`数据字典文件。


```html
<script type="text/javascript" src="/plugins/frame/js/fsDict.js?v=2.0.0"></script>
```

## 引入框架核心文件

引入`fs`框架核心文件。

```html
<script type="text/javascript" src="/plugins/frame/js/fs.js?v=2.0.0"></script>
```

## 引入框架主页面

引入`main`框架主页面，主页使用。

```html
<script type="text/javascript" src="/plugins/frame/js/main.js"></script>
```

## 引入框架入口页面

引入`frame`框架入口页面，其他页面的入口页面。

```html
<script type="text/javascript" src="/plugins/frame/js/frame.js?v=2.0.0"></script>
```
