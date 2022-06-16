import { NextFunction, Response, Request } from 'express';
import { validationResult } from 'express-validator';
import { ValidationErrorHandler } from '../middlewares/validationErrorHandler';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => { 
    const result = validationResult(req);

    if (!result.isEmpty()) { 
        throw new ValidationErrorHandler(req)
    }

    next()
}