import {respondWithStatus} from "./response.status";
import {contextType} from "../../config/context.type";

export const exceptionHandler = (operation: string, e: unknown, context: contextType) => {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    return respondWithStatus(500, `Error while ${operation}: ${errorMessage}`, false, null, context);
};
