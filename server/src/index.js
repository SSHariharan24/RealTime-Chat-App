import express from "express"
import path from "path";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import {connectDB} from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cors from "cors"
import { app, server } from "./lib/socket.js";

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
dotenv.config()
const PORT = process.env.PORT
const __dirname = path.resolve();

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
    });
  }

server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);   
    connectDB()
})

