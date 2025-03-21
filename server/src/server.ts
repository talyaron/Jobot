import express from 'express'
import authRoutes from "./Routes/authRoutes";
import employerRoutes from "./Routes/employerRoutes"
import cookieParser from 'cookie-parser';
import cors from "cors"
import mongoose from 'mongoose';
import 'dotenv/config';
import jobRoutes from './Routes/jobRoutes';
import userPreferencesRouter from "./Routes/userRoutes";
import chatRoutes from './Routes/chatRoutes'


const app = express()
const port = 3000;
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'], // Array of allowed origins
  credentials: true
}));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  next();
});

export const secretKey = String(process.env.SECRET_JWT) || "1234";
export const saltRounds = Number(process.env.SALT_BCRYPT) || 3;

app.use("/api/user", userPreferencesRouter);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/employer/jobs", employerRoutes);
app.use("/api/chat", chatRoutes);

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