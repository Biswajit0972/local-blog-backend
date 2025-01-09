import {ErrorResponse} from "../../../../utils/ErrorResponse/errorResponse";
import {UserModel} from "../../../../model/user/user.model";
import {ApiResponse} from "../../../../utils/ApiResponse/apiresponse";

export const updateUserProfile = async (req: any, res:any) => {
    try{
        if (!req.user) {
            throw new ErrorResponse("unauthorized", "401", "Unauthorized");
        }

        const isUserExist = await UserModel.findById(req.user);

        if (!isUserExist) {
            throw new ErrorResponse("user not found", "404", "Not Found");
        }

        const {fullName,bio,tags} = req.body;

        if (!fullName || !bio || tags.length === 0) {
            throw new ErrorResponse("please provide all the fields", "400", "Bad Request")
        }

        isUserExist.bio = bio;
        isUserExist.fullName = bio;
        isUserExist.tags = tags;
        await isUserExist.save({validateBeforeSave: false});
        res.status(200).send("ok")
    }catch(err:any){
        console.log(err)
        res.status(Number(err.statusCode) || 500).json(new ApiResponse("", err.message, err.statusCode, err.statusType));
    }
}