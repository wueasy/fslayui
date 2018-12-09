# 回调事件

## 页面初始化完成后回调事件

> 表单初始化后，执行的回调事件

事件基对象：`layui.fsCallback.form.[formId]`

事例：如果form表单id为`demoFromId`，那么需要定义的回调函数为`layui.fsCallback.form.demoFromId`


> 函数传入的对象为`thisForm`对象，也就是`fsForm`对象，可以使用里面的方法。


```javascript
layui.fsCallback.form.demoFromId=function(thisForm){
  //业务处理

}
```

## 提交成功后回调事件

> 提交表单数据，请求成功后的回调事件处理

事件基对象：`layui.fsRequestSuccessCallback.[事件名称]`

事例名称：如果提交按钮的`requestSuccessCallback`为`test`，那么需要定义的回调函数为`layui.fsRequestSuccessCallback.test`


> 需要在按钮中增加回调属性`requestSuccessCallback`


```html
<button class="layui-btn" lay-submit lay-filter="test1" requestSuccessCallback="test" url="/fsbus/DEMO1002">提交</button>
```

```javascript
//result:返回结果集
//_this:fsForm对象，可以调用里面的方法
layui.fsRequestSuccessCallback.test = function(result,_this,fsCommon){
  console.log(result);
  fsCommon.successMsg("回调成功1");
}
```
