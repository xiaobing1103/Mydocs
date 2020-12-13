# vue计算属性和监听数据



## 1.计算属性   

- computed 计算属性:

  - 只读计算属性
 `computed: { fullName() { return xxx; } }`

  - 可读可写计算属性:
  
      `computed: { fullName: { get() {}, set(newVal) {} } }`
  
 - 通常情况下，计算属性内部会使用 data 数据。一旦内部使用的 data 数据发生变化，计算属性就会重新计算结果。  
 - 如果data数据没有变化，就不会重新计算，使用上一次的缓存结果（有缓存）。


## 2.监视属性:
- watch

  ` watch: { firstName(newVal, oldVal){}}`

- 通过通过vm对象的$watch()或watch配置来监视指定的属性

- 监视一个已存在的 data 属性，一旦 data 属性发生变化，就会调用相应的函数处理

  
## 3.计算属性高级:

- 通过getter/setter实现对属性数据的显示和监视

- 计算属性存在缓存, 多次读取只执行一次getter计算

```html
 <div id="app">
      姓: <input type="text" placeholder="First Name" v-model="fullName3"/><br />
      名: <input type="text" placeholder="Last Name" v-model="fullName3"/><br />
      姓名1: <input type="text" placeholder="Full Name1" v-model="fullName3"/><br />
      姓名2: <input type="text" placeholder="Full Name2" v-model="fullName3"/><br />
    </div>
<script>
      new Vue({
        el: "#app",
        data: {
          firstName: "li",
          lastName: "peihua",
          aaa: "aaa",
          fullName3: "li peihua",
        },
        // 计算属性
        // 计算属性会监视内部使用过的属性的变化，一旦发生变化，计算属性就要重新计算
        computed: {
          // 给vm定义一个属性，叫fullName
          fullName: {
            // fullName属性的读取的方法
            get() {
              // vue内部会对data、methods、computed等属性进行数据代理（将对象中的属性挂在到vm上）
              // 就能直接通过 vm/this 直接访问属性
              return this.firstName + " " + this.lastName;
            },
            // fullName属性的设置的方法
            set(newVal) {
              const [firstName, lastName] = newVal.split(" ");
              // vue可以直接更新data数据，同时用户界面也会发生变化（响应式）
              this.firstName = firstName;
              this.lastName = lastName;
            },
          },

          // 只读的计算属性（不能修改）
          // 这个方法相对于fullName1的get方法，没有set
          fullName1() {
            return this.firstName + " " + this.lastName;
          },
        },
        // 监视属性
        // 监视data中的属性，一旦发生变化，就会调用相应的函数
        watch: {
          // 监视firstName属性的变化，一旦发生变化就会调用函数
          firstName(newVal) {
            // ['li', 'peihua']
            const names = this.fullName3.split(" ");
            // ['wang', 'peihua']
            names[0] = newVal;

            this.fullName3 = names.join(" ");
          },
          lastName(newVal) {
            const names = this.fullName3.split(" ");
            names[1] = newVal;
            this.fullName3 = names.join(" ");
          },
        },
      });
    </script>
```

