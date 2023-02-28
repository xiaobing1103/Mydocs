## 一、创建 angualr 组件

Angular CLI: 

https://cli.angular.io/

创建组件 

```sh
ng g component components/header
```

使用组件

```html
<app-header></app-header>
```

## 二、Angular 绑定数据

### 1. 数据文本绑定

```html
<h1>{{title}}</h1>
<div>
1+1={{1+1}
</div>
```

### 2.绑定 html

```html
this.h="<h2>这是一个 h2 用[innerHTML]来解析</h2>"
```

```html
<div [innerHTML]="h"></div>
```



## 二、绑定属性

```html
<div [id]="id" [title]="msg">调试工具看看我的属性</div>
```

<img src="https://s3.ax1x.com/2021/02/01/yVz9Qf.png" alt="yVz9Qf.png" border="0" />



## 三、数据循环 *ngFor

### 1、*ngFor 普通循环

```html
<ul>
<li *ngFor="let item of list">
{{item}}
</li>
</ul>
```

### 2、循环的时候设置 key

```html
<ul>
<li *ngFor="let item of list;let i = index;">
{{item}} --{{i}}
</li>
</ul>
```

### 3.template 循环数据

```html
<ul>
<li template="ngFor let item of list">
{{item}}
</li>
</ul>
```



## 四、条件判断 *ngIf

```html
<p *ngIf="list.length > 3">这是 ngIF 判断是否显示</p>
```

```html
<p template="ngIf list.length > 3">这是 ngIF 判断是否显示</p>
```



## 五、 *ngSwitch

```html
<ul [ngSwitch]="score">
<li *ngSwitchCase="1">已支付</li>
<li *ngSwitchCase="2">订单已经确认</li>
<li *ngSwitchCase="3">已发货</li>
<li *ngSwitchDefault>无效</li>
</ul>
```

​	

##六、执行事件 (click)=”getData()”

```html
<button class="button" (click)="getData()">
点击按钮触发事件
</button>
<button class="button" (click)="setData()">
点击按钮设置数据
</button>
```

```js
getData(){ /*自定义方法获取数据*/
//获取
alert(this.msg);
}
setData(){
//设置值
this.msg='这是设置的值';
}
```



##七、表单事件

`<input type="text" (keyup)="keyUpFn($event)"/>`

`<input type="text" (keyup)="keyUpFn($event)"/>`

```js
keyUpFn(e){
console.log(e)
}
```



## 八、双向数据绑定

`<input [(ngModel)]="inputValue">`

注意引入：FormsModule

`import { FormsModule } from '@angular/forms';`

```js
@NgModule({
declarations: [
AppComponent,
HeaderComponent,
FooterComponent,
NewsComponent
],
imports: [
BrowserModule,
FormsModule
],
providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

使用：

```html

<input type="text" [(ngModel)]="inputValue"/>
{{inputValue}}
```



## 九、[ngClass]、[ngStyle]

`[ngClass]:`

```html
<div [ngClass]="{'red': true, 'blue': false}">
这是一个 div
</div>
public flag=false;
<div [ngClass]="{'red': flag, 'blue': !flag}">
这是一个 div
</div>
public arr = [1, 3, 4, 5, 6];
<ul>
<li *ngFor="let item of arr, let i = index">
<span [ngClass]="{'red': i==0}">{{item}}</span>
</li>
</ul>
```

`[ngStyle]:`

```html
<div [ngStyle]="{'background-color':'green'}">你好 ngStyle</div>
public attr='red';
<div [ngStyle]="{'background-color':attr}">你好 ngStyle</div>
```



## 十、管道

```js
public today=new Date();
```

```html
<p>{{today | date:'yyyy-MM-dd HH:mm:ss' }}</p>
```

其他管道： http://bbs.itying.com/topic/5bf519657e9f5911d41f2a34