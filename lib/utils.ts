// imports
import {DataTypeError, EncodingError} from './errors'

// util func 
const isOperationValid = async (val:any | null): Promise<boolean> => {
  return val !== null ? true : false
}

const isStringBinary = async (binStr:string | number):Promise<boolean> => {
  if(typeof binStr === 'number') binStr = binStr.toString()
  let ctr = 0
  for(let i=0;i<binStr.length;i++) {
    if(binStr[i] === '0' || binStr[i] === '1') {
      ctr++
    }
  }
  return (ctr === binStr.length) ? true : false
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
  
  if(! await isStringBinary(binStr)) {
    throw new EncodingError('invalid number base, expected binary or base 2')
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
  if(typeof binStr !== 'string') {
    throw new DataTypeError(typeof binStr)
    return null
  }
  if(! await isStringBinary(binStr)) {
    throw new EncodingError('invalid number base, expected binary or base 2')
    return null
  }
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
  if(! await isStringBinary(binStr)) {
    throw new EncodingError('invalid number base, expected binary or base 2')
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
  if(typeof binStr !== 'string') {
    throw new DataTypeError(typeof binStr)
    return null
  }
  if(! await isStringBinary(binStr)) {
    throw new EncodingError('invalid number base, expected binary or base 2')
    return null
  }
  let arr = binStr.split(''),
    result = [],
    temp = '1'
  
  result.push('1')
  if(temp !== arr[1]) result.push('1')
  else {
    result.push('0')
    temp = '0'
  }
  for(let i=2;i<arr.length;i++) {
    if(temp !== arr[i]) {
      result.push('1')
      temp = '1'
    } else {
      result.push('0')
      temp = '0'
    }
  }
  return result.join('')
}

// 8421 code 
// to
export const applyBCD = async (binStr:string):Promise<string | null> => {
  if(typeof binStr !== 'string') {
    throw new DataTypeError(typeof binStr)
    return null
  }
  
  let res = ''
  for(let i=0;i<binStr.length;i++) {
    let digit = binStr[i] - '0',
      block = ''
    for(let weight=8;weight>=1;weight/=2) {
      if(digit >= weight) {
        block += '1'
        digit -= weight
      } else block += '0'
    }
    res += block + (i < binStr.length-1 ? ' ' : '')
  }
  return res
}
// from 
export const removeBCD = async (binStr:string):Promise<string | null> => {
  if(typeof binStr !== 'string') {
    throw new DataTypeError(typeof binStr)
    return null
  }
  binStr = binStr.replace(/\s/g,'')
  if(! await isStringBinary(binStr)) {
    throw new EncodingError('invalid number base, expected binary or base 2')
    return null
  }

  let res:string = ''
  for(let i=0;i<binStr.length;i+=4) {
    let n1 = binStr[i] - '0'
    let n2 = binStr[i+1] - '0'
    let n3 = binStr[i+2] - '0'
    let n4 = binStr[i+3] - '0'
    let val = (n1 * 8) + (n2 * 4) + (n3 * 2) + (n4 * 1)
    res += `${val}`
  }
  return res
}

// excess 3 code 
// to 
export const applyX3 = async (binStr:string):Promise<string | null> => {
  if(typeof binStr !== 'string') {
    throw new DataTypeError(typeof binStr)
    return null
  }
  
  let res = ''
  for(let i=0;i<binStr.length;i++) {
    let digit = binStr[i] - '0',
      block = ''
    digit += 3
    for(let weight=8;weight>=1;weight/=2) {
      if(digit >= weight) {
        block += '1'
        digit -= weight
      } else block += '0'
    }
    res += block + (i < binStr.length-1 ? ' ' : '')
  }
  return res
  
}
// from 
export const removeX3 = async (binStr:string):Promise<string | null> => {
  if(typeof binStr !== 'string') {
    throw new DataTypeError(typeof binStr)
    return null
  }
  binStr = binStr.replace(/\s/g,'')
  if(! await isStringBinary(binStr)) {
    throw new EncodingError('invalid number base, expected binary or base 2')
    return null
  }
  
  let res:string = ''
  for(let i=0;i<binStr.length;i+=4) {
    let n1 = binStr[i] - '0'
    let n2 = binStr[i+1] - '0'
    let n3 = binStr[i+2] - '0'
    let n4 = binStr[i+3] - '0'
    let val = (n1 * 8) + (n2 * 4) + (n3 * 2) + (n4 * 1)
    res += `${val-3}`
  }
  return res
  
}

// 2421 code 
// to 
export const applyAlken = async (binStr:string):Promise<string | null> => {
  if(typeof binStr !== 'string') {
    throw new DataTypeError(typeof binStr)
    return null
  }
  
  let res = ''
  for(let i=0;i<binStr.length;i++) {
    let digit = binStr[i] - '0'
    let block = ''
    if(digit > 4) {
      digit = 9 - digit
      block = await applyBCD(`${digit}`)
      block = await applyOneComp(block)
      res += block + (i < binStr.length-1 ? ' ' : '')
    } else {
      block = await applyBCD(`${digit}`)
      res += block + (i < binStr.length-1 ? ' ' : '')
    }
  }
  return res
}

// from 
export const removeAlken = async (binStr:string):Promise<string | null> => {
  if(typeof binStr !== 'string') {
    throw new DataTypeError(typeof binStr)
    return null
  }
  binStr = binStr.replace(/\s/g,'')
  if(! await isStringBinary(binStr)) {
    throw new EncodingError('invalid number base, expected binary or base 2')
    return null
  }

  let res:string = ''
  for(let i=0;i<binStr.length;i+=4) {
    let n1 = binStr[i] - '0'
    let n2 = binStr[i+1] - '0'
    let n3 = binStr[i+2] - '0'
    let n4 = binStr[i+3] - '0'
    let val = (n1 * 2) + (n2 * 4) + (n3 * 2) + (n4 * 1)
    res += `${val}`
  }
  return res
}