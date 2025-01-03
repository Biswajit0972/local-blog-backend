import {Iuser, StatusCodeType, StatusType} from "../type/type";


export class ApiResponse  {
    data?: Iuser | string | unknown;
    message?: string;
    statusCode?: StatusCodeType;
    status?: StatusType;
    constructor( data?: Iuser | string | unknown,
    message?: string,
    statusCode?: StatusCodeType ,
    status?: StatusType) {
        this.data = data;
        this.message = message;
        this.statusCode = statusCode;
        this.status = status;
    }
}


