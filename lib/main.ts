import express,{Request, Response} from 'express'

const app = express()

app.get('/',(req:Request, res:Response) => {
  res.send('200')
})

app.listen(3000,()=>console.log('active on port 3000'))
console.log('ok')