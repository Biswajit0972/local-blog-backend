import mongoose, {Schema} from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from "bcryptjs";
import jwt from  "jsonwebtoken";
import {Iuser} from "../../utils/type/type";

const userSchema = new Schema<Iuser>({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: [20, "Username is too long"],
        lowercase: true,
    },
    fullName: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        minlength: [6, "Password is too short"],
    },
    verificationCode: {
        type: Number,
        required: true,
    },
    verifyExpiry: {
        type: Date,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    refreshToken: {
        type: String,
    },
    watchBlogs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Blog",
        },
    ],
    tags: [
        {
            type: String,
        }
    ],
    coverImage: {
        type: String,
    },
    avatar: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    }
}, {
    timestamps: true
});


userSchema.pre("save",  async function (next) {
     if (!this.isModified("password")) {
         return next();
     }

    this.password = await bcrypt.hash(this.password || "", 10);
    return next();
});

userSchema.methods.isPasswordValid = function (password: string) {
    return bcrypt.compare(password, this.password);
}


userSchema.methods.genAccessToken = function () {
     return jwt.sign({
         id: this._id,
         email: this.email,
         username: this.username,
     }, process.env.JWT_SECURE_CODE_ACCESSTOKEN || "", {expiresIn: "15d"})
}

userSchema.methods.genRefreshToken = function () {
     return jwt.sign({
         id: this._id,
     }, process.env.JWT_SECURE_CODE_REFRESHTOKEN || "", {expiresIn: "1d"})
};

userSchema.plugin(aggregatePaginate);

export const UserModel = mongoose.model<Iuser>("users", userSchema);