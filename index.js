
import packageJSON from './package.json'
import * as obj from './libs/object' 
import * as arr from './libs/array' 
import * as fn from './libs/function' 
import * as url from './libs/url' 
import * as types from './libs/types' 
import * as num from './libs/number' 
import * as str from './libs/string' 
import * as date from './libs/date'
import * as other from './libs/other'

import './libs/prototype'

const jsExpandTool = {
    ...obj,
    ...arr,
    ...date,
    ...fn,
    ...str,
    ...num,
    ...types,
    ...url,
    ...other,
    version:packageJSON.version,
}

global.jst = jsExpandTool

for(let key in jsExpandTool){
	exports[key] = jsExpandTool[key]
}


