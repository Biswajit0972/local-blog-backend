import {ErrorResponse} from "../../../../utils/ErrorResponse/errorResponse";
import {UserModel} from "../../../../model/user/user.model";
import {ApiResponse} from "../../../../utils/ApiResponse/apiresponse";

export const signIn  = async (req: any, res: any) => {
    try {
        const {identifier, password} = req.body;

        if (!identifier.trim() || !password.trim()) {
            throw new ErrorResponse("please provide all the fields", "400", "Bad Request")
        }

        const isUser = await UserModel.findOne({
            $or: [{email: identifier}, {username: identifier}],
        });

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.DEV === "DEV",
            sameSite: "Lax",
            expiresIn: "1d",
        }

        if (!isUser?._id) {
            throw new ErrorResponse("User not found", "404", "Not Found")
        }else if (isUser.isVerified) {
            const isValid = await isUser.isPasswordValid(password);
            if (!isValid) {
                throw new ErrorResponse("Invalid credentials", "401", "Unauthorized")
            }

            const {accessToken, refreshToken} = await generateToken(String(isUser?._id)) as {accessToken:string, refreshToken:string};

            const updatedUser =  await UserModel.findById(isUser?._id).select(["-password", "-refreshToken"]);
            res.status(200)
                .cookie("accessToken", accessToken, cookieOptions)
                .cookie("refreshToken", refreshToken, cookieOptions)
                .json(new  ApiResponse(updatedUser, "user login successfully", "200", "OK"));
        }else  {
            const isValid = await isUser.isPasswordValid(password);
            if (!isValid) {
                throw new ErrorResponse("Invalid credentials", "401", "Unauthorized")
            }
            const {accessToken, refreshToken} = await generateToken(String(isUser?._id)) as {accessToken:string, refreshToken:string};

            const updatedUser =  await UserModel.findById(isUser?._id).select(["-password", "-refreshToken"]);
            res
                .cookie("accessToken", accessToken, cookieOptions)
                .cookie("refreshToken", refreshToken, cookieOptions)
                .status(200)
                .json(new  ApiResponse({updatedUser, isVerified: false}, "user login successfully, please verify your account" +
                    "", "200", "OK"))

        }

    }catch (err:any) {

        res.status(Number(err.statusCode) || 500).json(new ApiResponse("", err.message, err.statusCode, err.statusType));
    }
}

async function generateToken  (userId:string) {
    const user = await UserModel.findById(userId);
    if (!user) {
     return;
    }
    const accessToken = await user?.genAccessToken();
    const refreshToken = await user?.genRefreshToken();
    user.refreshToken = refreshToken;
    await user?.save({validateBeforeSave:false});
    return {accessToken, refreshToken};
}