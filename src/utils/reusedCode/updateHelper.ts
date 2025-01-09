import {ErrorResponse} from "../ErrorResponse/errorResponse";
import {deleteImageCloudinary} from "../cloudinary/deleteImage";
import {uploadOnCloudinary} from "../cloudinary/uploadOnCloud";
import {Iuser} from "../type/type";

export const updateHelper = async (user: Iuser, localPath:any, publicIdOfImage:string) => {
try{
   if (!localPath ||  !publicIdOfImage) {
       throw new ErrorResponse("Please provide all  the fields", "400", "Bad Request")
   }

    await deleteImageCloudinary(publicIdOfImage);
    const uploadedAvatar = await uploadOnCloudinary(localPath, publicIdOfImage);
    if (!uploadedAvatar) {
        throw new ErrorResponse("server error", "500", "Internal Server Error")
    }
    if  (typeof uploadedAvatar === "string") {
        user.avatar = uploadedAvatar!
    }
    await user.save({validateBeforeSave: false})
}catch(err){
    console.log(err)
    throw new ErrorResponse("server error", "500", "Internal Server Error")
}
}