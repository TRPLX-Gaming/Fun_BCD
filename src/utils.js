"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeGrayCode = exports.applyGrayCode = exports.applyTwoComp = exports.applyOneComp = void 0;
const errors_1 = require("./errors");
const isOperationValid = async (val) => {
    return val !== null ? true : false;
};
exports.default = isOperationValid;
const applyOneComp = async (binStr) => {
    let result = [];
    if (typeof binStr !== 'string') {
        throw new errors_1.DataTypeError(typeof binStr);
        return null;
    }
    for (let i = 0; i < binStr.length; i++) {
        if (binStr[i] === '1' || binStr[i] === '0') {
            if (binStr[i] === '1') {
                result.push('0');
                continue;
            }
            if (binStr[i] === '0') {
                result.push('1');
                continue;
            }
        }
    }
    return result.join('');
};
exports.applyOneComp = applyOneComp;
const applyTwoComp = async (binStr) => {
    let oneComp = await (0, exports.applyOneComp)(binStr);
    if (await isOperationValid(oneComp)) {
        let len = oneComp.length;
        let result = '';
        if (oneComp[len - 1] === '0') {
            result = replaceStr(oneComp, len - 1, '1');
        }
        else if (oneComp[len - 1] === '1') {
            result = twoCompDeep(oneComp);
        }
        return result;
    }
    return null;
};
exports.applyTwoComp = applyTwoComp;
const replaceStr = (str, i, repl) => {
    if (typeof i !== 'number') {
        throw new errors_1.DataTypeError(typeof i);
        return;
    }
    let strArr = str.split('');
    strArr[i] = repl;
    return strArr.join('');
};
const twoCompDeep = (str) => {
    let strArr = str.split('');
    for (let i = strArr.length - 1; i >= 0; i--) {
        if (strArr[i] === '1') {
            strArr[i] = '0';
        }
        else {
            strArr[i] = '1';
            break;
        }
    }
    return strArr.join('');
};
const applyGrayCode = async (binStr) => {
    if (typeof binStr !== 'string') {
        throw new errors_1.DataTypeError(typeof binStr);
        return null;
    }
    let arr = binStr.split(''), result = [];
    result.push('1');
    if (arr[0] !== arr[1])
        result.push('1');
    else
        result.push('0');
    for (let i = 2; i < arr.length; i++) {
        if (arr[i] !== arr[i - 1])
            result.push('1');
        else
            result.push('0');
    }
    return result.join('');
};
exports.applyGrayCode = applyGrayCode;
const removeGrayCode = async (binStr) => {
    let arr = binStr.split(''), result = [], temp = '1';
};
exports.removeGrayCode = removeGrayCode;
