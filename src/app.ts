import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser"
import { upload} from "./middleware/multer/multer";
import {uploadOnCloudinary} from "./utils/cloudinary/uploadOnCloud";


const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true , limit: "10mb" }));
app.use(cookieParser());

app.post("/upload", upload.single("file"), async (req, res) => {
     const filePath = req.file?.path
     const url = await uploadOnCloudinary(filePath, "avatar");
    console.log(url)


    res.status(200).send("success");
})




export {app}