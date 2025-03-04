import express from 'express'
import authRoutes from "./Routes/authRoutes";
import employerRoutes from "./Routes/employerRoutes"
import cookieParser from 'cookie-parser';
import cors from "cors"
import mongoose from 'mongoose';
import 'dotenv/config';
import jobRoutes from './Routes/jobRoutes';

const app = express()
const port = 3000;
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'], // Array of allowed origins
  credentials: true
}));


export const secretKey = String(process.env.SECRET_JWT) || "1234";
export const saltRounds = Number(process.env.SALT_BCRYPT) || 3;


app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/employer", employerRoutes);

const dbUrl = process.env.DB_URL;
const database = 'jobot';

//connection
mongoose.connect(`${dbUrl}${database}`).then(()=>{
    console.info("DB connected")
}).catch((err)=>{
    console.error(err)
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

import userPreferencesRouter from "./Routes/userPreferencesRouter";
app.use("/api", userPreferencesRouter);

import jobsRouter from "./Routes/jobRoutes";
app.use("/api", jobsRouter);

import userJobsRouter from "./Routes/userJobsRouter";
app.use("/api", userJobsRouter);