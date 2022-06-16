import { Request, Response, NextFunction } from "express"
import { CustomErrorHandler } from "./customErrorHandler";

export const errorHandler = (err : Error, req : Request, res : Response, next : NextFunction) => { 
    if (err instanceof CustomErrorHandler) { 
        const serializedErrors = err.serializeErrors();
        return res.status(err.statusCode).json({errors : serializedErrors});
    }

    console.error(err.stack);
    res.status(500).send('Something broke!');

}
