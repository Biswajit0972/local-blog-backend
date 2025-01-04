import {v2 as cloudinary} from  "cloudinary";
import fs from "fs";
import {ErrorResponse} from "../ErrorResponse/errorResponse";

const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
})


export  const uploadOnCloudinary = async (filePath: any, fileName: string) => {
    try {
        if (!filePath) {
            return new ErrorResponse("file  path not foung", "404", "Not Found")
        }

        const fileUrl =  await cloudinary.uploader
            .upload(
                filePath, {
                    public_id: fileName,
                    mime_type: "auto",
                }
            )

        if (!fileUrl.url) {
            return new ErrorResponse("something went's wrong while uploading file ", "500", "Internal Server Error")
        }

         fs.unlink(filePath,  (err) => {
            if(err)  console.log(err)
         });

        return fileUrl.url;
    }catch(err) {
        console.log(err)
        fs.unlinkSync(filePath)
    }
}