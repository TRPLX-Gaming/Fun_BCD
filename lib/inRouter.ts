import {Router, Request, Response} from 'express'
import isOperationValid, {
  applyOneComp,
  applyTwoComp,
  applyGrayCode
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

inRouter.get('/2421',async (req:Request, res:Response) => {
  
})

inRouter.get('/8421',async (req:Request, res:Response) => {
  
})

inRouter.get('/excess-3',async (req:Request, res:Response) => {
  
})

export default inRouter