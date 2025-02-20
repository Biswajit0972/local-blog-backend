import express from "express";
import {signUp} from "../../controller/user/usersession/signup/user.signUp";
import {upload} from "../../middleware/multer/multer";
import {signIn} from "../../controller/user/usersession/signin/user.singIn";
import {accountVerification} from "../../controller/user/usersession/verify/accountVerification";
import {updataAvatar} from "../../controller/user/userdetails/updateavatar/updataAvatar";
import {authHandeler} from "../../middleware/auth/authHandeler";
import {updateUserProfile} from "../../controller/user/userdetails/updateUserDetails/updateUserProfile";
import { handelDeleteComment } from "../../controller/feedback/comments/deleteComment/deleteComment";
import { handelCreateComment } from "../../controller/feedback/comments/createComment/createComment";

const router = express.Router();

router.route("/api/v1/sign-up").post(upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]),signUp)
router.route("/api/v1/sign-in").post(signIn);
router.route("/api/v1/verify").post(accountVerification);
router.route("/api/v1/update-avatar").post(authHandeler, upload.single("avatar"),updataAvatar);
router.route("/api/v1/update-profile").post(authHandeler, updateUserProfile);
router.route("/api/v1/create-comment").post(authHandeler, handelCreateComment);
router.route("/api/v1/delete-comment").delete( authHandeler, handelDeleteComment);

router.route("/").get(authHandeler, (req:any, res) => {
    console.log(req.path)
    res.status(200).json({})
})

export default router;