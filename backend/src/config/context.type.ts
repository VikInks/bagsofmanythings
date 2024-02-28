import {Request, Response} from "express";

export interface contextType {
    req: Request;
    res: Response;
    user?: string | null;
}
