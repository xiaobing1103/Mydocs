# vue响应式

- 含义：当你更新数据的时候，数据会变化，同时用户界面也会更新

- 在vue中data中的数据是响应式数据

- data中普通对象：
  - 如果属性一开始存在，它就是响应式的
  - 如果属性是后面新添加，它就不是响应式的
  - 除非通过下面方法添加，才是响应式
  - this.$set(对象, 属性名, 属性值); 给对象添加响应式属性的方法
  - Vue.set(对象, 属性名, 属性值);

 

​        Vue.set(对象, 属性名, 属性值);

-  data中数组：
  - 如果通过数组下标添加新元素，不是响应式的 
  - 其他情况都是响应式的

总结：原来数据的属性就是响应式，新添加的属性不是响应式 

实例：

```html
<div id="app">
        <p>{{num}}</p>
        <p>{{msg}}</p> 
        <ul><li v-for="(value, key) in person" :key="key">{{key}} -- {{value}}</li></ul>
        <ul><li v-for="item in persons" :key="item.id">{{item.id}} - {{item.name}} - {{item.age}}</li></ul>
          <button @click="update">更新</button>
          <button @click="add">add</button>
</div>
 <script type="text/javascript">
      // 响应式：当你更新数据的时候，数据会变化，同时用户界面也会更新
      new Vue({
        el: "#demo",
        data: {
          // data中的数据才是响应式数据
          num: 0,
          msg: "atguigu",
          person: {
            name: "培华",
            age: 18,
            sex: '男'
          },
          persons: [
            { id: 1, name: "jack" },
            { id: 2, name: "rose" },
          ],
        },
        methods: {
          add() {
            // 不是响应式
            this.xxx = 123;
          },
          update() {
            // 响应式数据
            // this.num++;
            // this.msg += "~";
            // this.person.name += "~";
            // this.persons[0].name += "~";
            // this.persons.push({ id: 3, name: "tom" }); // 变更方法

            // 非响应式数据
            // this.person.age = 18;
            // this.$set(this.person, 'age', 18);
            // this.persons[0].age = 18;
            // this.persons[2] = { id: 3, name: "tom" };
          },
        },
      });
    </script>
```

