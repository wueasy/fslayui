# 附件上传

上传附件或图片。


## 单文件上传

> 上传附件需要配置一个input输入框和buttion按钮  
通过选择按钮弹出上传窗口，上传成功后，自动把附件地址填充输入框。  


上传接口url地址需要在 `fsConfig.js` 中配置

```javascript
fsConfig["global"] = {
  "uploadUrl" : "https://fs.fallsea.com/upload", //上传附件url
  "uploadHtmlUrl" : "/plugins/frame/views/upload.html" //上传附件html地址，默认/plugins/frame/views/upload.html
}
```


> 上传demo

```html
<div class="layui-form-item layui-form-text">
  <label class="layui-form-label">附件</label>
  <div class="layui-input-inline">
    <input type="text" id="filePath" name="filePath" autocomplete="off" disabled="disabled" class="layui-input"/>
  </div>
  <div class="layui-input-inline">
	 <button type="button"  class="layui-btn" function="upload" fileElem="#filePath" fileAccept="file" fileExts="" fileSize="1024" inputs="type:test">上传图片</button>
  </div>
</div>
```

> buttion属性配置  
详细配置可以参考官方配置 http://www.layui.com/doc/modules/upload.html#options


属性       | 必输 | 默认值 | 名称         | 描述
-----------|------|-------|-------------|------
function   | 是   |       | 方法名称     | 上传必须指定 `upload`
fileElem   | 是   |       | 指向容器选择器 | 如：`elem: '#id'`。也可以是DOM对象，主要上传成功后，填充上传后的地址
fileAccept | 否   | images| 指定允许上传的文件类型 |可选值有：`images`（图片）、`file`（所有文件）、`video`（视频）、`audio`（音频）
fileExts   | 否   |       | 允许上传的文件后缀 |一般结合 accept 参数类设定。假设 accept 为 file 类型时，那么你设置 `exts: 'zip&#124;rar&#124;7z'` 即代表只允许上传压缩格式的文件。如果 accept 未设定，那么限制的就是图片的文件格式
fileSize   | 否   |     | 设置文件最大可允许上传的大小 |单位 KB。不支持ie8/9，默认不限制
inputs     | 否   |      | 参数 | 自定义需要传入的参数

> **inputs参数说明**

1. 把当前选中的行id传入请求，可以配置 **id:**
2. 传入固定的指，可以配置 **属性:值** ,示例： **state:1**
3. 传入的参数取某一个输入框的值，可以配置 **属性:#输入框id** ，示例：**name:#name**
4. 需要传多个参数直接通过 **逗号** 分割，示例： **id:,state:1**


![form表单](../images/20171117133848.png)
![上传](../images/20171117133915.png)
