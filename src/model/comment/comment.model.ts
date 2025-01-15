import mongoose, {Schema} from "mongoose"
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import {Icomment} from "../../utils/type/type";

const CommentSchema = new Schema<Icomment>({
    blogId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "blogs"
    },
    content: {
        type: String,
        required: true,
        max: [100, "message must be less than or equal to 100"],
    },
    authorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users",
    }
}, {timestamps: true});

CommentSchema.plugin(aggregatePaginate);

export const CommentModel = mongoose.model<Icomment>("comments", CommentSchema);