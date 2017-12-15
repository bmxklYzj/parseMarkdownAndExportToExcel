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

2、如下每条语句单独执行程序输出什么？
var a;console.log(a);
console.log(b);

A. undefined 程序报错
B. undefined undefined
C. undefined null
D. null undefined
答案：A

3、如下每条语句单独执行程序输出什么？
var a;console.log(typeof a);
console.log(typeof b);

A. undefined 程序报错
B. undefined undefined
C. undefined null
D. null undefined
答案：B
解析：对于未定义的值只能执行一项操作即用typeof检测其数据类型

4、如下程序输出什么？
console.log(null == undefined);
console.log(null === undefined);
console.log(null == []);
console.log(null == {});

A. true false false false
B. false true true true
C. false true false false
D. true false true true
答案：A

5、如下程序输出什么？
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));
console.log(!![]);
console.log(!!{});

A. false false false true true
B. false false true false false
C. true true false true true
D. true false true false false
答案：A

6、如下每条语句单独执行程序输出什么？
console.log(parseInt('100'));
console.log(parseInt('100abc'));
console.log(parseInt('abc100'));
console.log(parseInt('100', 2));

A. 100 程序报错 程序报错 100
B. 100 100 NaN 4
C. 100 100 程序报错 100
D. 100 NaN NaN 100
答案：B

7、如下每条语句单独执行程序输出什么？
console.log(0.1 + 0.2 === 0.3);
console.log(0.15 + 0.25 === 0.4);

A. false true
B. false false
C. true true
D. true false
答案：A

8、 如下每条语句单独执行程序输出什么？
var a;
console.log(a.toString());
var a;
console.log(String(a));

A. 报错 undefined
B. undefined undefined
C. undefined 报错
D. 报错 报错
答案：A
解析：undefined和null没有toString方法，但转型函数String能够将任意js类型转换为字符串

9、 如下每条语句单独执行程序输出什么？
console.log(123 + 'a' + 1);
console.log(123 + 1 + 'a');

A. 123a1 124a
B. 123a1 1231a
C. 报错 124a
D. 报错 报错
答案：A
解析：+号运算符如果有一个算子是字符串，则两个算子都先转换为字符串再拼接字符串

10、 如下每条语句单独执行程序输出什么？
console.log(123 + 1 + NaN);
console.log(123 + 1 + undefined);
console.log(123 + 1 + null);

A. 报错 报错 报错
B. NaN 报错 报错
C. NaN NaN 124
D. NaN 124undefined 1231null
答案：C
解析：第一个加号执行算数加法，第二个加号因为两个算子中有非数值类型，会先调用Number()转型函数，而Number()会把undefined转成NaN，把null转成0.但要注意parseInt()函数undefined和null均会转成NaN

二、填空
1、执行如下程序的输出是_________。
var a = 'abc';a = 123;console.log(typeof a);

答案：number
解析：js数据类型是可变的

2、var s = 'abc';s.length = 0;此时打印s.length的结果是_________。
答案：3

3、var s = 'abc';s[1] = 'd';此时打印s的结果是_________。
答案：abc

4、 var obj = {'k1': 1, 'k2': 2};var copyObj = obj;copyObj.k1 = 3;此时打印obj.k1的结果是_________。
答案：3

5、 var obj = {'k1': 1, 'k2': 2};var intA = obj.k1;obj.k1 = 3;此时打印intA的结果是_________。
答案：1

6、 var obj = {'k1': 1, 'k2': {'k3': 3}};var copyObj = obj.k2;obj.k2 = {'k3': 4};此时打印copyObj.k3的结果是_________。
答案：3



三、多选
1、判断一个值val的真假可以怎么办？（   ）
A. !!val
B. Boolean(val)
C. Bool(val)
D. +val
答案：AB

2、将一个基本类型值val转换成字符串可以用哪些方法?( )
A. String(val)
B. val.toString()
C. '' + val
D. val + ''
答案：ACD
解析：undefined和null没有toString()方法

四、判断
1、var i = 0;console.log(i++);打印出来的结果是1
答案：B

2、var a = 0;var b = a && 1;var c = a || 1;console.log(b === c);的值是true。
答案：B