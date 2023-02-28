# Angular 中的 Dom 操作以及@ViewChild、 Angular 执行 css3 动画

## 一、Angular 中的 dom 操作（原生 js）

```js
ngAfterViewInit(){
var boxDom:any=document.getElementById('box');
boxDom.style.color='red';
}
```

## 二、Angular 中的 dom 操作（ViewChild）

```js
import { Component ,ViewChild,ElementRef} from '@angular/core';

@ViewChild('myattr') myattr: ElementRef;

ngAfterViewInit(){
let attrEl = this.myattr.nativeElement;
}
```

```html
<div #myattr></div>
```

## 三、父子组件中通过 ViewChild 调用子组件 的方法

- 1. 调用子组件给子组件定义一个名称

```html
<app-footer #footerChild></app-footer>
```

- 2. 引入 ViewChild

```js
import { Component, OnInit ,ViewChild} from '@angular/core';
```

- 3. ViewChild 和刚才的子组件关联起来

```js
@ViewChild('footerChild') footer;
```

- 4. 调用子组件

```js
run(){
this.footer.footerRun();
}
```

