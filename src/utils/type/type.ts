// userProfile

import mongoose, {Document} from "mongoose";

export interface Iuser extends Document {
    id?: mongoose.Types.ObjectId;
    fullName: string;
    username: string;
    email: string;
    password?: string;
    verificationCode: number;
    isVerified: boolean;
    refreshToken?: string;
    coverImage?: string;
    avatar: string;
    watchBlogs?: Array<mongoose.Schema.Types.ObjectId>[];
    tags: string[];
}

export interface Iblog extends Document {
    id?:mongoose.Types.ObjectId;
    coverImage: string
    title: string,
    content: string | unknown,
    tag: Array<string>,
    owner: mongoose.Schema.Types.ObjectId;
    isPublished: boolean,
    images?: Array<string>,
    watchBlog: mongoose.Types.ObjectId;
}

export interface verifyToken {
    id: string;
    email: string;
    iat: number;
    exp: number;
}

export interface Icomment extends Document {
  blogId: mongoose.Types.ObjectId;
  content: string;
  authorId: mongoose.Types.ObjectId;
}

export interface Ifeedback extends Icomment{
   feedback: string;
}

export type StatusCodeType = "200" | "201" | "202" | "204" | "400" | "401" | "402" | "404" | "403" | "415" | "500" | number;

export type StatusType = "OK" | "Created" | "Accepted" | "No Content" | "Bad Request" | "Unauthorized" | "Payment Required" | "Forbidden" | "Not Found" | "Unsupported Media Type" | "Internal Server Error";
export type FeedBackType = "Like" | "Love" | "Clamp"  | "DisLike"