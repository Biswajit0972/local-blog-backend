import {ErrorResponse} from "../../../../utils/ErrorResponse/errorResponse";
import {UserModel} from "../../../../model/user/user.model";
import {deleteImageCloudinary} from "../../../../utils/cloudinary/deleteImage";
import {uploadOnCloudinary} from "../../../../utils/cloudinary/uploadOnCloud";
import {ApiResponse} from "../../../../utils/ApiResponse/apiresponse";

export const updataAvatar = async (req:any, res:any) => {
    try {
        const validUser = req.user;
        if (!validUser) {
            throw new ErrorResponse("unauthorized", "401", "Unauthorized")
        }

        const isUserExist = await UserModel.findById(validUser);

        if(!isUserExist?._id) {
            throw new ErrorResponse("User not found for updating  user", "400", "Bad Request")
        }

        const avatarPublicId = `${isUserExist.username}'s avatar`;

        await deleteImageCloudinary(avatarPublicId);
        const avatar = req.file;
        const uploadedAvatar = await uploadOnCloudinary(avatar.path, avatarPublicId);

        if (!uploadedAvatar) {
            throw new ErrorResponse("server error", "500", "Internal Server Error")
        }

        if  (typeof uploadedAvatar === "string") {
            isUserExist.avatar = uploadedAvatar!
        }

         await isUserExist.save({validateBeforeSave: false})
        res.status(200).json(new ApiResponse("", "avatar is updated", "201", "Accepted"))
    }catch (err:any) {
        res.status(Number(err.statusCode) || 500).json(new ApiResponse("", err.message || err.toString(), err.statusCode, err.status || "Internal Server Error"));
    }
}