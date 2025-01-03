import {StatusCodeType, StatusType} from "../type/type";

export class ErrorResponse extends Error {
    statusCode: StatusCodeType;
    status: StatusType;
   constructor(message: string, statusCode: StatusCodeType = 500, status: StatusType) {
       super(message);
       this.message = message;
       this.statusCode = statusCode;
       this.status = status;
   }
}


