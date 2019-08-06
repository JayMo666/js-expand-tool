/**
 * 根据属性去重数组
 * @param {array} arr 去重的数组
 * @param {string} key 去重的key
 * @example unique([{name:'1111'},{name:'1111'},{name:'222'},{name:'333'}],'name') => [{name:'1111'},{name:'222'},{name:'333'}
 */
export const uniqueBy = function(arr,key){
    return arr.filter((element,index,array)=>array.findIndex(row=>row[key]===element[key]) === index)
}


/**
 * 普通数组去重
 * @param {array} arr 去重的数组
 * @example unique2([1,2,2,3,4,3,4,7]) => [1, 2, 3, 4, 7]
 */
export const unique = (arr) => {
  arr.filter((element,index,array)=>array.indexOf(element) === index)
}

/**
 * 数组完全展开
 * @param {array} arr 去重的数组
 * @example unique2([1,2,2,3,4,3,4,7]) => [1, 2, 3, 4, 7]
 */
export const flat = (arr) => {
  while (arr.some(t => Array.isArray(t))) {
    arr = ([]).concat.apply([], arr)
  }
  return arr
}

/**
 * 创建一个从值从start开始递增的数组，每次递增step。
 * @param {number} length 生成的长度
 * @param {number} start=0 开始的值
 * @param {number} step=0 步长
 * @example range(5) => [0,0，0，0，0]
 */
export const range = (length,start=0,step=0) => {
  return Array.from({length:length}, (e, i)=> i * step +start) 
}

/**
 * 重复数组
 * @param {array} arr 要重复的数组
 * @param {number} repeats=1 重复的次数
 * @example repeat(['a','b','c'],3) = > ["a", "b", "c", "a", "b", "c", "a", "b", "c"]
 */
export const repeat = (arr,repeats=1) => {
  return Array.apply(null, {length: repeats * arr.length}).map((e,i)=>arr[i % arr.length])
}