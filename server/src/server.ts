import express from 'express'
import authRoutes from "./Routes/authRoutes";
import employerRoutes from "./Routes/employerRoutes";
import cors from "cors"
import mongoose from 'mongoose';
import 'dotenv/config';
import jobRoutes from './Routes/jobRoutes';
import userPreferencesRouter from "./Routes/userRoutes";
import chatRoutes from './Routes/chatRoutes';
import cookieParser from 'cookie-parser';
import cvRoutes from "./Routes/cvFormRoutes"


const app = express()
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'], // Array of allowed origins
  credentials: true
}));


export const secretKey = String(process.env.SECRET_JWT) || "1234";
export const saltRounds = Number(process.env.SALT_BCRYPT) || 3;

app.use("/api/user", userPreferencesRouter);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/employer/jobs", employerRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/cv", cvRoutes);

const dbUrl = process.env.DB_URL;
const database = 'jobot';


//connection
mongoose.connect(`${dbUrl}/${database}`).then(()=>{
    console.info("DB connected")
}).catch((err)=>{
    console.error(err)
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})