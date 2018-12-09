# 评分

评分功能主要适用于表单和表格中。

## 表单中使用

> **[warning] 如果需要使用评分功能，必须按照以下配置**

1. class样式中增加 `fsRate`  


```html
<input type="text" class="fsRate" name="modifiedBy" value="" text="true">
```

> **[info] 配置说明**

属性       | 必输 | 默认值  | 名称         | 描述
-----------|------|-------|--------------|------
length     | 否   |   5    | 评分组件中具体星星的个数        |
value      | 否   |   0    | 评分的初始值         |
theme      | 否   |`#FFB800` |主题颜色       |
half       | 否   | `false` | 是否可以选择半星     |
text       | 否   | 	`false` |是否显示评分对应的内容     |
readonly   | 否   | `false` | 	是否只读    |

配置可以参考[https://www.layui.com/doc/modules/rate.html#options](https://www.layui.com/doc/modules/rate.html#options)

## 表格中展示

> **[warning] 表格中展示评分的效果**


使用模板的方式展示评分信息，配置信息请参考表单配置。

```html
<p field="modifiedBy" title="评分" width="200" templet="#modifiedByTpl"/>


<script type="text/html" id="modifiedByTpl">
  <input type="text" class="fsRate" name="modifiedBy" value="{{ d.modifiedBy }}" readonly="readonly" text="true">
</script>

```
