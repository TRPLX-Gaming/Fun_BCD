import {Router, Request, Response} from 'express'
import isOperationValid, {
  removeGrayCode,
  removeBCD,
  removeX3,
  removeAlken
} from './utils'

const outRouter = Router()

outRouter.post('/gray-code',async (req:Request, res:Response) => {
  const {data} = req.body || {}
  const result = await removeGrayCode(data)
  if(await isOperationValid(result)) {
    res.status(201).json({
      data:result
    })
    return
  }
  res.status(500).json({
    data:null
  })
})

outRouter.post('/2421',async (req:Request, res:Response) => {
  const {data} = req.body || {}
  const result = await removeAlken(data)
  if(await isOperationValid(result)) {
    res.status(201).json({
      data:result
    })
    return
  }
  res.status(500).json({
    data:null
  })
})

outRouter.post('/8421',async (req:Request, res:Response) => {
  const {data} = req.body || {}
  const result = await removeBCD(data)
  if(await isOperationValid(result)) {
    res.status(201).json({
      data:result
    })
    return
  }
  res.status(500).json({
    data:null
  })
})

outRouter.post('/excess-3',async (req:Request, res:Response) => {
  const {data} = req.body || {}
  const result = await removeX3(data)
  if(await isOperationValid(result)) {
    res.status(201).json({
      data:result
    })
    return
  }
  res.status(500).json({
    data:null
  })
})

export default outRouter