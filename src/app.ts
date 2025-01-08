import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser"
import router from "./router/userRouter/router";


const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true , limit: "10mb" }));
app.use(cookieParser());
app.use(router)

export {app}