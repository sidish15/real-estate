import express from "express";
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from "./routes/user.route.js"
//as user.route.js has exported its router defualt so we just import it in the variable named userRouter
import authRouter from "./routes/auth.route.js"
import ListingRouter from "./routes/listing.route.js"
import cookieParser from "cookie-parser";
dotenv.config();//initilizing dotenv


mongoose.connect(process.env.MONGO).then(()=>{
        console.log(`Connected to MongoDB`)
}).catch((err)=>{
        console.log(err);
})
const app=express();
//we are not allowed to send any JSON to the server
//we need to allow the JSON as the input 
app.use(express.json())

app.use(cookieParser());//now u can get the inf from the cookie


app.listen(3000,()=>{
        console.log(`Server is running on port 3000`)
})

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter);
app.use("/api/listing",listingRouter)

// middleware
// err = the error which we will pass in next function
app.use((err,req,res,next)=>{
const statusCode= err.statusCode || 500;
const message =err.message || 'Internal Server Error';
return res.status(statusCode).json({
        success:false,
        statusCode,
        message
})
})
