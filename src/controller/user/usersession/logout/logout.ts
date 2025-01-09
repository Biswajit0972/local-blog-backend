import {ErrorResponse} from "../../../../utils/ErrorResponse/errorResponse";
import {UserModel} from "../../../../model/user/user.model";
import {ApiResponse} from "../../../../utils/ApiResponse/apiresponse";

export const logoutHandler = async (req: any,  res:any) => {
    try {
        if (!req.user) {
            throw new ErrorResponse("unauthrized!", "401", "Unauthorized")
        }

        const user = await UserModel.findById(req.user);
        if (!user?._id) {
            throw new ErrorResponse("user not found", "404", "Not Found");
        }

        user.refreshToken = "";
        await user.save({validateBeforeSave: true});

        res.cookie("accessToken", "", {httpOnly: true, sameSite: "Lax"})
            .cookie("refreshToken", "", {httpOnly: true, sameSite: "Lax"})
            .status(200).json(new ApiResponse("", "user log out successfully!", "200", "OK"));
    }catch (err:any) {
        res.status(Number(err.statusCode) || 500).json(new ApiResponse("", err.message, err.statusCode, err.statusType));
    }
}