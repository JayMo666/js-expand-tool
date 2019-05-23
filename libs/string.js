/**
 * 使用 * 遮蔽字符串
 * @param {*} cc 
 * @param {*} num 
 * @param {*} mask 
 * @example
 */
export const mask = (cc, num = 4, mask = '*') =>('' + cc).slice(0, -num).replace(/./g, mask) + ('' + cc).slice(-num);

/**
 * 生成一个随机的十六进制颜色代码。
 */
export const randomHexColorCode = () => {
  let n = ((Math.random() * 0xfffff) | 0).toString(16);
  return '#' + (n.length !== 6 ? ((Math.random() * 0xf) | 0).toString(16) + n : n);
};

/**
 * 驼峰写法转下划线写法
 */
export const camelCaseToUnderLine=(name)=>{
  if(typeof name!=='string'){
    throw TypeError('传入参数不正确, 要求为字符串类型')
  }
  return name.replace(/[A-Z]/g, function (val, index) {    
    let char = val.toLowerCase();
    // 首字母为大写时无需加入下划线
    return index === 0 ? char : '_' + char;
  })
}

/**
 * 下划线写法转驼峰写法
 */
export const underlineToCamelCase=(name)=>{
  if (typeof name !== 'string') {
    throw TypeError('传入参数不正确, 要求为字符串类型');
  }
  return name.replace(/_([a-z|A-Z])/g, function (matchStr, char, index) {
  if (index > 0) {
      return char.toUpperCase();
  }
  return matchStr;
  })
}