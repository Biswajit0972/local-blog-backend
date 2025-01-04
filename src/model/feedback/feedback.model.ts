import mongoose, {Schema} from "mongoose"
import {Ifeedback} from "../../utils/type/type";


const feedbackSchema  = new Schema<Ifeedback>({
    blogId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "blogs"
    },
    feedback: {
        type: String,
        required: true,
    },
    authorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users",
    }
}, {
    timestamps: true
})

const sharedSchema = new Schema<Ifeedback>({
    blogId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "blogs"
    },
    authorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users",
    }
}, {
    timestamps: true
})

export const ShareModel = mongoose.model("shares", sharedSchema)
export const FeedbackModel = mongoose.model<Ifeedback>("feedbacks", feedbackSchema)
