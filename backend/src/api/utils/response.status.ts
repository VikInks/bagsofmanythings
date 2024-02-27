import {contextType} from "../../config/context.type";

export interface IResponseStatus {
    success: boolean;
    message: string;
    data: any;
}

export const respondWithStatus = (status: number, message: string, success: boolean, data: any, context: contextType) => {
    return { success: success, message: message, data: data };
};


