import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connection } from "./database.js";

dotenv.config();
const app = express()
app.use(cors({origin : "http://localhost:5173/"}))
await connection()
app.listen(process.env.PORT , ()=>{
    console.log("Server Started")
})