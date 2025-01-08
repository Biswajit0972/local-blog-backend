import {v2 as cloudinary} from  "cloudinary";
import {ErrorResponse} from "../ErrorResponse/errorResponse";

export const deleteImageCloudinary = async (publicName: string) => {
    try {
       const response = await  cloudinary.api.delete_resources([publicName],  { type: 'upload', resource_type: 'image' });
        if (!response.deleted) {
            throw new ErrorResponse("Something went wrong,  please try agian latere", "400", "Bad Request")
        }
        return true;
    }catch (error: any) {
        console.log(error)
        return false;
    }
}