
## 项目背景

需要把按照一定格式写成的markdown前端题目 最终生成excel。

先把整个文件读取成字符串，然后用正则解析题目，得到json数据。利用`js-xlsx` 和 `js-export` 库导出到excel。

# 书写的markdown原文本需要遵循一定的规则

1. 四大类型写法：一、单选
2. 每道题前面必须空行，单选、多选：题目描述可以多行（但题目描述直接不要有空白行），然后是一个空行，接着是1-6个选项，紧接着是：（解析不能换行）

    ```
    答案：B
    解析：
    --
    ```

```
一、单选

1、如下程序输出什么？
console.log(typeof 123);
console.log(typeof function() {});
console.log(typeof null);
console.log(typeof {'key': 'value'});

A. number object object object
B. number function object object
C. number function null object
D. number object null object
答案：B
解析：
--

2、如下每条语句单独执行程序输出什么？
var a;console.log(a);
console.log(b);

A. undefined 程序报错
B. undefined undefined
C. undefined null
D. null undefined
答案：A
解析：
--

二、填空

6、 var obj = {'k1': 1, 'k2': {'k3': 3}};var copyObj = obj.k2;obj.k2 = {'k3': 4};此时打印copyObj.k3的结果是_________。
答案：3
解析：
--

三、多选

四、判断

1、var i = 0;console.log(i++);打印出来的结果是1
答案：B
解析：
--

```

## 开发思路解析

分析题目结构如下

```

1. 单选格式：
    题目：problem

    A.
    B.
    C.
    D.
    答案：A
    解析：解析可选

2. 填空格式
    题目：problem
    答案：answer

3. 多选格式和单选相同，只是答案有多个

4. 判断和 填空格式相同

```
