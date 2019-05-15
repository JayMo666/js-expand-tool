# jstools

前端业务代码工具库


> 目的：高效率完成前端业务代码

业务开发过程中，会经常用到`String,Number,Array,Object,Function,Date扩展方法`、`浏览器类型判断`等常用函数，为避免不同项目多次复制粘贴的麻烦，这里统一封装，并发布到npm，以提高开发效率。如果你也有常用的代码，欢迎为本项目提交pr。

## 安装使用

1. 直接下载`dist`目录下的[index.js](https://github.com/JayMo666/jstools/blob/master/dist/index.js)使用，支持UMD,CMD,AMD各模块化规范。
2. 使用npm/yarn/cnpm安装。

### 浏览器:
``` html
<script src="./node_modules/utilscore/dist/index.js"></script>
<!-- <script src="./dist/index.js"></script> -->
<script>
	let pwd = utilscore.mask('password:123456789',4);
	console.log('pwd:',pwd) // pwd: **************6789
</script>
```

### npm:
``` bash
$ npm i utilscore
```
### yarn:
``` bash
$ yarn add utilscore
```
### cnpm:
``` bash
$ cnpm i utilscore
```

React、VueJS,小程序等javascript环境

``` javascript
// 完整引入
import utilscore from 'utilscore'
let pwd = utilscore.mask('password:123456789',4);
console.log('pwd:',pwd) // pwd: **************6789
```

**推荐使用方法**

你真的不需要完整引入所有函数，所以只引入需要使用的方法即可。
``` javascript
import { mask } from 'utilscore'
let pwd = mask('password:123456789',4);
console.log('pwd:',pwd) // pwd: **************6789
```
## :package:  API文档

> ###  [Object](https://github.com/JayMo666/jstools/blob/master/libs/object.js)

- deepClone 深度克隆。
- orderBy 	返回按属性(props)和顺序(orders)排序的对象数组。
- findPathByLeafId 根据 key 递归查找链带关系。

> ###  [Array](https://github.com/JayMo666/jstools/blob/master/libs/array.js)

- uniqueBy 	根据属性去重数组。
- unique	普通数组去重。

> ###  [Date](https://github.com/JayMo666/jstools/blob/master/libs/date.js)

- formatTime 格式化时间。
- formatHMS 将秒数转为 xx小时xx分钟xx秒 例如1h0m10s。

> ###  [Function](https://github.com/JayMo666/jstools/blob/master/libs/function.js)

- throttle 函数节流(首次执行)。

> ###  [String](https://github.com/JayMo666/jstools/blob/master/libs/string.js)

- mask 使用 * 遮蔽字符串。

> ###  [Number](https://github.com/JayMo666/jstools/blob/master/libs/number.js)

- randomNum 返回指定范围内的随机整数。
- round 将数字四舍五入到指定的小数位数。
- sum 返回两个或两个以上数字/数字数组中元素之和。
- sumBy 根据函数映射每个元素，然后返回数组的和。
- toDecimalMark 将数字转化为千分位格式。

> ###  [TypeOf](https://github.com/JayMo666/jstools/blob/master/libs/types.js)

- $isNull 判断类型Null
- $isUndefined 判断类型Undefined
- $isBoolean 判断类型Boolean
- $isNumber 判断类型Number
- $isString 判断类型String
- $isSymbol 判断类型Symbol
- $isObject 判断类型Object
- $isRegExp 判断类型RegExp
- $isArray 判断类型Array
- $isFunction 判断类型Function

> ###  [url](https://github.com/JayMo666/jstools/blob/master/libs/url.js)

- Url 根据对象 拼接参数
- URLSearchParams url 序列化和反序列化

> ###  [prototype](https://github.com/JayMo666/jstools/blob/master/libs/prototype.js)

- match_all 扩展 String的原型方法 es2019的matchAll（未兼容浏览器）

