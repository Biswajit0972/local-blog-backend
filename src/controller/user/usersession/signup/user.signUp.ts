import {ErrorResponse} from "../../../../utils/ErrorResponse/errorResponse";
import {UserModel} from "../../../../model/user/user.model";
import {OTP} from "../../../../utils/OTP/otp";
import {uploadOnCloudinary} from "../../../../utils/cloudinary/uploadOnCloud";
import {resendEmail} from "../../../../utils/resend/resend";
import {ApiResponse} from "../../../../utils/ApiResponse/apiresponse";


export const signUp = async (req:any, res:any) => {
     try {
        const {username, fullName,  password, email} = req.body as { username: string ,  password: string, fullName: string, email: string };

         if (!username.trim() || !fullName.trim() || !email.trim() || !password.trim()) {
             throw new ErrorResponse("please provide all the fields", "400", "Bad Request")
         }

         const isUserExsist = await UserModel.find({
          $or: [{email}, {username}]
         });

         if (isUserExsist[0]?.isVerified) {
           throw new ErrorResponse("User exists and also verified", "400", "Bad Request")
         }

         const {avatar, coverImage} = req.files;


         if (!avatar) {
             throw new ErrorResponse("Please provide an avatar image", "400", "Bad Request");
         }

         const avatarUrl = await uploadOnCloudinary(avatar[0].path, `${username}'s avatar`)
         let coverImageUrl;

         if (coverImage) {
            coverImageUrl = await uploadOnCloudinary(coverImage[0].path, `${username}'s coverimage`)
         }

         const otp = OTP();

         if (isUserExsist.length === 0) {
             const expirationTime = Date.now() + 10 * 60 * 1000;

             const newUser = await UserModel.create({username, fullName,  password, email, coverImage: coverImageUrl, avatar: avatarUrl, verificationCode: otp, verifyExpiry: new Date(expirationTime)});

             if (!newUser._id) {
                throw new ErrorResponse("something went wrong while creating user ", "500", "Internal Server Error");
             }

             const sendEmail = await resendEmail(email, otp);

             if (!sendEmail) {
                  await UserModel.findByIdAndDelete(newUser._id);
                 throw new ErrorResponse("unable to send email, please add a valid email or something went wrong", "500", "Internal Server Error");
             }

             res.status(201).json(new ApiResponse("", "user created successfully, please verify your account using otp that was send already", "201", "Created"));
         }
         else {
            const otp = OTP();
            const expirationTime = Date.now() + 10 * 60 * 1000;
            isUserExsist[0].verificationCode = otp;
            isUserExsist[0].verifyExpiry = new Date(expirationTime);
            await isUserExsist[0].save({validateBeforeSave: false});
           const sendEmail = await resendEmail(email, otp);
             if (!sendEmail) {
                 throw new ErrorResponse("unable to send email, please add a valid email or something went wrong", "500", "Internal Server Error");
             }
             res.status(202).json(new ApiResponse("", "User is already created, please verify your account using otp", "202", "Accepted"))
         }
         // res.status(202).json(new ApiResponse("", "User is already created, please verify your account using otp", "202", "Accepted"))
     }catch (err: any) {
         console.log(err)
         res.status(Number(err.statusCode)).json(err)
     }
}