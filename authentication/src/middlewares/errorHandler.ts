import { Request, Response, NextFunction } from "express"
import { CustomErrorHandler } from "./customErrorHandler";

export const errorHandler = (err : Error, req : Request, res : Response, next : NextFunction) => { 
    if (err instanceof CustomErrorHandler) { 
        const serializedErrors = err.serializeErrors();
        return res.status(err.statusCode).json({errors : serializedErrors});
    }

    // console.error(err.stack);
    console.log(err.stack)

    res.status(500).send({errors: [{message : "Something went wrong"}]});

}


//write a class to catch database validation error
