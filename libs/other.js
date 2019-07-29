/**
 * 评分组件
 * @param {Number} rate max 5
 * @example getRate(2)   //★★☆☆☆
 */
export const getRate = rate => {
  return '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate)
}

/**
 *  sleep函数
 * @param {Number} interval
 */
export const sleep = interval => {
  return new Promise(resolve => {
    setTimeout(resolve, interval)
  })
}

/**
 *  生成随机UID
 * @param {Number} length = 20
 * @param {str} 
 * @example genUid()  //;l`yCPc9A8IuK}?N6,%}
 */
export const genUid = (length=20,str) => {
  str= str? str: '!#$%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var strLength = str.length
  var id = []
  for (var i = 0; i < length; i++) {
    id[i] = str.charAt(Math.random() * strLength)
  }
  return id.join('')
}
/**
 *  rgb转16进制色值
 * @param {string} rgb
 * @example rgb2Hex('100, 50, 0') // '#643200'
 */
export const rgb2Hex = rgb => {
  let rgbList = rgb.toString().match(/\d+/g)
  let hex = '#'
  for (let i = 0, len = rgbList.length; i < len; ++i) {
    hex += ('0' + Number(rgbList[i]).toString(16)).slice(-2)
  }
  return hex
}
