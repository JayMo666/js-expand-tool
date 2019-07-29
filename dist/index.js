// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"package.json":[function(require,module,exports) {
module.exports = {
  "name": "js-expand-tool",
  "version": "0.0.16",
  "description": "javascript 工具函数包",
  "main": "index.js",
  "scripts": {
    "start": "parcel index.js",
    "build": "parcel build index.js",
    "test": "react-scripts test --env=jsdom",
    "lint": "eslint libs --fix",
    "lint:create": "eslint --init"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/JayMo666/js-expand-tool.git"
  },
  "keywords": ["jsExpandTool", "js-expand-tool", "common", "commonJS", "common-js", "util", "utils", "lib", "libs", "javascript"],
  "author": "jaymo",
  "license": "ISC",
  "devDependencies": {
    "eslint": "^5.16.0"
  },
  "directories": {
    "test": "test"
  },
  "dependencies": {}
};
},{}],"libs/object.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findPathByLeafId = exports.orderBy = exports.deepClone = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * 深度克隆
 * @param {*} obj 
 */
var deepClone = function deepClone(obj) {
  if (null === obj) {
    return obj;
  }

  if (obj instanceof Array) {
    return obj.map(function (row) {
      return deepClone(row);
    });
  }

  if (obj instanceof Object) {
    var ret = {};
    Object.keys(obj).forEach(function (key) {
      if (obj[key] instanceof Date) {
        ret[key] = new Date(obj[key].getTime());
      } else {
        ret[key] = deepClone(obj[key]);
      }
    });
    return ret;
  }

  return obj;
};
/**
 * 返回按属性(props)和顺序(orders)排序的对象数组。
 * @param {*} arr 
 * @param {*} props 
 * @param {*} orders 
 */


exports.deepClone = deepClone;

var orderBy = function orderBy(arr, props, orders) {
  return _toConsumableArray(arr).sort(function (a, b) {
    return props.reduce(function (acc, prop, i) {
      if (acc === 0) {
        var _ref = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]],
            _ref2 = _slicedToArray(_ref, 2),
            p1 = _ref2[0],
            p2 = _ref2[1];

        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }

      return acc;
    }, 0);
  });
};
/**
 * 根据 key 递归查找链带关系
 * @param {sting} leafIdName  
 * @param {any} leafId  
 * @param {array} nodes 被查找的数组
 * @param {array} path 非必填 
 * @param {array} path 非必填 
 * @example let arr = [
                    {
                        name:'awefawef',
                        id:111,
                        children:[
                            {
                                name:'2222222aaa',
                                id:222,
                                children:[
                                    {
                                        name:'cccccaaa',
                                        id:333,
                                    }
                                ]
                            }
                        ]
                }
            ]
            findPathByLeafId('id',333,arr) // => [{"id":111,"value":"awefawef"},{"id":222,"value":"2222222aaa"}]
 */


exports.orderBy = orderBy;

var findPathByLeafId = function findPathByLeafId(leafIdName, leafId, nodes) {
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  for (var i = 0; i < nodes.length; i++) {
    var _tmpPath$push;

    var tmpPath = _toConsumableArray(path);

    if (leafId == nodes[i][leafIdName]) {
      return tmpPath;
    }

    tmpPath.push((_tmpPath$push = {}, _defineProperty(_tmpPath$push, leafIdName, nodes[i][leafIdName]), _defineProperty(_tmpPath$push, "value", nodes[i].name), _tmpPath$push));

    if (nodes[i].children) {
      var findResult = findPathByLeafId(leafIdName, leafId, nodes[i].children, tmpPath);

      if (findResult) {
        return findResult;
      }
    }
  }
};

exports.findPathByLeafId = findPathByLeafId;
},{}],"libs/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flat = exports.unique = exports.uniqueBy = void 0;

