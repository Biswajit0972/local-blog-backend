import {ErrorResponse} from "../../../../utils/ErrorResponse/errorResponse";
import {UserModel} from "../../../../model/user/user.model";
import {ApiResponse} from "../../../../utils/ApiResponse/apiresponse";
import {updateHelper} from "../../../../utils/reusedCode/updateHelper";

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
        await updateHelper(isUserExist, req.file.path, avatarPublicId);

        res.status(200).json(new ApiResponse("", "avatar is updated", "201", "Accepted"))
    }catch (err:any) {
        res.status(Number(err.statusCode) || 500).json(new ApiResponse("", err.message || err.toString(), err.statusCode, err.status || "Internal Server Error"));
    }
}