import { ApiResponse } from "../ApiResponse/apiresponse";

export const asyncHandeler = (fn: any) => {
    return async (req: any, res: any) => {
        try {
            return await fn(req, res);
        } catch (err: any) {
            res.status(Number(err.statusCode) || 500).json(new ApiResponse("", err.message, err.statusCode, err.status));
        }
    }
}