/**
 * 根据属性去重数组
 * @param {array} arr 去重的数组
 * @param {string} key 去重的key
 * @example unique([{name:'1111'},{name:'1111'},{name:'222'},{name:'333'}],'name') => [{name:'1111'},{name:'222'},{name:'333'}
 */
var uniqueBy = function uniqueBy(arr, key) {
  return arr.filter(function (element, index, array) {
    return array.findIndex(function (row) {
      return row[key] === element[key];
    }) === index;
  });
};
/**
 * 普通数组去重
 * @param {array} arr 去重的数组
 * @example unique2([1,2,2,3,4,3,4,7]) => [1, 2, 3, 4, 7]
 */


exports.uniqueBy = uniqueBy;

var unique = function unique(arr) {
  arr.filter(function (element, index, array) {
    return array.indexOf(element) === index;
  });
};
/**
 * 数组完全展开
 * @param {array} arr 去重的数组
 * @example unique2([1,2,2,3,4,3,4,7]) => [1, 2, 3, 4, 7]
 */


exports.unique = unique;

var flat = function flat(arr) {
  while (arr.some(function (t) {
    return Array.isArray(t);
  })) {
    arr = [].concat.apply([], arr);
  }

  return arr;
};

exports.flat = flat;
},{}],"libs/function.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttle = void 0;

/**
 * 函数节流(首次执行)
 * @param {*} fn 
 * @param {*} delay 
 * @param {*} type 
 */
var throttle = function throttle(fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
  var timer = null;
  var status = true;
  clearTimeout(timer);

  if (status) {
    status = false;
    fn.call(this, arguments);
  }

  timer = setTimeout(function () {
    return status = true;
  }, delay);
};

exports.throttle = throttle;
},{}],"libs/types.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$isFunction = exports.$isArray = exports.$isRegExp = exports.$isObject = exports.$isSymbol = exports.$isString = exports.$isNumber = exports.$isBoolean = exports.$isUndefined = exports.$isNull = void 0;

/**
 * 判断类型Null
 * @param {any} value 
 */
var $isNull = function $isNull(value) {
  return Object.prototype.toString.call(value) == "[object Null]";
};
/**
 * 判断类型Undefined 
 * @param {any} value 
 */


exports.$isNull = $isNull;

var $isUndefined = function $isUndefined(value) {
  return Object.prototype.toString.call(value) == "[object Undefined]";
};
/**
 * 判断类型Boolean
 * @param {any} value 
 */


exports.$isUndefined = $isUndefined;

var $isBoolean = function $isBoolean(value) {
  return Object.prototype.toString.call(value) == "[object Boolean]";
};
/**
 * 判断类型Number
 * @param {any} value 
 */


exports.$isBoolean = $isBoolean;

var $isNumber = function $isNumber(value) {
  return Object.prototype.toString.call(value) == "[object Number]";
};
/**
 * 判断类型String
 * @param {any} value 
 */


exports.$isNumber = $isNumber;

var $isString = function $isString(value) {
  return Object.prototype.toString.call(value) == "[object String]";
};
/**
 * 判断类型Symbol
 * @param {any} value 
 */


exports.$isString = $isString;

var $isSymbol = function $isSymbol(value) {
  return Object.prototype.toString.call(value) == "[object Symbol]";
};
/**
 * 判断类型Object
 * @param {any} value 
 */


exports.$isSymbol = $isSymbol;

var $isObject = function $isObject(value) {
  return Object.prototype.toString.call(value) == "[object Object]";
};
/**
 * 判断类型RegExp
 * @param {any} value 
 */


exports.$isObject = $isObject;

var $isRegExp = function $isRegExp(value) {
  return Object.prototype.toString.call(value) == "[object RegExp]";
};
/**
 * 判断类型Array
 * @param {any} value 
 */


exports.$isRegExp = $isRegExp;

var $isArray = function $isArray(value) {
  return Object.prototype.toString.call(value) == "[object Array]";
};
/**
 * 判断类型Function
 * @param {any} value 
 */


exports.$isArray = $isArray;

