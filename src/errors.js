"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncodingError = exports.DataTypeError = void 0;
class DataTypeError extends Error {
    constructor(dataType) {
        super(`Error occured due to invalid data type, did not expect: ${dataType}`);
        this.name = "DataTypeError";
        Object.setPrototypeOf(this, DataTypeError.prototype);
    }
}
exports.DataTypeError = DataTypeError;
class EncodingError extends Error {
    constructor(message) {
        super(message);
        this.name = "EncodingError";
        Object.setPrototypeOf(this, EncodingError.prototype);
    }
}
exports.EncodingError = EncodingError;
