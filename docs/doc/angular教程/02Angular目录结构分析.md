## 一、目录结构分析

<img src="https://s3.ax1x.com/2021/02/01/yVxPa9.png" alt="yVxPa9.png" border="0" />

详情参考：https://www.angular.cn/guide/file-structure

## 二、 app.module.ts、组件分析

### 1. app.module.ts

定义 AppModule，这个根模块会告诉 Angular 如何组装该应用。 目前，它只声明了 AppComponent。 稍后它还会声明更多组件。

<img src="https://s3.ax1x.com/2021/02/01/yVxmrD.png" alt="yVxmrD.png" border="0" />

### 2.自定义组件

 https://cli.angular.io/

创建组件：

```sh
 ng g component components/header
```

组件内容详解：

```js
import { Component, OnInit } from '@angular/core'; /*引入 angular 核心*/
@Component({
selector: 'app-header', /*使用这个组件的名称*/
templateUrl: './header.component.html', /*html 模板*/
styleUrls: ['./header.component.css'] /*css 样式*/
})
export class HeaderComponent implements OnInit { /*实现接口*/
constructor() { /*构造函数*/
}
ngOnInit() { /*初始化加载的生命周期函数*/
}
}
```

### 三、绑定数据

Angular 中使用{{}}绑定业务逻辑里面定义的数据

```html
<h1>{{title}}</h1>
```