var $isFunction = function $isFunction(value) {
  return Object.prototype.toString.call(value) == "[object Function]";
};

exports.$isFunction = $isFunction;
},{}],"libs/url.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.URLSearchParams = exports.Url = void 0;

var _types = require("./types");

/**
 * 请求参数
 * @param {*} url 
 * @param {Object} options 
 * @example Url('http://www.baidu.com?:name',{name:'ceshi'}) // => http://www.baidu.com?ceshi
 */
var Url = function Url(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return url.replace(/:([a-zA-Z0-9_]{1,})/g, function ($0, $1) {
    var val = encodeURIComponent(options[$1]);

    if (val === undefined) {
      new Error("URL ".concat(url, " not find ").concat($1));
    }

    return val;
  });
};
/**
 * url 序列化和反序列化
 * @param {Object||String} param 
 * @example URLSearchParams('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=parseQueryString&rsv_pq=8c7a6d0000146171&rsv_t=43d6RzTiyjUjUKtQtqfR3XL25JepKFwJYvvSpsj%2BJ7aFqxdBLDungY%2Bfx%2BE&rqlang=cn&rsv_enter=1&rsv_n=2&rsv_sug3=1') // => 
 *  // {
    //    "ie":"utf-8",
    //    "f":"8",
    //    "rsv_bp":"1",
    //    "rsv_idx":"1",
    //    "tn":"baidu",
    //    "wd":"parseQueryString",
    //    "rsv_pq":"8c7a6d0000146171",
    //    "rsv_t":"43d6RzTiyjUjUKtQtqfR3XL25JepKFwJYvvSpsj+J7aFqxdBLDungY+fx+E",
    //    "rqlang":"cn",
    //    "rsv_enter":"1",
    //    "rsv_n":"2",
    //    "rsv_sug3":"1"
    // }
 *  // jsExpandTool.URLSearchParams({
    // 	name:'cgx',
    // 	test:'ceshi'
    // })
    // // => "name=cgx&test=ceshi"
 */


exports.Url = Url;

var URLSearchParams = function URLSearchParams(param) {
  if ((0, _types.$isObject)(param)) {
    return Object.keys(param).map(function (key) {
      return "".concat(key, "=").concat(encodeURIComponent(JSON.stringify(param[key])));
    }).join('&');
  } else if ((0, _types.$isString)(param)) {
    var maps = {};
    param.replace(/^.[^\?]*\?/g, '').split('&').forEach(function (res) {
      var row = decodeURIComponent(res).split('=');
      maps[row[0] + ''] = decodeURIComponent(row[1]);
    });
    return maps;
  }
};

exports.URLSearchParams = URLSearchParams;
},{"./types":"libs/types.js"}],"libs/number.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toDecimalMark = exports.sumBy = exports.sum = exports.round = exports.randomNum = void 0;

/**
 * 返回指定范围内的随机整数。
 * @param {number} min 最小值
 * @param {number} max 最大值
 */
var randomNum = function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
/**
 * 将数字四舍五入到指定的小数位数。
 * @param {number} n 操作的数字
 * @param {number} decimals 精确到几位小数 
 */


exports.randomNum = randomNum;

var round = function round(n) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return Number("".concat(Math.round("".concat(n, "e").concat(decimals)), "e-").concat(decimals));
};
/**
 * 返回两个或两个以上数字/数字数组中元素之和。
 * @param  {...any} arr 操作的数组 
 */


exports.round = round;

var sum = function sum() {
  for (var _len = arguments.length, arr = new Array(_len), _key = 0; _key < _len; _key++) {
    arr[_key] = arguments[_key];
  }

  return [].concat(arr).reduce(function (acc, val) {
    return acc + val;
  }, 0);
};
/**
 * 根据函数映射每个元素，然后返回数组的和
 * @param {*} arr 
 * @param {*} fn 
 */


exports.sum = sum;

