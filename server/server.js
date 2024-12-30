import express from 'express'
import dotenv from 'dotenv'
import ImageExtracter from './routes/ExtractImage.js'
import cors from 'cors'

const app = express()

dotenv.config()
app.use(express.json());

if(!process.env.FRONT_URL){
     console.log('env.front_url not getting')
} 

app.use(cors({
    origin: process.env.FRONT_URL,
    methods: ['POST', 'GET'],     
    credentials: true            
}));


app.use('/api',ImageExtracter)

app.listen(process.env.PORT,() => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})


