import express from "express"
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js"
import taskRouter from "./Routes/taskRoute.js";
import userAuthRouter from "./Routes/userAuthRoute.js";

const app = express()
const PORT = process.env.PORT || 4000

connectDB()

app.use(express.json())
app.use(cookieParser())

const allowedOrigins = ['http://localhost:3000']
app.use(cors(
    {
        origin: allowedOrigins,
        credentials: true
    }
))



app.get('/', (req, res) => {
    res.send('API working')
})



app.use('/api/task', taskRouter)
app.use('/api/user', userAuthRouter)




app.listen(PORT, () => {
    console.log("server is running")
})