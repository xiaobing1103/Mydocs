# 动态import

- `import`函数的参数，指定所要加载的模块的位置。
- `import`命令能够接受什么参数，`import()`函数就能接受什么参数，两者区别主要是后者为动态加载
- `import()`返回一个 Promise 对象。
- 它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
  </head>
  <body>
    <button id="btn">按钮</button>
    <script type="text/javascript">
      document.getElementById("btn").onclick = function () {
        import("./a.js")
          .then(() => {
            console.log(111);
          })
          .catch(() => {
            console.log(222);
          });
      };
    </script>
  </body>
</html>
//a.js
console.log('a.js执行了~');
```