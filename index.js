import express from "express";
import mongoose from "mongoose";
import authRouter from "./authRouter.js"
import controller from "./authController.js"

const PORT = process.env.PORT || 5000
const BD_URL = 'mongodb+srv://user:user@cluster0.ugxcxyb.mongodb.net/?retryWrites=true&w=majority'

const app = express()
mongoose.set('strictQuery', false)

app.use(express.json())
app.use("/auth", authRouter)

const start = async () => {
    try {
        await mongoose.connect(BD_URL)
        app.listen(PORT, () => { console.log('server work to ' + PORT) })
    } catch (e) {
        console.log(e)
    }
}

start()