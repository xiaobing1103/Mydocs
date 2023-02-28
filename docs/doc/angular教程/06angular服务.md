# Angular 中的服务以及实现 toDoList 数据 持久化

## 一、 Angualr 中的服务

<img src="https://s3.ax1x.com/2021/02/01/yZ3kxP.png" alt="yZ3kxP.png" border="0" />

## 二、 创建服务命令

 https://github.com/angular/angular-cli

```shell
ng g service my-new-service 创建到指定目录下面
ng g service services/storage
```

## 三、app.module.ts 里面引入创建的服务

### 1.app.module.ts 里面引入创建的服务

```js
import { StorageService } from './services/storage.service';
```

### 2.NgModule 里面的 providers 里面依赖注入服务

```js
@NgModule({
declarations: [
AppComponent,
HeaderComponent,
FooterComponent,
NewsComponent,
TodolistComponent
],
imports: [
BrowserModule,
FormsModule
],
providers: [StorageService],
bootstrap: [AppComponent]
})
export class AppModule { }
```

## 四、使用的页面引入服务，注册服务

```js
import { StorageService } from '../../services/storage.service';
constructor(private storage: StorageService) {
}
```

使用

```js
addData(){
// alert(this.username);
this.list.push(this.username);
this.storage.set('todolist',this.list);
}
removerData(key){
console.log(key);
this.list.splice(key,1);
this.storage.set('todolist',this.list);
}
```

