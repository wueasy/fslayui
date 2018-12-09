# 日期控件

日期选择，时间选择，区间选择等操作。

http://fslayui.wueasy.com/index.html#date

> **[warning] 如果要使用日期控件，必须按照以下配置**

1. class样式中增加 `fsDate`  
2. 在input定义其他的属性

```html
<input type="text" name="createdTime" autocomplete="off" class="layui-input fsDate" dateType="datetime" />
```

> **[info] 配置说明**

属性       | 必输 | 默认值  | 名称         | 描述
-----------|------|-------|--------------|------
dateType   | 否   |        | 控件选择类型 |
dateRange  | 否   |        | 范围选择     | 1 是
dateFormat | 否   |        | 自定义格式   |
dateMin    | 否   |        | 最小日期     |
dateMax    | 否   |        | 最大日期     |

 配置属性值请参考layui官方日期配置 http://www.layui.com/doc/modules/laydate.html#options
