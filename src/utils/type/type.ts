// userProfile

import mongoose from "mongoose";

export interface Iuser {
    id?: mongoose.Types.ObjectId;
    fullName: string;
    username: string;
    email: string;
    password?: string;
    verificationCode: number;
    isVerified: boolean;
    refreshToken?: string;
    watchBlogs?: Array<mongoose.Schema.Types.ObjectId>[];
    tags?: string[];
}

export interface blog {
    coverImage: string
    title: string,
    content: string | unknown,
    tag: Array<string>,
    owner: mongoose.Schema.Types.ObjectId;
    isPublished: boolean,
    images?: Array<string>,
}

export type StatusCodeType = "200" | "201" | "202" | "204" | "400" | "401" | "402" | "404" | "403" | "415" | "500" | number;

export type StatusType = "OK" | "Created" | "Accepted" | "No Content" | "Bad Request" | "Unauthorized" | "Payment Required" | "Forbidden" | "Not Found" | "Unsupported Media Type" | "Internal Server Error";