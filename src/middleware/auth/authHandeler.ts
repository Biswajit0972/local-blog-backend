import {ErrorResponse} from "../../utils/ErrorResponse/errorResponse";
import {ApiResponse} from "../../utils/ApiResponse/apiresponse";
import jwt, {VerifyOptions} from "jsonwebtoken";
import {verifyToken} from "../../utils/type/type";
export const authHandeler = async (req:any, res:any, next:any ) => {
try{
    const accessToken = req.cookies["accessToken"];
    if (!accessToken) {
        throw new ErrorResponse("Invalid accessToken", "401", "Unauthorized")
    }

    const isValidToken =  jwt.verify(accessToken, process.env["JWT_SECURE_CODE_ACCESSTOKEN"] || "") as verifyToken;

    if (!isValidToken.id) {
        throw new ErrorResponse("Invalid id", "401", "Unauthorized")
    }
    req.user = isValidToken.id
    next();
}catch (err:any) {
    res.status(Number(err.statusCode) || 401).json(new ApiResponse("", err.message || err.toString(), err.statusCode, err.status));
}
}