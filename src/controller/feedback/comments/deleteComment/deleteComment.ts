import { CommentModel } from "../../../../model/comment/comment.model";
import { ApiResponse } from "../../../../utils/ApiResponse/apiresponse";
import { asyncHandeler } from "../../../../utils/asyncHandler/asyncHandeler";
import { ErrorResponse } from "../../../../utils/ErrorResponse/errorResponse";

const deleteComment = async (req: any, res: any) => {
    const { commentId, blogId} = req.query;
    
    if (!commentId || !blogId) {
        throw new ErrorResponse("Please fill the required field","400","Bad Request");
    }

    const comment = await CommentModel.findOne({ _id: commentId, blogId: blogId });

    if (!comment) {
      throw new ErrorResponse("comment not found", "404", "Not Found");
    }

    await CommentModel.findByIdAndDelete(comment._id);

    res.status(200).json(new ApiResponse("", "Comment deleted successfully", "200", "OK"));
};

export const handelDeleteComment = asyncHandeler(deleteComment);