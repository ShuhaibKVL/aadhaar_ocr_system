import express from 'express'
import dotenv from 'dotenv'
import ImageExtracter from './routes/ExtractImage.js'
import cors from 'cors'

const app = express()

dotenv.config()
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST', 'GET'],     
    credentials: true            
}));


app.use('/api',ImageExtracter)

app.listen(process.env.PORT,() => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})


