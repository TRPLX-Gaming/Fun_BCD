// imports
import express,{Request, Response} from 'express'
import path from 'path'
import inRouter from './inRouter'
import outRouter from './outRouter'

// constants
const app = express()
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))
const PATH = path.join(__dirname,'../public')
const TARGET = path.join(PATH,'/index.html')

// APIs
app.get('/',async (req:Request, res:Response) => {
  res.sendFile(TARGET)
})

app.use('/convert',inRouter)

app.use('/convert-back',outRouter)

app.listen(3000,()=>console.log('active on port 3000'))