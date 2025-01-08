import {ErrorResponse} from "../../../../utils/ErrorResponse/errorResponse";
import {UserModel} from "../../../../model/user/user.model";
import {ApiResponse} from "../../../../utils/ApiResponse/apiresponse";

export const accountVerification = async(req: any, res:any ) => {
    try {
        const {userId, Otp} = req.body;
        if (!userId || !Otp) {
            throw new ErrorResponse("please provide all the fields", "400", "Bad Request")
        }
        const getUserById = await UserModel.findById(userId);

        if (!getUserById?._id) {
            return res.status(400).json(new ApiResponse("","Invalid user id", "404", "Not Found"));
        }

        if (getUserById?.verificationCode == Otp && new Date(Date.now()) <= getUserById?.verifyExpiry) {
            getUserById.isVerified = true;
            await getUserById.save({validateBeforeSave: false});
            res.status(201).json(new ApiResponse("verified","User verified successfully", "201", "Accepted"))
        }else {
            res.status(403).json(new ApiResponse("","Invalid Otp or Expired", "403", "Forbidden"))
        }
    }catch(err:any) {
        console.log(err.message);
        res.status(Number(err.statusCode) || 500).json(new ErrorResponse(err.message, err.statusCode, err.statusType))
    }
}