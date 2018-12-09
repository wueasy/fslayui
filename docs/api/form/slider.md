# 滑块

滑块功能主要适用于表单和表格中。

## 表单中使用

> **[warning] 如果需要使用滑块功能，必须按照以下配置**

1. class样式中增加 `fsSlider`  


```html
<input type="text" class="fsSlider" name="city" range="false" input="true" tips="KB" value="" min="10" max="60" showstep="true" step="10" theme="#FF5722">
```

> **[info] 配置说明**

属性       | 必输 | 默认值  | 名称         | 描述
-----------|------|-------|--------------|------
type     | 否   |   default  | 滑块类型     | 可选值有：default（水平滑块）、vertical（垂直滑块）
min      | 否   |   0    | 最小值         | 滑动条最小值，正整数，默认为 0
max      | 否   |100      |最大值       | 	滑动条最大值
range       | 否   | `false` | 是否开启滑块的范围拖拽     | 若设为 true，则滑块将出现两个可拖拽的环
value       | 否   | 0  |滑块初始值   | 若开启了滑块为范围拖拽（即 `range: true`），则需赋值字符串，异表示开始和结尾的区间，如：`value: 30,60`
step   | 否   |  1 | 	拖动的步长	    |
showstep   | 否   | `false` | 	是否显示间断点    |
tips   | 否   | `true` | 	是否显示文字提示    |
input   | 否   | `false` | 	是否显示输入框    |
height   | 否   |  200 | 	滑动条高度    | 需配合 `type:"vertical"` 参数使用
disabled   | 否   | `false` | 是否将滑块禁用拖拽    |
theme   | 否   | `#009688` | 	主题颜色    |


配置可以参考[https://www.layui.com/doc/modules/slider.html#options](https://www.layui.com/doc/modules/slider.html#options)

## 表格中展示

> **[warning] 表格中展示滑块的效果**


使用模板的方式展示滑块信息，配置信息请参考表单配置。

```html
<p field="city" title="滑块" width="200" templet="#cityTpl"/>


<script type="text/html" id="cityTpl">
  <input type="text" class="fsSlider" name="city" range="false" tips="KB" value="{{ d.city }}" min="10" max="60" disabled="true" showstep="true" step="10" theme="#FF5722">
</script>

```
