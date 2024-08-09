import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"
import userRoute from "../src/routes/user.routes.js"
const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))



