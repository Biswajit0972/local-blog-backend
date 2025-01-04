import mongoose, {Schema} from "mongoose"
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import {Iblog} from "../../utils/type/type";

const blogSchema = new Schema<Iblog>({
    coverImage: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        maxLength: [100, "title must be less than 100"],
    },
    content: {
        type: String,
        required: true,
    },
    tag:[ {
        type: String,
        required: true,
    }],
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    isPublished: {
        type: Boolean,
        default: false,

    },
    images: [ {
        type: String,
    }],
   watchBlog: {
        type: Schema.Types.ObjectId,
        ref: "users"
   }
}, {
    timestamps: true
})

blogSchema.plugin(aggregatePaginate);

export const BlogModel= mongoose.model<Iblog>("blogs", blogSchema);