var sumBy = function sumBy(arr, fn) {
  return arr.map(typeof fn === 'function' ? fn : function (val) {
    return val[fn];
  }).reduce(function (acc, val) {
    return acc + val;
  }, 0);
};
/**
 * 将数字转化为千分位格式
 * @param {*} num 
 */


exports.sumBy = sumBy;

var toDecimalMark = function toDecimalMark(num) {
  return num.toLocaleString('en-US');
};

exports.toDecimalMark = toDecimalMark;
},{}],"libs/string.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.underlineToCamelCase = exports.camelCaseToUnderLine = exports.randomHexColorCode = exports.mask = void 0;

/**
 * 使用 * 遮蔽字符串
 * @param {*} cc 
 * @param {*} num 
 * @param {*} mask 
 * @example
 */
var mask = function mask(cc) {
  var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  var mask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '*';
  return ('' + cc).slice(0, -num).replace(/./g, mask) + ('' + cc).slice(-num);
};
/**
 * 生成一个随机的十六进制颜色代码。
 */


exports.mask = mask;

var randomHexColorCode = function randomHexColorCode() {
  var n = (Math.random() * 0xfffff | 0).toString(16);
  return '#' + (n.length !== 6 ? (Math.random() * 0xf | 0).toString(16) + n : n);
};
/**
 * 驼峰写法转下划线写法
 */


exports.randomHexColorCode = randomHexColorCode;

var camelCaseToUnderLine = function camelCaseToUnderLine(name) {
  if (typeof name !== 'string') {
    throw TypeError('传入参数不正确, 要求为字符串类型');
  }

  return name.replace(/[A-Z]/g, function (val, index) {
    var char = val.toLowerCase(); // 首字母为大写时无需加入下划线

    return index === 0 ? char : '_' + char;
  });
};
/**
 * 下划线写法转驼峰写法
 */


exports.camelCaseToUnderLine = camelCaseToUnderLine;

var underlineToCamelCase = function underlineToCamelCase(name) {
  if (typeof name !== 'string') {
    throw TypeError('传入参数不正确, 要求为字符串类型');
  }

  return name.replace(/_([a-z|A-Z])/g, function (matchStr, char, index) {
    if (index > 0) {
      return char.toUpperCase();
    }

    return matchStr;
  });
};

exports.underlineToCamelCase = underlineToCamelCase;
},{}],"libs/date.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatHMS = exports.formatTime = void 0;

/**
 * 格式化时间
 * @param {*} obj 
 * @param {*} format 
 * @example utils.formatTime(new Date(),'yyyy-M-d h:m:s D') // => 2019-05-10 17:37:24 星期六
 */
var formatTime = function formatTime(obj, format) {
  if (format) {
    var date;

    if (obj instanceof Date) {
      date = obj;
    } else {
      date = new Date(obj);
    }

    var dayNames = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    var o = {
      'M+': date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1,
      // 月份
      'd+': date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
      // 日
      'h+': date.getHours(),
      // 小时
      'm+': date.getMinutes(),
      // 分
      's+': date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(),
      // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3),
      // 季度
      'S+': date.getMilliseconds(),
      // 毫秒
      'D+': dayNames[date.getDay()] //星期

    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, "".concat(date.getFullYear()).substr(4 - RegExp.$1.length));

    for (var k in o) {
      if (new RegExp("(".concat(k, ")")).test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : "\n00".concat(o[k]).substr("".concat(o[k]).length));
      }
    }

    return format;
  } else {
    var _date2 = new Date(obj);

    var _year = _date2.getFullYear(),
        _month = _date2.getMonth() + 1 > 9 ? _date2.getMonth() + 1 : '0' + (_date2.getMonth() + 1),
        _date = _date2.getDate(),
        _hour = _date2.getHours(),
        _minute = _date2.getMinutes(),
        _second = _date2.getSeconds();

    return _year + '-' + _month + '-' + _date + ' ' + _hour + ':' + _minute + ':' + _second;
  }
};
/**
 * @param  {s} 秒数
 * @return {String} 字符串
 * @example formatHMS(3610) // -> 1h0m10s
 */


