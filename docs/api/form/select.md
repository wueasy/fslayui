# 下拉框


## 常规操作

原生的html下拉框写法。

```html
<select name="city" lay-verify="required">
  <option value=""></option>
  <option value="0">北京</option>
  <option value="1">上海</option>
  <option value="2">广州</option>
  <option value="3">深圳</option>
  <option value="4">杭州</option>
</select>
```


## 数据字典操作


> **[warning] 使用数据字典加载数据，统一配置样式为`fsDict`**


> 特殊说明：异步下拉框依赖 [数据字典](../pz/dict.html)


需要在`select`中配置css样式`class="fsDict"`和字典配置`dict="city"`，`addNull="1"`描述增加一个空的选项

```html
<select name="city" lay-verify="required"  lay-verType="tips" class="fsDict" dict="city" addNull="1">
</select>
```



## 联动下拉框

 联动下拉框主要在`select`中配置特定的标签，达到联动效果。

使用说明：

* select必须配置样式`fsDict`
* 联动下拉框必须配置事件监听器`lay-filter`和子选择器`childrenSelectId`
* 联动下拉框除了第一级别的需要自动加载，其他的二级以下的需要点击上级才需要加载，第二级以下的需要配置`isLoad="0"`
* 配置数据字典属性`dict`

## 联动下拉框demo

```html
<div class="layui-form-item">
  <label class="layui-form-label">省份</label>
  <div class="layui-input-inline" style="width: 100px;">
    <select name="area1" lay-filter="xxxxxx1" class="fsDict" dict="area1" addNull="1" childrenSelectId="xxxxxx2">
    </select>
  </div>
  <label class="layui-form-label">城市</label>
  <div class="layui-input-inline" style="width: 100px;">
    <select id="xxxxxx2" name="area2" lay-filter="xxxxxx2" class="fsDict" isLoad="0" dict="area2" addNull="1" childrenSelectId="xxxxxx3">
    </select>
  </div>
  <label class="layui-form-label">区</label>
  <div class="layui-input-inline" style="width: 100px;">
    <select id="xxxxxx3" name="area3" class="fsDict" isLoad="0" dict="area3" addNull="1">
    </select>
  </div>
</div>
```


## 配置说明

属性        | 必输 | 默认值   | 名称       | 描述
------------|------|----------|------------|------
id          | 是   |          | 选择器id   | 唯一id
lay-filter  | 否   |          | 事件过滤器 | 联动下拉框必须配置，点击事件处理
class       | 是   |          | 样式       | 下拉框异步加载必须有`fsDict`样式
isLoad      | 否   |   1      | 是否自动加载| 默认自动加载，只有增加`fsDict`才有效，1：加载；0：不加载
addNull     | 否   |   0      | 是否追加空   | 是否追加空选择项，1：是，0：否
dict        | 是   |          | 字典属性     | 指向数据字典信息
childrenSelectId | 否 |       | 子选择性id   | 联动下拉框使用，用于配置点击后，需要加载的子select
