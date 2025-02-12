import express from "express";
import dotenv from "dotenv"
import connectDB from "./database/dbConnect.js";
import userRoute from "./routes/user_routes.js";
import courseRoute from "./routes/course_route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import mediaRoute from "./routes/media_route.js"
import purchaseRoute from "./routes/purcahse_route.js"
import lectureRoute from "./routes/courseProgress_route.js"
import path from "path"
dotenv.config({});

const __dirname = path.resolve();
connectDB();
const app=express();
const PORT=process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true    
}));

app.use("/api/v1/media",mediaRoute)
app.use("/api/v1/user",userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/lecture", lectureRoute);


app.use(express.static(path.join(__dirname, "/client/LMS/dist")));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,"client","LMS","dist","index.html"))
})
app.listen(PORT,()=>{
    console.log(`Server is saying hello at ${PORT}`);
})