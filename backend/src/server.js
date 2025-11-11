import mongoose from "mongoose";
import express from "express"
import dotenv from "dotenv"
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors({
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))

dotenv.config({path: "./.env"});



mongoose.connect(process.env.MONGO_DB_URI)
.then(()=> console.log("MongoDB connected"))
.catch(err => console.error(err))

import userRouter from "./routes.js"
app.use('/api',userRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>console.log(`server running at ${PORT}`))

