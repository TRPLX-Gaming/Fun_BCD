// imports
import express,{Request, Response} from 'express'
import path from 'path'

// constants
const app = express()
const PATH = path.join(__dirname,'../public')
const TARGET = path.join(PATH,'/index.html')

// APIs
app.get('/',(req:Request, res:Response) => {
  res.sendFile(TARGET)
})

app.listen(3000,()=>console.log('active on port 3000'))
console.log('ok')