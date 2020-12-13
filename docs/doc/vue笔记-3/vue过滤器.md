# 过滤器

## 1. 理解过滤器

- 功能: 对要显示的数据进行特定格式化后再显示

- 注意: 并没有改变原本的数据, 可是产生新的对应的数据

## 2. 编码

- 1). 定义过滤器

```javascript
Vue.filter(filterName, function(value[,arg1,arg2,...]){
      // 进行一定的数据处理
      return newValue
    })
```

- 2). 使用过滤器

```html
<div>{{myData | filterName}}</div>
<div>{{myData | filterName(arg)}}</div>
```

需求：对当前时间进行指定格式显示

```html
    <div id="app">   
      {{date | formatDate('YYYY-MM-DD', 123)}} {{date |
      formatDate1('HH:mm:ss')}}
    </div>
```



- 一些处理日期的工具函数库：

  1. `moment` 老大哥，体积太大，现在已经不用了

  2. `dayjs` 新生代，风格和`moment`一致

  3. `date-fns`新生代，风格和`lodash`类似

- 4).局部过滤器:只有当前实例可以使用

  处理日期文本数据 --> 过滤器(专门用来格式化数据: 日期、钱...)
  
  - 网页打印内容
  
  [![DAhuE4.png](https://s3.ax1x.com/2020/11/16/DAhuE4.png)](https://imgchr.com/i/DAhuE4)
  
  - 控制台打印内容
  
  [![DAhCNj.png](https://s3.ax1x.com/2020/11/16/DAhCNj.png)](https://imgchr.com/i/DAhCNj)

```html
 <div id="root">
        {{date | formatDate('YYYY-MM-DD', 123)}} 
    </div>
<script src="https://cdn.bootcdn.net/ajax/libs/dayjs/1.9.4/dayjs.min.js"></script>
<script>
new Vue({
        el: "#test",
        data: {
          date: Date.now(),
        },
        filters: {
          formatDate(value, str, a) {
            console.log(value, str, a);
            return dayjs(value).format(str);
          },
        },
      });
</script>
```



- 3).全局过滤器：所有实例都可以使用

  直接定义在script标签的外面

  - 网页渲染内容

    [![DA4Fde.png](https://s3.ax1x.com/2020/11/16/DA4Fde.png)](https://imgchr.com/i/DA4Fde)

  - 控制台打印内容

    [![DA4VJA.png](https://s3.ax1x.com/2020/11/16/DA4VJA.png)](https://imgchr.com/i/DA4VJA)

```html
<div id="root">
    {{date | formatDate1('HH:mm:ss')}}
    </div>
<script src="https://cdn.bootcdn.net/ajax/libs/dayjs/1.9.4/dayjs.min.js"></script>
<script> 
Vue.filter("formatDate1", (value, str) => {
     	console.log(value,str)
        return dayjs(value).format(str);
      });
    new Vue({
        el:"#root",
        data:{
            date:Date.now()
        },
    })
</script>
```

