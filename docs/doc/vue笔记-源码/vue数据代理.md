# vue数据代理

- 1. vue数据代理: data对象的所有属性的操作(读/写)由vm对象来代理操作

  2. 好处: 通过vm对象就可以方便的操作data中的数据

  3. 实现:

     1). 通过Object.defineProperty(vm, key, {})给vm添加与data对象的属性对应的属性

      2). 所有添加的属性都包含get/set方法

      3). 在get/set方法中去操作data中对应的属性

- 数据代理最终结果：可以通过this直接访问（读、写）data中的数据

- 1.将options添加到this

  ​	`this.$options = options;	`

- 2.定义data变量值为原属性数据data的值

  ​	this._data值为原属性数据data的值

  ​	`var data = (this._data = this.$options.data);`

- 缓存this --> 为了将来可以在其他函数中使用实例对象

  ​	`var me = this; `

  

- Object.keys(data) 提取对象所有属性名成为数组

- 对数组进行遍历，提取每一个属性名，对属性名进行数据代理

- 通过Object.defineProperty方法给this添加新属性

- 设置属性的元属性（定义属性的读取和设置的方法）

- 读取时实际上读取的原属性data数据的值

- 设置时实际上 设置的原属性data数据的值

- me._data --> 就是原属性数据



​	详细版本描述：

​	将`data`数据赋值给变量`data`和`this._data`上,这种数据称为原数据

​	通过`Object.keys`方法提取原数据的所有属性名称为一个数组

​	遍历这个数据,调用`_proxy`对每一个属性名进行数据代理

​	所谓数据:就是通过`Object.defineProperty`方法给`this`定义这个属性,设置属性的元属性(属性描	述符)

​	元属性中定义数据的是否可枚举,是否可以重新配置,以及`get`属性读取方法和`set`属性的设置方法

​	`get`和`set`方法本质上都是对之前的原数据进行操作

​	到此所有数据都会定义在`this`上,所以可以通过`this`直接访问`data`中数据了



​	简单版

​	遍历所有原数据中属性进行数据代理,通过`object.defineProperty`方法给`this`添加属性.定义其	 `get` 和 `set`方法,内部实际读取,设置还是还是原数据的值



