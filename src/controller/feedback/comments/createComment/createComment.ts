import { ErrorResponse } from "../../../../utils/ErrorResponse/errorResponse";
import { UserModel } from "../../../../model/user/user.model";
import { asyncHandeler } from "../../../../utils/asyncHandler/asyncHandeler";
import { CommentModel } from "../../../../model/comment/comment.model";
import { ApiResponse } from "../../../../utils/ApiResponse/apiresponse";
import { BlogModel } from "../../../../model/blogs/blog.model";

const createComment = async (req: any, res: any) => {
    if (!req.user) {
        throw new ErrorResponse("unauthorized", "401", "Unauthorized");
    }

    const isUserExist = await UserModel.findById(req.user);

    if (!isUserExist) {
        throw new ErrorResponse("user not found", "404", "Not Found");
    }
    
    const { content} = req.body;
    const {blogId} = req.query;

    if (!blogId || !content) {
        throw new ErrorResponse("bad request", "400", "Bad Request");
    }

    const isBlogExist = await BlogModel.findById(blogId);
    
    if (!isBlogExist) {
      throw new ErrorResponse("blog not found", "404", "Not Found");
    }
    
    const createNewComment = await CommentModel.create({blogId,content, authorId: req.user});

    if (!createNewComment._id) {
        throw new ErrorResponse("internal server error", "500", "Internal Server Error");
    }

    res.status(201).json(new ApiResponse(createNewComment, "comment created successfully", "201", "Created"));
}

export const handelCreateComment = asyncHandeler(createComment);