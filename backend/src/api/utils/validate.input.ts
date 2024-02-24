import {contextType} from "../../config/context.type";
import {respondWithStatus} from "./response.status";
import Joi from "joi";

export const validateInput = (schema: Joi.ObjectSchema<any>, data: any, context: contextType) => {
    const {error} = schema.validate(data);
    if (error) {
        console.log(`validate input error: ${error}`);
        return respondWithStatus(400, error.details[0].message, false, null, context);
    }
    return true;
}
