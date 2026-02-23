import {Router, Request, Response} from 'express'
import isOperationValid, {
  applyOneComp,
  applyTwoComp,
  applyGrayCode,
  applyBCD,
  applyX3,
  applyAlken
} from './utils'

const inRouter = Router()

inRouter.post('/one-comp',async (req:Request, res:Response) => {
  const {data} = req.body || {}
  const result = await applyOneComp(data)
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

inRouter.post('/two-comp',async (req:Request, res:Response) => {
  const {data} = req.body || {}
  const result = await applyTwoComp(data)
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

inRouter.post('/gray-code',async (req:Request, res:Response) => {
  const {data} = req.body || {}
  const result = await applyGrayCode(data)
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

inRouter.post('/2421',async (req:Request, res:Response) => {
  const {data} = req.body || {}
  const result = await applyAlken(data)
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

inRouter.post('/8421',async (req:Request, res:Response) => {
  const {data} = req.body || {}
  const result = await applyBCD(data)
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

inRouter.post('/excess-3',async (req:Request, res:Response) => {
  const {data} = req.body || {}
  const result = await applyX3(data)
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

export default inRouter