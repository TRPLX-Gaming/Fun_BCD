// imports
import {DataTypeError} from './errors'

// util func 
const isOperationValid = async (val:any | null): Promise<boolean> => {
  return val !== null ? true : false
}
export default isOperationValid

// contains all conversion functions

// 1's complement(no need to convert back)
export const applyOneComp = async (binStr:string):Promise<string | null> => {
  let result:string[] = []
  if(typeof binStr !== 'string') {
    throw new DataTypeError(typeof binStr)
    return null
  }
  
  for(let i=0;i<binStr.length;i++) {
    if(binStr[i] === '1' || binStr[i] === '0') {
      if(binStr[i] === '1') {
        result.push('0')
        continue
      }
      if(binStr[i] === '0') {
        result.push('1')
        continue
      }
    }
  }
  return result.join('')
}

// 2's complement(no need to convert back)
export const applyTwoComp = async (binStr:string):Promise<string | null> => {
  let oneComp = await applyOneComp(binStr)
  if(await isOperationValid(oneComp)) {
    let len:number = oneComp.length 
    let result:string = ''
    if(oneComp[len-1] === '0') {
      result = replaceStr(oneComp,len-1,'1')
    } else if(oneComp[len-1] === '1') {
      result = twoCompDeep(oneComp)
    }
    return result
  }
  return null
}

const replaceStr = (str:string,i:number,repl:any):string => {                    
  if(typeof i !== 'number') {
    throw new DataTypeError(typeof i)
    return                                        
  }
  let strArr = str.split('')                  
  strArr[i] = repl                                  
  return strArr.join('')                              
}

const twoCompDeep = (str:string):string => {
  let strArr = str.split('')
  for(let i=strArr.length-1;i>=0;i--) {
    if(strArr[i] === '1') {
      strArr[i] = '0'
      } else {
        strArr[i] = '1'
        break
      }
    }
//    console.log('deep',strArr.join(''))
    return strArr.join('')
}

// gray code 
// to 
export const applyGrayCode = async (binStr:string):Promise<string | null> => {
  if(typeof binStr !== 'string') {
    throw new DataTypeError(typeof binStr)
    return null
  }
  let arr = binStr.split(''),
    result = []
  result.push('1')
  if(arr[0] !== arr[1]) result.push('1')
  else result.push('0')
  for(let i=2;i<arr.length;i++) {
    if(arr[i] !== arr[i-1]) result.push('1')
    else result.push('0')
  }
  return result.join('')
}

// from
export const removeGrayCode = async (binStr:string):Promise<string | null> => {
  let arr = binStr.split(''),
    result = [],
    temp = '1'
  
  
}