exports.formatTime = formatTime;

var formatHMS = function formatHMS(s) {
  var str = '';

  if (s > 3600) {
    str = Math.floor(s / 3600) + 'h' + Math.floor(s % 3600 / 60) + 'm' + s % 60 + 's';
  } else if (s > 60) {
    str = Math.floor(s / 60) + 'm' + s % 60 + 's';
  } else {
    str = s % 60 + 's';
  }

  return str;
};

exports.formatHMS = formatHMS;
},{}],"libs/other.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rgb2Hex = exports.genUid = exports.sleep = exports.getRate = void 0;

/**
 * 评分组件
 * @param {Number} rate max 5
 * @example getRate(2)   //★★☆☆☆
 */
var getRate = function getRate(rate) {
  return '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate);
};
/**
 *  sleep函数
 * @param {Number} interval
 */


exports.getRate = getRate;

var sleep = function sleep(interval) {
  return new Promise(function (resolve) {
    setTimeout(resolve, interval);
  });
};
/**
 *  生成随机UID
 * @param {Number} length = 20
 * @param {str} 
 * @example genUid()  //;l`yCPc9A8IuK}?N6,%}
 */


exports.sleep = sleep;

var genUid = function genUid() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
  var str = arguments.length > 1 ? arguments[1] : undefined;
  str = str ? str : '!#$%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var strLength = str.length;
  var id = [];

  for (var i = 0; i < length; i++) {
    id[i] = str.charAt(Math.random() * strLength);
  }

  return id.join('');
};
/**
 *  rgb转16进制色值
 * @param {string} rgb
 * @example rgb2Hex('100, 50, 0') // '#643200'
 */


exports.genUid = genUid;

var rgb2Hex = function rgb2Hex(rgb) {
  var rgbList = rgb.toString().match(/\d+/g);
  var hex = '#';

  for (var i = 0, len = rgbList.length; i < len; ++i) {
    hex += ('0' + Number(rgbList[i]).toString(16)).slice(-2);
  }

  return hex;
};

exports.rgb2Hex = rgb2Hex;
},{}],"libs/prototype.js":[function(require,module,exports) {
String.prototype.match_all = function (reg) {
  var arr = [];
  var str = this;
  var s = '';

  while ((s = reg.exec(str)) != null) {
    arr.push(s[1]);
  }

  return arr;
};
},{}],"index.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

var _package = _interopRequireDefault(require("./package.json"));

var obj = _interopRequireWildcard(require("./libs/object"));

var arr = _interopRequireWildcard(require("./libs/array"));

var fn = _interopRequireWildcard(require("./libs/function"));

var url = _interopRequireWildcard(require("./libs/url"));

var types = _interopRequireWildcard(require("./libs/types"));

var num = _interopRequireWildcard(require("./libs/number"));

var str = _interopRequireWildcard(require("./libs/string"));

var date = _interopRequireWildcard(require("./libs/date"));

var other = _interopRequireWildcard(require("./libs/other"));

require("./libs/prototype");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var jsExpandTool = _objectSpread({}, obj, arr, date, fn, str, num, types, url, other, {
  version: _package.default.version
});

global.jst = jsExpandTool;

for (var key in jsExpandTool) {
  exports[key] = jsExpandTool[key];
}
},{"./package.json":"package.json","./libs/object":"libs/object.js","./libs/array":"libs/array.js","./libs/function":"libs/function.js","./libs/url":"libs/url.js","./libs/types":"libs/types.js","./libs/number":"libs/number.js","./libs/string":"libs/string.js","./libs/date":"libs/date.js","./libs/other":"libs/other.js","./libs/prototype":"libs/prototype.js"}],"C:/Users/Administrator/AppData/Roaming/nvm/v10.15.3/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59670" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Administrator/AppData/Roaming/nvm/v10.15.3/node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/index.js.map