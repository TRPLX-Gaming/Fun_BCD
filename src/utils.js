"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAlken = exports.applyAlken = exports.removeX3 = exports.applyX3 = exports.removeBCD = exports.applyBCD = exports.removeGrayCode = exports.applyGrayCode = exports.applyTwoComp = exports.applyOneComp = void 0;
const errors_1 = require("./errors");
const isOperationValid = async (val) => {
    return val !== null ? true : false;
};
const isStringBinary = async (binStr) => {
    if (typeof binStr === 'number')
        binStr = binStr.toString();
    let ctr = 0;
    for (let i = 0; i < binStr.length; i++) {
        if (binStr[i] === '0' || binStr[i] === '1') {
            ctr++;
        }
    }
    return (ctr === binStr.length) ? true : false;
};
exports.default = isOperationValid;
const applyOneComp = async (binStr) => {
    let result = [];
    if (typeof binStr !== 'string') {
        throw new errors_1.DataTypeError(typeof binStr);
        return null;
    }
    if (!await isStringBinary(binStr)) {
        throw new errors_1.EncodingError('invalid number base, expected binary or base 2');
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
    if (typeof binStr !== 'string') {
        throw new errors_1.DataTypeError(typeof binStr);
        return null;
    }
    if (!await isStringBinary(binStr)) {
        throw new errors_1.EncodingError('invalid number base, expected binary or base 2');
        return null;
    }
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
    if (!await isStringBinary(binStr)) {
        throw new errors_1.EncodingError('invalid number base, expected binary or base 2');
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
    if (typeof binStr !== 'string') {
        throw new errors_1.DataTypeError(typeof binStr);
        return null;
    }
    if (!await isStringBinary(binStr)) {
        throw new errors_1.EncodingError('invalid number base, expected binary or base 2');
        return null;
    }
    let arr = binStr.split(''), result = [], temp = '1';
    result.push('1');
    if (temp !== arr[1])
        result.push('1');
    else {
        result.push('0');
        temp = '0';
    }
    for (let i = 2; i < arr.length; i++) {
        if (temp !== arr[i]) {
            result.push('1');
            temp = '1';
        }
        else {
            result.push('0');
            temp = '0';
        }
    }
    return result.join('');
};
exports.removeGrayCode = removeGrayCode;
const applyBCD = async (binStr) => {
    if (typeof binStr !== 'string') {
        throw new errors_1.DataTypeError(typeof binStr);
        return null;
    }
    let res = '';
    for (let i = 0; i < binStr.length; i++) {
        let digit = binStr[i] - '0', block = '';
        for (let weight = 8; weight >= 1; weight /= 2) {
            if (digit >= weight) {
                block += '1';
                digit -= weight;
            }
            else
                block += '0';
        }
        res += block + (i < binStr.length - 1 ? ' ' : '');
    }
    return res;
};
exports.applyBCD = applyBCD;
const removeBCD = async (binStr) => {
    if (typeof binStr !== 'string') {
        throw new errors_1.DataTypeError(typeof binStr);
        return null;
    }
    binStr = binStr.replace(/\s/g, '');
    if (!await isStringBinary(binStr)) {
        throw new errors_1.EncodingError('invalid number base, expected binary or base 2');
        return null;
    }
    let res = '';
    for (let i = 0; i < binStr.length; i += 4) {
        let n1 = binStr[i] - '0';
        let n2 = binStr[i + 1] - '0';
        let n3 = binStr[i + 2] - '0';
        let n4 = binStr[i + 3] - '0';
        let val = (n1 * 8) + (n2 * 4) + (n3 * 2) + (n4 * 1);
        res += `${val}`;
    }
    return res;
};
exports.removeBCD = removeBCD;
const applyX3 = async (binStr) => {
    if (typeof binStr !== 'string') {
        throw new errors_1.DataTypeError(typeof binStr);
        return null;
    }
    let res = '';
    for (let i = 0; i < binStr.length; i++) {
        let digit = binStr[i] - '0', block = '';
        digit += 3;
        for (let weight = 8; weight >= 1; weight /= 2) {
            if (digit >= weight) {
                block += '1';
                digit -= weight;
            }
            else
                block += '0';
        }
        res += block + (i < binStr.length - 1 ? ' ' : '');
    }
    return res;
};
exports.applyX3 = applyX3;
const removeX3 = async (binStr) => {
    if (typeof binStr !== 'string') {
        throw new errors_1.DataTypeError(typeof binStr);
        return null;
    }
    binStr = binStr.replace(/\s/g, '');
    if (!await isStringBinary(binStr)) {
        throw new errors_1.EncodingError('invalid number base, expected binary or base 2');
        return null;
    }
    let res = '';
    for (let i = 0; i < binStr.length; i += 4) {
        let n1 = binStr[i] - '0';
        let n2 = binStr[i + 1] - '0';
        let n3 = binStr[i + 2] - '0';
        let n4 = binStr[i + 3] - '0';
        let val = (n1 * 8) + (n2 * 4) + (n3 * 2) + (n4 * 1);
        res += `${val - 3}`;
    }
    return res;
};
exports.removeX3 = removeX3;
const applyAlken = async (binStr) => {
    if (typeof binStr !== 'string') {
        throw new errors_1.DataTypeError(typeof binStr);
        return null;
    }
    let res = '';
    for (let i = 0; i < binStr.length; i++) {
        let digit = binStr[i] - '0';
        let block = '';
        if (digit > 4) {
            digit = 9 - digit;
            block = await (0, exports.applyBCD)(`${digit}`);
            block = await (0, exports.applyOneComp)(block);
            res += block + (i < binStr.length - 1 ? ' ' : '');
        }
        else {
            block = await (0, exports.applyBCD)(`${digit}`);
            res += block + (i < binStr.length - 1 ? ' ' : '');
        }
    }
    return res;
};
exports.applyAlken = applyAlken;
const removeAlken = async (binStr) => {
    if (typeof binStr !== 'string') {
        throw new errors_1.DataTypeError(typeof binStr);
        return null;
    }
    binStr = binStr.replace(/\s/g, '');
    if (!await isStringBinary(binStr)) {
        throw new errors_1.EncodingError('invalid number base, expected binary or base 2');
        return null;
    }
    let res = '';
    for (let i = 0; i < binStr.length; i += 4) {
        let n1 = binStr[i] - '0';
        let n2 = binStr[i + 1] - '0';
        let n3 = binStr[i + 2] - '0';
        let n4 = binStr[i + 3] - '0';
        let val = (n1 * 2) + (n2 * 4) + (n3 * 2) + (n4 * 1);
        res += `${val}`;
    }
    return res;
};
exports.removeAlken = removeAlken;
