import {exceptionHandler} from "./exception.handler";
import {contextType} from "../../config/context.type";
import Joi from "joi";
import {validateInput} from "./validate.input";

export const validateAndResponse = async (schema: Joi.ObjectSchema<any> | null, data: any, operation: string, context: contextType, callback: () => Promise<any>) => {
    try {
        if (schema && data) {
            const val = validateInput(schema, data, context);
            if(!val) return;
        }
        return await callback();
    } catch (e) {
        console.log(`validate and response error: ${e}`);
        return exceptionHandler(operation, e, context);
    }
}
