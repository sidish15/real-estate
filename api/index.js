import express from "express";
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from "./routes/user.route.js"
//as user.route.js has exported its router defualt so we just import it in the variable named userRouter
import authRouter from "./routes/auth.route.js"
import listingRouter from "./routes/listing.route.js"
import cookieParser from "cookie-parser";
import path from 'path'
import cors from 'cors'
dotenv.config();//initilizing dotenv

const PORT = process.env.PORT | 8080
mongoose.connect(process.env.MONGO).then(() => {
        console.log(`Connected to MongoDB`)
}).catch((err) => {
        console.log(err);
})

const __dirname = path.resolve()

const app = express();
//we are not allowed to send any JSON to the server
//we need to allow the JSON as the input 
app.use(cors())
app.use(express.json())

app.use(cookieParser());//now u can get the inf from the cookie


app.listen(PORT, () => {
        console.log(`Server is running on port 3000`)
})

app.get('/', (req, res) => {
        return res.json({ "msg": "Welcome to real estate!" })
})

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter)


app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})


// middleware
// err = the error which we will pass in next function
app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        return res.status(statusCode).json({
                success: false,
                statusCode,
                message
        })
})

