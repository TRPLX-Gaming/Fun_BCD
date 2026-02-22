export class DataTypeError extends Error {
  constructor(dataType: dataTypes) {
      super(`Error occured due to invalid data type, did not expect: ${dataType}`)
      this.name = "DataTypeError"
      Object.setPrototypeOf(this, DataTypeError.prototype)
    }
}

type dataTypes = 'string' | 'number' | 'boolean' | 'undefined' | 'bigint' |
'function' | any

export class EncodingError extends Error {
  constructor(message: string) {
      super(message)
      this.name = "EncodingError"
      Object.setPrototypeOf(this, EncodingError.prototype)
    }
}